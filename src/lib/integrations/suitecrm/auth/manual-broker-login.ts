import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

interface BrokerDetails {
  id: string;
  username_c: string;
  broker_details: Record<string, any>;
  [key: string]: any;
}

/**
 * Authenticates a broker using manual login credentials.
 * 
 * This function attempts to authenticate a broker by their username and password
 * through the SuiteCRM API. It returns the broker's details upon successful
 * authentication or null if authentication fails.
 * 
 * @param session - The active session token for API authentication
 * @param username - The broker's username
 * @param password - The broker's password
 * @returns A Promise that resolves to the broker's details on success, or null on failure
 */
export async function manualBrokerLogin(
  session: string, 
  username: string, 
  password: string
): Promise<BrokerDetails | null> {
  logger.debug('Attempting manual broker login', { username });
  
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    logger.trace('Making manual broker login API request');
    const response = await axios.get(buildQueryURL('manual_login', restData));
    
    if (response.data && response.data.id) {
      logger.info('Manual broker login successful', { brokerId: response.data.id });
      return response.data as BrokerDetails;
    }
    
    logger.warn('Manual broker login failed: Invalid credentials or broker not found');
    return null;
  } catch (error) {
    logger.error('Manual broker login request failed', error);
    return null;
  }
} 