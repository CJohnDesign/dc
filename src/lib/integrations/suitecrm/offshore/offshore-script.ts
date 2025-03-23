import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Executes the offshore script process in the SuiteCRM system.
 * 
 * This function sends lead information to the SuiteCRM API's offshore script endpoint,
 * which processes the lead according to offshore handling procedures. It can optionally
 * include appointment information and assign the lead to a specific user.
 * 
 * @param session - The active session token for API authentication
 * @param leadFields - An object containing the lead's field values to be processed
 * @param appointment - Optional appointment information or identifier
 * @param assignedUserId - Optional ID of the user to whom the lead should be assigned
 * @returns A Promise that resolves to a boolean indicating whether the offshore script
 *          process was successfully executed
 */
export async function offshoreScript(
  session: string, 
  leadFields: Record<string, any>, 
  appointment?: string, 
  assignedUserId?: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        ...leadFields,
        appointment,
        assigned_user_id: assignedUserId
      }
    };
    
    const response = await axios.post(buildQueryURL('off_shore_script', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Offshore script failed:', error);
    return false;
  }
} 