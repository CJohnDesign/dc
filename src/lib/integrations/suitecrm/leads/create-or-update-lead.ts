import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Creates or updates a lead record in the SuiteCRM system.
 * 
 * This function sends lead data to the SuiteCRM API to either create a new lead
 * or update an existing one based on the provided data. It constructs the appropriate
 * request payload with the necessary authentication and lead information, then
 * processes the response to retrieve the ID of the created or updated lead.
 * 
 * @param session - The active session token for API authentication
 * @param leadData - An object containing the lead fields and values to be created or updated
 * @returns A Promise that resolves to the ID of the created/updated lead if successful, or null if the operation failed
 */
export async function createOrUpdateLead(session: string, leadData: Record<string, any>): Promise<string | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_list: leadData
    };
    
    const response = await axios.get(buildQueryURL('set_entry', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create or update lead failed:', error);
    return null;
  }
} 