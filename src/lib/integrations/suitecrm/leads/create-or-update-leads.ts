import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Creates or updates multiple lead records in the SuiteCRM system.
 * 
 * This function sends batch lead data to the SuiteCRM API to either create new leads
 * or update existing ones based on the provided data. It constructs the appropriate
 * request payload with the necessary authentication and lead information, then
 * processes the response to retrieve the IDs of the created or updated leads.
 * 
 * @param session - The active session token for API authentication
 * @param leadsData - An array of objects containing the lead fields and values to be created or updated
 * @returns A Promise that resolves to an array of IDs of the created/updated leads if successful, or an empty array if the operation failed
 */
export async function createOrUpdateLeads(session: string, leadsData: Record<string, any>[]): Promise<string[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_lists: leadsData
    };
    
    const response = await axios.get(buildQueryURL('set_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data.map(item => item.id);
    }
    
    return [];
  } catch (error) {
    console.error('Create or update leads failed:', error);
    return [];
  }
} 