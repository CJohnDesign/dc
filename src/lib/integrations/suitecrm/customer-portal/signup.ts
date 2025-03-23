import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function customerPortalSignup(session: string, username: string, password: string): Promise<string | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('customer_protal_signup', restData));
    
    if (response.data && response.data.success && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Customer portal signup failed:', error);
    return null;
  }
} 