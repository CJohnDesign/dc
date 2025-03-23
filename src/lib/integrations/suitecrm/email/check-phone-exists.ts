import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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