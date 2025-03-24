'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login } from '@/lib/integrations/suitecrm/auth/login';
import { manualBrokerLogin } from '@/lib/integrations/suitecrm/auth/manual-broker-login';
import { manualLeadLogin } from '@/lib/integrations/suitecrm/auth/manual-lead-login';
import { createOrUpdateLead } from '@/lib/integrations/suitecrm/leads/create-or-update-lead';
import { customerPortalSignup } from '@/lib/integrations/suitecrm/customer-portal/signup';
import { customerPortalLogin } from '@/lib/integrations/suitecrm/customer-portal/login';
import { customerPortalTwofa } from '@/lib/integrations/suitecrm/customer-portal/two-factor-auth';
import { checkEmailExists } from '@/lib/integrations/suitecrm/email/check-email-exists';

// Maintain your session across requests
let currentSession: string | null = null;

// Helper to set the session in cookies
async function setSession(sessionId: string, userType: 'broker' | 'lead', userId: string) {
  currentSession = sessionId;
  
  // Store in cookies with expiration
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + twoWeeks);
  
  (await cookies()).set('crm_session', sessionId, { 
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  (await cookies()).set('crm_user_type', userType, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  (await cookies()).set('crm_user_id', userId, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
}

// Validate login schema
const signInSchema = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(3).max(100),
  userType: z.enum(['broker', 'lead'])
});

// Broker/Lead login
export async function signIn(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const userType = formData.get('userType') as 'broker' | 'lead';
  const redirectUrl = formData.get('redirect') as string || '/dashboard';
  
  try {
    // Validate the input data
    const validatedData = signInSchema.parse({
      username,
      password,
      userType
    });

    // First get admin session
    const adminSession = await login(
      process.env.SUITECRM_ADMIN_USERNAME || 'admin',
      process.env.SUITECRM_ADMIN_PASSWORD || 'admin'
    );
    
    if (!adminSession) {
      return {
        error: 'Failed to connect to CRM system. Please try again later.'
      };
    }
    
    // TODO: Fix manual broker/lead login implementation
    // - Debug why manualBrokerLogin and manualLeadLogin are failing
    // - Verify API endpoint paths and parameters
    // - Set up proper test accounts in SuiteCRM
    // - Consider adding detailed error logging
    
    // TEMPORARY FIX: Use admin session for all logins
    // This bypasses the broker/lead authentication for now
    await setSession(adminSession, userType, 'temp-user-id');
    
    // The redirect call below will throw a NEXT_REDIRECT error
    // This is normal and should be caught by Next.js
    return redirect(redirectUrl);
    
    /* 
    // Original broker/lead login flow - commented out until fixed
    // TODO: Restore and test this flow once the API endpoints are working
    // Now try to login as broker or lead
    if (userType === 'broker') {
      const broker = await manualBrokerLogin(adminSession, username, password);
      
      if (!broker) {
        return {
          error: 'Invalid username or password. Please try again.',
          username
        };
      }
      
      await setSession(adminSession, 'broker', broker.id);
      
      // Redirect to broker dashboard
      redirect('/broker/dashboard');
      
    } else { // lead login
      const lead = await manualLeadLogin(adminSession, username, password);
      
      if (!lead) {
        return {
          error: 'Invalid username or password. Please try again.',
          username
        };
      }
      
      await setSession(adminSession, 'lead', lead.id);
      
      // Redirect to customer portal
      redirect('/customer/dashboard');
    }
    */
  } catch (error: any) {
    // The redirect function throws a NEXT_REDIRECT error, so we need to check
    // if this is a redirect error before treating it as an actual error
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      // This is a redirect, let Next.js handle it
      throw error;
    }
    
    if (error instanceof z.ZodError) {
      return {
        error: 'Invalid username or password format.',
        username
      };
    }
    
    console.error('Login error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
      username
    };
  }
}

