import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from '../leads/types';
import logger from '@/utils/logger';

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
  logger.debug('Retrieving leads associated with broker', { brokerId });
  
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    logger.trace('Making get_associated_leads API request');
    const response = await axios.get(buildQueryURL('get_associated_leads', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      const leads = response.data.data;
      logger.info('Associated leads retrieved successfully', { 
        brokerId, 
        leadCount: leads.length 
      });
      return leads;
    }
    
    logger.warn('Associated leads retrieval unsuccessful or no leads found', { brokerId });
    return [];
  } catch (error) {
    logger.error('Associated leads retrieval failed', { brokerId, error });
    return [];
  }
} 