import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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