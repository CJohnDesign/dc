import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function customerPortalLogin(
  session: string, 
  username: string, 
  password: string, 
  twoFactorAuthId?: string
): Promise<{ id: string, twoFaCheck: boolean } | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password,
        two_factor_auth_id: twoFactorAuthId
      }
    };
    
    const response = await axios.get(buildQueryURL('customer_portal_login', restData));
    
    if (response.data && response.data.success && response.data.id) {
      return {
        id: response.data.id,
        twoFaCheck: response.data.two_fa_check === true
      };
    }
    
    return null;
  } catch (error) {
    console.error('Customer portal login failed:', error);
    return null;
  }
} 