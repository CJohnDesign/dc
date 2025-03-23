import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';
import logger from '@/utils/logger';

/**
 * Retrieves lead records from the SuiteCRM system based on a query.
 * 
 * This function queries the SuiteCRM API to fetch lead records that match the provided
 * query string. It allows for pagination through the offset parameter and limiting results
 * with maxResults. The function also supports selecting specific fields to retrieve through
 * the selectFields parameter.
 * 
 * @param session - The active session token for API authentication
 * @param query - The query string to filter leads (follows SuiteCRM query format)
 * @param selectFields - Optional array of specific fields to retrieve (empty array returns all fields)
 * @param maxResults - Optional parameter to limit the number of results returned (0 means no limit)
 * @param offset - Optional pagination offset for retrieving subsequent result sets
 * @returns A Promise that resolves to an object containing the leads array, total result count,
 *          and the next offset value for pagination
 */
export async function getLeadsByQuery(
  session: string, 
  query: string, 
  selectFields: string[] = [], 
  maxResults: number = 0, 
  offset: string = ""
): Promise<{ leads: Lead[], resultCount: number, nextOffset: number }> {
  logger.debug('Retrieving leads by query', { 
    queryLength: query.length,
    fieldCount: selectFields.length,
    maxResults,
    hasOffset: !!offset
  });
  
  try {
    const restData = {
      session,
      module_name: "Leads",
      query,
      order_by: "",
      offset,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: maxResults,
      deleted: "false"
    };
    
    logger.trace('Making get_entry_list API request', { query });
    const response = await axios.get(buildQueryURL('get_entry_list', restData));
    
    if (response.data && response.data.success) {
      const result = {
        leads: response.data.entry_list || [],
        resultCount: response.data.result_count || 0,
        nextOffset: response.data.next_offset || 0
      };
      
      logger.info('Leads query successful', { 
        retrievedCount: result.leads.length,
        totalCount: result.resultCount,
        hasMoreResults: result.nextOffset > 0
      });
      
      return result;
    }
    
    logger.warn('Leads query unsuccessful or invalid response format', { query });
    return { leads: [], resultCount: 0, nextOffset: 0 };
  } catch (error) {
    logger.error('Leads query failed', { query, error });
    return { leads: [], resultCount: 0, nextOffset: 0 };
  }
} 