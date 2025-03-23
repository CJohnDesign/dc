import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { BrokerCount } from './types';
import logger from '@/utils/logger';

/**
 * Retrieves count statistics for a specific broker from SuiteCRM.
 * 
 * This function fetches various count metrics associated with a broker, such as
 * the number of leads, deals, or other relevant statistics tracked in the CRM system.
 * It returns a structured object containing these counts or null if the data cannot be retrieved.
 * 
 * @param session - The active session token for API authentication
 * @param brokerId - The ID of the broker for which to retrieve count statistics
 * @returns A Promise that resolves to a BrokerCount object containing various metrics on success, or null on failure
 */
export async function getBrokerCount(session: string, brokerId: string): Promise<BrokerCount | null> {
  logger.debug('Retrieving broker count statistics', { brokerId });
  
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    logger.trace('Making get_broker_count API request');
    const response = await axios.get(buildQueryURL('get_broker_count', restData));
    
    if (response.data && response.data.success && response.data.data) {
      const countData = response.data.data as BrokerCount;
      logger.info('Broker count statistics retrieved successfully', { 
        brokerId,
        totalCount: countData.total_count
      });
      return countData;
    }
    
    logger.warn('Broker count statistics retrieval unsuccessful', { brokerId });
    return null;
  } catch (error) {
    logger.error('Broker count statistics retrieval failed', { brokerId, error });
    return null;
  }
} 