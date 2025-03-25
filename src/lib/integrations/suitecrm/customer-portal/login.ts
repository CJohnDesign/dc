import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Authenticates a user in the SuiteCRM Customer Portal.
 * 
 * This function attempts to authenticate a user by their username and password
 * through the SuiteCRM API. It supports two-factor authentication if required.
 * Upon successful authentication, it returns the user's ID and a flag indicating
 * whether two-factor authentication is needed.
 * 
 * @param session - The active session token for API authentication
 * @param username - The user's username for the customer portal
 * @param password - The user's password for the customer portal
 * @param twoFactorAuthId - Optional two-factor authentication ID for second-step verification
 * @returns A Promise that resolves to an object containing the user's ID and two-factor status on success, or null on failure
 */
export async function customerPortalLogin(
  session: string, 
  username: string, 
  password: string, 
  twoFactorAuthId?: string
): Promise<{ id: string, twoFaCheck: boolean } | null> {
  logger.debug('Attempting customer portal login', { 
    username, 
    hasTwoFactorAuthId: !!twoFactorAuthId 
  });
  
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password,
        two_factor_auth_id: twoFactorAuthId
      }
    };
    
    logger.trace('Making customer_portal_login API request');
    const response = await axios.get(buildQueryURL('customer_portal_login', restData));
    
    if (response.data && response.data.success && response.data.id) {
      const result = {
        id: response.data.id,
        twoFaCheck: response.data.two_fa_check === true
      };
      
      logger.info('Customer portal login successful', { 
        username, 
        userId: result.id,
        requiresTwoFactor: result.twoFaCheck
      });
      
      return result;
    }
    
    logger.warn('Customer portal login unsuccessful', { username });
    return null;
  } catch (error) {
    logger.error('Customer portal login failed', { username, error });
    return null;
  }
} 