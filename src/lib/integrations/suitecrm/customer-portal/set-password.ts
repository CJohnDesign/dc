import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Sets a new password for a user in the SuiteCRM Customer Portal.
 * 
 * This function sends a request to the SuiteCRM API to update the password for a specific
 * user identified by their lead ID. It constructs the appropriate request payload with
 * the necessary authentication and user information, then processes the response to
 * determine if the password update was successful.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name where the user account is stored
 * @param leadId - The ID of the lead/user whose password is being updated
 * @param password - The new password to set for the user
 * @returns A Promise that resolves to true if the password was successfully updated, false otherwise
 */
export async function setPasswordCustomerPortal(
  session: string, 
  moduleName: string, 
  leadId: string, 
  password: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId,
        password_c: password
      }
    };
    
    const response = await axios.post(buildQueryURL('set_password_customer_portal', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Set password customer portal failed:', error);
    return false;
  }
} 