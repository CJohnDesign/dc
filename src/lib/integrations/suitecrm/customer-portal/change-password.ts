import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function changePasswordCustomerPortal(session: string, moduleName: string, username: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        username_c: username
      }
    };
    
    const response = await axios.get(buildQueryURL('change_password_customer_portal', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Change password customer portal failed:', error);
    return false;
  }
} 