import axios from 'axios';

import { buildQueryURL } from '../utils/api-helpers';

/**
 * Creates a new record in SuiteCRM specifically for Hubspot integration.
 * 
 * This function creates a new record in the SuiteCRM system that is prepared for
 * integration with Hubspot. It constructs the appropriate request payload with
 * the necessary authentication, then processes the response to retrieve the ID
 * of the newly created record.
 * 
 * @param session - The active session token for API authentication
 * @returns A Promise that resolves to the ID of the created record if successful, or null if the operation failed
 */
export async function createRecordForHubspot(session: string): Promise<string | null> {
  try {
    const restData = {
      session,
      params: {}
    };
    
    const response = await axios.get(buildQueryURL('create_record_for_hubspot', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create record for hubspot failed:', error);
    return null;
  }
} 