/**
 * SuiteCRM API Client
 * 
 * This utility provides functions to interact with the SuiteCRM V4 API.
 * It handles authentication, session management, and API calls.
 */

import axios, { AxiosError } from 'axios';

// Base URL for the SuiteCRM API - replace with actual URL in production
const API_BASE_URL = process.env.NEXT_PUBLIC_SUITECRM_API_URL || 'https://suitecrm.com/api/v4';

// Default credentials - in production, these should be stored in environment variables
const DEFAULT_USERNAME = process.env.SUITECRM_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.SUITECRM_PASSWORD || 'QA6N6uBUyTHGg8g';

// Store the session ID
let sessionId: string | null = null;
let sessionExpiry: number | null = null;

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

/**
 * Login to SuiteCRM and get a session ID
 */
export async function login(username = DEFAULT_USERNAME, password = DEFAULT_PASSWORD): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });
    
    if (response.data && response.data.id) {
      sessionId = response.data.id;
      sessionExpiry = Date.now() + SESSION_TIMEOUT;
      return response.data.id;
    } else {
      throw new Error('Failed to get session ID');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Check if the session is valid
 */
export function isSessionValid(): boolean {
  return !!sessionId && !!sessionExpiry && Date.now() < sessionExpiry;
}

/**
 * Make an authenticated API call
 */
export async function apiCall<T>(endpoint: string, data: any = {}): Promise<T> {
  // If no session ID or session expired, login first
  if (!isSessionValid()) {
    await login();
  }
  
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, {
      ...data,
      session_id: sessionId
    });
    
    // Refresh session expiry on successful call
    sessionExpiry = Date.now() + SESSION_TIMEOUT;
    
    return response.data;
  } catch (error) {
    // If session expired, try to login again and retry
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await login();
      return apiCall(endpoint, data);
    }
    
    console.error(`API call error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Clear the current session
 */
export function clearSession(): void {
  sessionId = null;
  sessionExpiry = null;
}

// API Endpoint Functions

/**
 * Get customer data
 */
export async function getCustomerData(customerId: string) {
  return apiCall<any>('get_customer_data', { customer_id: customerId });
}

/**
 * Get PQ document
 */
export async function getPQDocument(documentId: string) {
  return apiCall<any>('get_pq_document', { document_id: documentId });
}

/**
 * Request two-factor authentication again
 */
export async function requestTwoFactorAgain(userId: string) {
  return apiCall<any>('request_two_factor_again', { user_id: userId });
}

/**
 * Verify two-factor authentication
 */
export async function verifyTwoFactor(userId: string, code: string) {
  return apiCall<any>('customer_portal_twofa', { 
    user_id: userId,
    code
  });
}

/**
 * Set password for customer portal
 */
export async function setPasswordCustomerPortal(userId: string, password: string) {
  return apiCall<any>('set_password_customer_portal', {
    user_id: userId,
    password
  });
}

/**
 * Change password for customer portal
 */
export async function changePasswordCustomerPortal(userId: string, oldPassword: string, newPassword: string) {
  return apiCall<any>('change_password_customer_portal', {
    user_id: userId,
    old_password: oldPassword,
    new_password: newPassword
  });
}

/**
 * Customer portal signup
 */
export async function customerPortalSignup(userData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  [key: string]: any;
}) {
  return apiCall<any>('customer_protal_signup', userData);
}

/**
 * Customer portal login
 */
export async function customerPortalLogin(email: string, password: string) {
  return apiCall<any>('customer_portal_login', { 
    email, 
    password 
  });
}

// Export a default object with all functions
export default {
  login,
  isSessionValid,
  apiCall,
  clearSession,
  getCustomerData,
  getPQDocument,
  requestTwoFactorAgain,
  verifyTwoFactor,
  setPasswordCustomerPortal,
  changePasswordCustomerPortal,
  customerPortalSignup,
  customerPortalLogin
}; 