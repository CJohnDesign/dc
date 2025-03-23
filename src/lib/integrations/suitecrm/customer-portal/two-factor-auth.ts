import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Verifies a two-factor authentication code for a user in the SuiteCRM Customer Portal.
 * 
 * This function sends the provided two-factor authentication code to the SuiteCRM API
 * for verification. If successful, it returns a two-factor ID that can be used for
 * subsequent authenticated requests. The function also supports a "remember me" option
 * that can extend the validity period of the authentication.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name where the user account is stored
 * @param leadId - The ID of the lead/user attempting to verify their two-factor code
 * @param twofaCode - The two-factor authentication code entered by the user
 * @param rememberMe - Optional parameter to extend the authentication session
 * @returns A Promise that resolves to an object containing success status and two-factor ID if successful
 */
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