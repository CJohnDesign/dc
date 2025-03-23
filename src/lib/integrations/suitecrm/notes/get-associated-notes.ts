import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Retrieves notes associated with a specific query from the SuiteCRM API.
 * 
 * This function fetches notes that match the provided query string. The results
 * can be limited to a specific number of notes. It returns an array of note objects
 * or an empty array if no notes are found or an error occurs.
 * 
 * @param session - The active session token for API authentication
 * @param query - Optional query string to filter the notes
 * @param limit - Optional parameter to limit the number of notes returned
 * @returns A Promise that resolves to an array of note objects
 */
export async function getAssociatedNotes(session: string, query: string = "", limit: string = ""): Promise<any[]> {
  logger.debug('Retrieving associated notes', { 
    hasQuery: !!query,
    queryLength: query.length,
    hasLimit: !!limit,
    limit
  });
  
  try {
    const restData = {
      session,
      params: {
        query,
        limit
      }
    };
    
    logger.trace('Making get_associated_notes API request', { query });
    const response = await axios.get(buildQueryURL('get_associated_notes', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      logger.info('Notes retrieved successfully', { 
        count: response.data.data.length,
        query
      });
      return response.data.data;
    }
    
    logger.warn('Notes retrieval unsuccessful or invalid response format', { query });
    return [];
  } catch (error) {
    logger.error('Notes retrieval failed', { query, error });
    return [];
  }
} 