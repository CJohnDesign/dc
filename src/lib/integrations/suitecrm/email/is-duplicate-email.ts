import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Checks if an email address is a duplicate in a specified SuiteCRM module.
 * 
 * This function queries the SuiteCRM API to determine if an email address already exists
 * in the specified module. It constructs the appropriate request payload with the necessary
 * authentication and email information, then processes the response to determine if the
 * email is a duplicate.
 * 
 * @param session - The active session token for API authentication
 * @param email - The email address to check for duplication
 * @param module - The CRM module name to check for the email duplication
 * @param field - Optional field name to specify which field to check against (if not using default)
 * @returns A Promise that resolves to true if the email is a duplicate, false otherwise
 */
export async function isDuplicateEmail(
  session: string, 
  email: string, 
  module: string, 
  field?: string
): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        email,
        module,
        field
      }
    };
    
    const response = await axios.post(buildQueryURL('is_duplicate_email', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Is duplicate email failed:', error);
    return false;
  }
} 