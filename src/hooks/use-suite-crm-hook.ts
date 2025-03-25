'use client';

import { useState, useEffect, useCallback } from 'react';
import suitecrmApi from '../utils/suitecrm-api';

/**
 * Custom hook for interacting with the SuiteCRM API
 * 
 * This hook provides a convenient way to use the SuiteCRM API
 * in React components with loading and error states.
 */
export function useSuiteCRM() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Check if session is valid on mount
  useEffect(() => {
    setIsLoggedIn(suitecrmApi.isSessionValid());
  }, []);

  // Login function
  const login = useCallback(async (username?: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await suitecrmApi.login(username, password);
      setIsLoggedIn(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    suitecrmApi.clearSession();
    setIsLoggedIn(false);
  }, []);

  // Generic API call function with loading and error handling
  const callApi = useCallback(async <T,>(
    apiFunction: (...args: any[]) => Promise<T>,
    ...args: any[]
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if logged in, if not, try to login
      if (!isLoggedIn && !suitecrmApi.isSessionValid()) {
        await suitecrmApi.login();
        setIsLoggedIn(true);
      }
      
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('API call failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Specific API functions
  const getCustomerData = useCallback((customerId: string) => {
    return callApi(suitecrmApi.getCustomerData, customerId);
  }, [callApi]);

  const getPQDocument = useCallback((documentId: string) => {
    return callApi(suitecrmApi.getPQDocument, documentId);
  }, [callApi]);

  const customerPortalLogin = useCallback((email: string, password: string) => {
    return callApi(suitecrmApi.customerPortalLogin, email, password);
  }, [callApi]);

  const customerPortalSignup = useCallback((userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    [key: string]: any;
  }) => {
    return callApi(suitecrmApi.customerPortalSignup, userData);
  }, [callApi]);

  // Return the hook API
  return {
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    callApi,
    getCustomerData,
    getPQDocument,
    customerPortalLogin,
    customerPortalSignup,
    // Add other API functions as needed
    requestTwoFactorAgain: useCallback((userId: string) => {
      return callApi(suitecrmApi.requestTwoFactorAgain, userId);
    }, [callApi]),
    verifyTwoFactor: useCallback((userId: string, code: string) => {
      return callApi(suitecrmApi.verifyTwoFactor, userId, code);
    }, [callApi]),
    setPasswordCustomerPortal: useCallback((userId: string, password: string) => {
      return callApi(suitecrmApi.setPasswordCustomerPortal, userId, password);
    }, [callApi]),
    changePasswordCustomerPortal: useCallback((userId: string, oldPassword: string, newPassword: string) => {
      return callApi(suitecrmApi.changePasswordCustomerPortal, userId, oldPassword, newPassword);
    }, [callApi]),
  };
}

export default useSuiteCRM; 