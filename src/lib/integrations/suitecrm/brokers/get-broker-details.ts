import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Retrieves detailed information for a specific broker from SuiteCRM.
 * 
 * This function fetches comprehensive details about a broker using their unique ID.
 * It returns a structured object containing the broker's information or null if
 * the data cannot be retrieved.
 * 
 * @param session - The active session token for API authentication
 * @param brokerId - The ID of the broker for which to retrieve details
 * @returns A Promise that resolves to an object containing broker details on success, or null on failure
 */
export async function getBrokerDetails(session: string, brokerId: string): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_details', restData));
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker details failed:', error);
    return null;
  }
} 