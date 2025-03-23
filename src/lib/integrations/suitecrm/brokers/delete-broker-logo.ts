import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Deletes a broker's logo from the SuiteCRM system.
 * 
 * This function sends a request to remove a broker's logo image from the CRM
 * for a specific broker ID. It returns a boolean indicating whether the
 * deletion was successful.
 * 
 * @param session - The active session token for API authentication
 * @param id - The ID of the broker whose logo should be deleted
 * @returns A Promise that resolves to true if deletion was successful, false otherwise
 */
export async function deleteBrokerLogo(session: string, id: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        id
      }
    };
    
    const response = await axios.get(buildQueryURL('delete_broker_logo', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Delete broker logo failed:', error);
    return false;
  }
} 