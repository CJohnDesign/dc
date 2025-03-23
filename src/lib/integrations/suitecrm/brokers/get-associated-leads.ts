import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from '../leads/types';

/**
 * Retrieves leads associated with a specific broker.
 * 
 * This function fetches all leads that are connected to a given broker ID from the SuiteCRM API.
 * It returns an array of lead objects containing their details, or an empty array if no leads
 * are found or if an error occurs during the request.
 * 
 * @param session - The active session token for API authentication
 * @param brokerId - The ID of the broker for which to retrieve associated leads
 * @returns A Promise that resolves to an array of Lead objects on success, or an empty array on failure
 */
export async function getAssociatedLeads(session: string, brokerId: string): Promise<Lead[]> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_associated_leads', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get associated leads failed:', error);
    return [];
  }
} 