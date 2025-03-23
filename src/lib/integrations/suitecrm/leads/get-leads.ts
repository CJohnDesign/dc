import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';

/**
 * Retrieves multiple lead records from the SuiteCRM system.
 * 
 * This function queries the SuiteCRM API to fetch multiple lead records using the provided
 * session token and an array of lead IDs. It allows for specifying which fields to retrieve
 * through the selectFields parameter. The function constructs the appropriate request payload
 * with the necessary authentication and query parameters, then processes the response to extract
 * the lead data.
 * 
 * @param session - The active session token for API authentication
 * @param leadIds - An array of unique identifiers for the leads to retrieve
 * @param selectFields - Optional array of specific fields to retrieve (empty array returns all fields)
 * @returns A Promise that resolves to an array of Lead objects if successful, or an empty array
 *          if the leads cannot be retrieved or don't exist
 */
export async function getLeads(session: string, leadIds: string[], selectFields: string[] = []): Promise<Lead[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      ids: leadIds,
      select_fields: selectFields
    };
    
    const response = await axios.get(buildQueryURL('get_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get leads failed:', error);
    return [];
  }
} 