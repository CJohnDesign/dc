import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login } from '@/lib/integrations/suitecrm/auth/login';

// Type for action response states
export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};

// CRM User type
export type CRMUser = {
  id: string;
  userType: 'broker' | 'lead';
  firstName?: string;
  lastName?: string;
  email?: string;
  sessionId: string;
  // Additional fields can be added as needed
};

// Get current user from cookies
export async function getCurrentUser(): Promise<{
  id: string;
  userType: 'broker' | 'lead';
  sessionId: string;
} | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('crm_session')?.value;
  const userType = cookieStore.get('crm_user_type')?.value as 'broker' | 'lead';
  const userId = cookieStore.get('crm_user_id')?.value;
  
  if (!sessionId || !userType || !userId) {
    return null;
  }
  
  return {
    id: userId,
    userType,
    sessionId
  };
}

/**
 * Get the current authenticated user with full details
 * This retrieves user information from cookies and fetches 
 * the complete user details from SuiteCRM if needed
 */
export async function getUser(): Promise<CRMUser | null> {
  // Get the basic user info from cookies
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }
  
  try {
    // For now, we'll just return the basic user info
    // In a real implementation, you'd fetch detailed info from SuiteCRM
    return {
      id: user.id,
      userType: user.userType,
      sessionId: user.sessionId
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    
    // Try refreshing the session
    try {
      const newSession = await refreshSession();
      
      if (newSession) {
        // Retry with the new session
        return getUser();
      }
    } catch (refreshError) {
      console.error('Error refreshing session:', refreshError);
    }
    
    // If all else fails, clear the session and return null
    await logout();
    return null;
  }
}

/**
 * Refresh the admin session and update cookies
 */
async function refreshSession(): Promise<string | null> {
  try {
    const newSession = await login(
      process.env.SUITECRM_ADMIN_USERNAME || 'admin',
      process.env.SUITECRM_ADMIN_PASSWORD || 'admin'
    );
    
    if (newSession) {
      // Update the session cookie
      const cookieStore = await cookies();
      const userType = cookieStore.get('crm_user_type')?.value;
      const userId = cookieStore.get('crm_user_id')?.value;
      
      if (userType && userId) {
        const twoWeeks = 14 * 24 * 60 * 60 * 1000;
        const expires = new Date(Date.now() + twoWeeks);
        
        cookieStore.set('crm_session', newSession, { 
          expires,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        
        return newSession;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to refresh session:', error);
    return null;
  }
}

/**
 * Clear all auth cookies and session data
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('crm_session');
  cookieStore.delete('crm_user_type');
  cookieStore.delete('crm_user_id');
}

// Function to refresh admin session if needed
export async function getAdminSession(): Promise<string> {
  // Attempt to get admin session
  return await login(
    process.env.SUITECRM_ADMIN_USERNAME || 'admin',
    process.env.SUITECRM_ADMIN_PASSWORD || 'admin'
  );
}

// Basic validated action without authentication
type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (_prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0]?.message } as T;
    }

    return action(result.data, formData);
  };
}

// Validated action that requires authentication
type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData,
  user: CRMUser
) => Promise<T>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (_prevState: ActionState, formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/login');
    }

    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
      return { error: result.error.errors[0]?.message } as T;
    }

    return action(result.data, formData, user);
  };
}

// Actions specifically for brokers
type BrokerActionFunction<T> = (
  formData: FormData,
  user: CRMUser
) => Promise<T>;

export function withBroker<T>(action: BrokerActionFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/login');
    }

    if (user.userType !== 'broker') {
      redirect('/unauthorized');
    }

    return action(formData, user);
  };
}

// Actions specifically for leads/customers
type LeadActionFunction<T> = (
  formData: FormData,
  user: CRMUser
) => Promise<T>;

export function withLead<T>(action: LeadActionFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const user = await getUser();
    if (!user) {
      redirect('/login');
    }

    if (user.userType !== 'lead') {
      redirect('/unauthorized');
    }

    return action(formData, user);
  };
}

// Middleware for protected routes
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

// Middleware for broker-only routes
export async function requireBroker() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  
  if (user.userType !== 'broker') {
    redirect('/unauthorized');
  }
  
  return user;
}

// Middleware for lead-only routes
export async function requireLead() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  
  if (user.userType !== 'lead') {
    redirect('/unauthorized');
  }
  
  return user;
}

// Function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

// Function to check if user is a broker
export async function isBroker(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user && user.userType === 'broker';
}

// Function to check if user is a lead
export async function isLead(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user && user.userType === 'lead';
}