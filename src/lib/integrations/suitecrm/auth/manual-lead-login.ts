import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Authenticates a lead using manual login credentials.
 * 
 * This function attempts to authenticate a lead by their username and password
 * through the SuiteCRM API. It returns the lead's details upon successful
 * authentication or null if authentication fails.
 * 
 * @param session - The active session token for API authentication
 * @param username - The lead's username
 * @param password - The lead's password
 * @returns A Promise that resolves to the lead's details on success, or null on failure
 */
export async function manualLeadLogin(
  session: string, 
  username: string, 
  password: string
): Promise<Lead | null> {
  logger.debug('Attempting manual lead login', { username });
  
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    logger.trace('Making manual lead login API request');
    const response = await axios.get(buildQueryURL('manual_lead_login', restData));
    
    if (response.data && response.data.id) {
      logger.info('Manual lead login successful', { leadId: response.data.id });
      return response.data as Lead;
    }
    
    logger.warn('Manual lead login failed: Invalid credentials or lead not found');
    return null;
  } catch (error) {
    logger.error('Manual lead login request failed', error);
    return null;
  }
} 