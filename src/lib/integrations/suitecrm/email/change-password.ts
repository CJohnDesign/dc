import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Initiates a password change request for a user in the SuiteCRM system.
 * 
 * This function sends a request to the SuiteCRM API to trigger a password change process
 * for a user identified by their email address. It constructs the appropriate request payload
 * with the necessary authentication and user information, then processes the response to
 * determine if the password change request was successfully initiated.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name where the user account is stored
 * @param email - The email address of the user requesting the password change
 * @returns A Promise that resolves to true if the password change request was successfully initiated, false otherwise
 */
export async function changePassword(session: string, moduleName: string, email: string): Promise<boolean> {
  logger.debug('Initiating password change request', { moduleName, email });
  
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        email
      }
    };
    
    logger.trace('Making change_password API request');
    const response = await axios.get(buildQueryURL('change_password', restData));
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('Password change request initiated successfully', { email });
    } else {
      logger.warn('Password change request unsuccessful', { email });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('Password change request failed', { email, error });
    return false;
  }
} 