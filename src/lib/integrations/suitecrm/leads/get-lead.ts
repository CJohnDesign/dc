import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';

/**
 * Retrieves a lead record from the SuiteCRM system.
 * 
 * This function queries the SuiteCRM API to fetch a specific lead record using the provided
 * session token and lead ID. It allows for specifying which fields to retrieve through the
 * selectFields parameter. The function constructs the appropriate request payload with the
 * necessary authentication and query parameters, then processes the response to extract the
 * lead data.
 * 
 * @param session - The active session token for API authentication
 * @param leadId - The unique identifier of the lead to retrieve
 * @param selectFields - Optional array of specific fields to retrieve (empty array returns all fields)
 * @returns A Promise that resolves to the Lead object if successful, or null if the lead
 *          cannot be retrieved or doesn't exist
 */
export async function getLead(session: string, leadId: string, selectFields: string[] = []): Promise<Lead | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      id: leadId,
      offset: 0,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: 1,
      deleted: "false"
    };
    
    const response = await axios.get(buildQueryURL('get_entry', restData));
    
    if (response.data && response.data.success && response.data.entry) {
      return response.data.entry;
    }
    
    return null;
  } catch (error) {
    console.error('Get lead failed:', error);
    return null;
  }
} 