import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Checks if an email address already exists in a specified SuiteCRM module.
 * 
 * This function queries the SuiteCRM API to determine if an email address is already
 * registered in the specified module. It constructs the appropriate request payload
 * with the necessary authentication and email information, then processes the response
 * to determine if the email exists and retrieve its associated record ID.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name to check for the email existence
 * @param email - The email address to check for existence
 * @returns A Promise that resolves to an object indicating if the email exists and its record ID if found
 */
export async function checkEmailExists(
  session: string, 
  moduleName: string, 
  email: string
): Promise<{ exists: boolean, recordId?: string }> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        email
      }
    };
    
    const response = await axios.get(buildQueryURL('check_email_exist', restData));
    
    if (response.data) {
      return {
        exists: response.data.exists || false,
        recordId: response.data.record_id
      };
    }
    
    return { exists: false };
  } catch (error) {
    console.error('Check email exists failed:', error);
    return { exists: false };
  }
} 