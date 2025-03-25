import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

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
  logger.debug('Checking if phone number exists', { 
    phoneMobile: phoneMobile.slice(-4), // Log only last 4 digits for privacy
    moduleName 
  });
  
  try {
    const restData = {
      session,
      params: {
        phone_mobile: phoneMobile,
        module_name: moduleName
      }
    };
    
    logger.trace('Making check_phone_exist API request');
    const response = await axios.get(buildQueryURL('check_phone_exist', restData));
    
    if (response.data) {
      const exists = response.data.exists === true;
      if (exists) {
        logger.info('Phone number exists in system', { 
          phoneLastDigits: phoneMobile.slice(-4),
          moduleName 
        });
      } else {
        logger.info('Phone number does not exist in system', { 
          phoneLastDigits: phoneMobile.slice(-4),
          moduleName 
        });
      }
      return exists;
    }
    
    logger.warn('Phone existence check returned invalid response');
    return false;
  } catch (error) {
    logger.error('Phone existence check failed', { 
      phoneLastDigits: phoneMobile.slice(-4),
      moduleName,
      error 
    });
    return false;
  }
} 