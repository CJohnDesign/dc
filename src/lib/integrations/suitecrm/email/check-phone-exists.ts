import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Checks if a mobile phone number already exists in a specified SuiteCRM module.
 * 
 * This function queries the SuiteCRM API to determine if a mobile phone number is already
 * registered in the specified module. It constructs the appropriate request payload with
 * the necessary authentication and phone information, then processes the response to
 * determine if the phone number exists in the system.
 * 
 * @param session - The active session token for API authentication
 * @param phoneMobile - The mobile phone number to check for existence
 * @param moduleName - The CRM module name to search within
 * @returns A Promise that resolves to true if the phone number exists, false otherwise
 */
export async function checkPhoneExists(
  session: string, 
  phoneMobile: string, 
  moduleName: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        phone_mobile: phoneMobile,
        module_name: moduleName
      }
    };
    
    const response = await axios.get(buildQueryURL('check_phone_exist', restData));
    
    if (response.data) {
      return response.data.exists === true;
    }
    
    return false;
  } catch (error) {
    console.error('Check phone exists failed:', error);
    return false;
  }
} 