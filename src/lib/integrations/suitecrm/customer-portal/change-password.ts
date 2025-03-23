import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Initiates a password change request for a user in the SuiteCRM Customer Portal.
 * 
 * This function sends a request to the SuiteCRM API to trigger a password change process
 * for a specific user in the customer portal. It typically generates a password reset
 * link or notification that will be sent to the user through the CRM system.
 * 
 * @param session - The active session token for API authentication
 * @param moduleName - The CRM module name where the user account is stored
 * @param username - The username of the user requesting the password change
 * @returns A Promise that resolves to true if the password change request was successful, false otherwise
 */
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