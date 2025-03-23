import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Retrieves a file from the SuiteCRM system using the provided session and record ID.
 * 
 * This function queries the SuiteCRM API to fetch a specific file associated with the given
 * record ID. It constructs the appropriate request payload with the necessary authentication
 * and record information, then processes the response to extract the file data.
 * 
 * @param session - The active session token for API authentication
 * @param recordId - The ID of the record associated with the file to retrieve
 * @returns A Promise that resolves to the file data if successful, or null if the file
 *          cannot be retrieved or doesn't exist
 */
export async function getFile(session: string, recordId: string): Promise<any | null> {
  try {
    const restData = {
      session,
      recordId
    };
    
    const response = await axios.get(buildQueryURL('get_file', restData));
    
    if (response.data && response.data.success && response.data.file) {
      return response.data.file;
    }
    
    return null;
  } catch (error) {
    console.error('Get file failed:', error);
    return null;
  }
} 