// Customer portal login (alternate approach)
export async function customerLogin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const twoFactorCode = formData.get('twoFactorCode') as string;
  const twoFactorId = formData.get('twoFactorId') as string;
  
  try {
    // First get admin session
    const adminSession = await login(
      process.env.SUITECRM_ADMIN_USERNAME || 'admin',
      process.env.SUITECRM_ADMIN_PASSWORD || 'admin'
    );
    
    if (!adminSession) {
      return {
        error: 'Failed to connect to CRM system. Please try again later.'
      };
    }
    
    // Attempt login
    const loginResult = await customerPortalLogin(adminSession, username, password, twoFactorId);
    
    if (!loginResult) {
      return {
        error: 'Invalid username or password. Please try again.',
        username
      };
    }
    
    // Check if two-factor auth is required
    if (loginResult.twoFaCheck && !twoFactorCode) {
      return {
        requireTwoFactor: true,
        username,
        leadId: loginResult.id
      };
    }
    
    // If two-factor auth is required and code was provided, verify it
    if (loginResult.twoFaCheck && twoFactorCode) {
      const twoFaResult = await customerPortalTwofa(
        adminSession,
        'Leads',
        loginResult.id,
        twoFactorCode,
        'on' // Remember me enabled
      );
      
      if (!twoFaResult.success) {
        return {
          error: 'Invalid two-factor code. Please try again.',
          requireTwoFactor: true,
          username,
          leadId: loginResult.id
        };
      }
    }
    
    // Successfully authenticated
    await setSession(adminSession, 'lead', loginResult.id);
    
    // Redirect to customer portal
    redirect('/customer/dashboard');
    
  } catch (error) {
    console.error('Customer login error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
      username
    };
  }
}

// Validate signup schema
const signUpSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100),
  accountType: z.enum(['broker', 'customer'])
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

// Signup function
export async function signUp(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const accountType = formData.get('accountType') as 'broker' | 'customer';
  
  try {
    // Validate the input data
    const validatedData = signUpSchema.parse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType
    });

    // First get admin session
    const adminSession = await login(
      process.env.SUITECRM_ADMIN_USERNAME || 'admin',
      process.env.SUITECRM_ADMIN_PASSWORD || 'admin'
    );
    
    if (!adminSession) {
      return {
        error: 'Failed to connect to CRM system. Please try again later.'
      };
    }
    
    // Check if email already exists
    const emailCheck = await checkEmailExists(
      adminSession, 
      accountType === 'broker' ? 'dc_brokers' : 'Leads', 
      email
    );
    
    if (emailCheck.exists) {
      return {
        error: 'An account with this email already exists. Please use a different email or sign in.',
        firstName,
        lastName,
        email
      };
    }
    
    if (accountType === 'customer') {
      // Register using the customer portal signup
      const leadId = await customerPortalSignup(adminSession, email, password);
      
      if (!leadId) {
        return {
          error: 'Failed to create your account. Please try again.',
          firstName,
          lastName,
          email
        };
      }
      
      // Update lead record with additional info
      await createOrUpdateLead(adminSession, {
        id: leadId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        username_c: email,
        password_c: password // Note: In a real app, consider security implications
      });
      
      // Set session for the newly created lead
      await setSession(adminSession, 'lead', leadId);
      
      // Redirect to the customer portal
      redirect('/customer/dashboard');
      
    } else { // broker signup
      // For broker signup, we'll just create a lead record that will be processed by admin
      const brokerLead = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        lead_source: 'Broker Signup',
        status: 'New',
        description: 'Broker registration request',
        username_c: email,
        password_c: password, // Note: In a real app, consider security implications
      };
      
      const leadId = await createOrUpdateLead(adminSession, brokerLead);
      
      if (!leadId) {
        return {
          error: 'Failed to submit your registration. Please try again.',
          firstName,
          lastName,
          email
        };
      }
      
      // Redirect to confirmation page, not logging in yet (admin needs to approve)
      redirect('/broker/registration-confirmation');
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      
      const errorMessages = Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
        .join('; ');
      
      return {
        error: errorMessages,
        firstName,
        lastName,
        email
      };
    }
    
    console.error('Signup error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
      firstName,
      lastName,
      email
    };
  }
}

// Sign out function
export async function signOut() {
  const cookiesInstance = await cookies();
  cookiesInstance.delete('crm_session');
  cookiesInstance.delete('crm_user_type');
  cookiesInstance.delete('crm_user_id');
  currentSession = null;
  
  redirect('/login');
}