import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Requests a new two-factor authentication code for a user in the SuiteCRM Customer Portal.
 * 
 * This function sends a request to the SuiteCRM API to generate and send a new two-factor
 * authentication code to the user. This is typically used when a previous code has expired
 * or was not received by the user. The system will deliver the new code through the configured
 * channel (email, SMS, etc.) based on the CRM settings.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name where the user account is stored
 * @param leadId - The ID of the lead/user requesting a new two-factor code
 * @returns A Promise that resolves to true if the request was successful, false otherwise
 */
export async function requestTwoFactorAgain(session: string, moduleName: string, leadId: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('request_two_factor_again', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Request two factor again failed:', error);
    return false;
  }
} 