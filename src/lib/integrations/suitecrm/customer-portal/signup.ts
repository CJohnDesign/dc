import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Registers a new user in the SuiteCRM Customer Portal.
 * 
 * This function sends a request to the SuiteCRM API to create a new user account
 * in the customer portal with the provided username and password. Upon successful
 * registration, it returns the unique identifier for the newly created user account.
 * 
 * @param session - The active session token for API authentication
 * @param username - The desired username for the new customer portal account
 * @param password - The password for the new customer portal account
 * @returns A Promise that resolves to the user's ID string on success, or null on failure
 */
export async function customerPortalSignup(session: string, username: string, password: string): Promise<string | null> {
  logger.debug('Initiating customer portal signup', { username });
  
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    logger.trace('Making customer_protal_signup API request');
    const response = await axios.get(buildQueryURL('customer_protal_signup', restData));
    
    if (response.data && response.data.success && response.data.id) {
      logger.info('Customer portal signup successful', { 
        username, 
        userId: response.data.id 
      });
      return response.data.id;
    }
    
    logger.warn('Customer portal signup unsuccessful', { username });
    return null;
  } catch (error) {
    logger.error('Customer portal signup failed', { username, error });
    return null;
  }
} 