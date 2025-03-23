import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function customerPortalTwofa(
  session: string, 
  moduleName: string, 
  leadId: string, 
  twofaCode: string,
  rememberMe?: string
): Promise<{ success: boolean, twoFactorId?: string }> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId,
        twofa_code: twofaCode,
        remember_me: rememberMe
      }
    };
    
    const response = await axios.post(buildQueryURL('customer_portal_twofa', restData), {});
    
    if (response.data && response.data.success) {
      return {
        success: true,
        twoFactorId: response.data.two_factor_id
      };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Customer portal twofa failed:', error);
    return { success: false };
  }
} 