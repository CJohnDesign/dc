import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function changePassword(session: string, moduleName: string, email: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        email
      }
    };
    
    const response = await axios.get(buildQueryURL('change_password', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Change password failed:', error);
    return false;
  }
} 