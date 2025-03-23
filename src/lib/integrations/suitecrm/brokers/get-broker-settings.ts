import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Retrieves settings for a specific broker company from SuiteCRM.
 * 
 * This function fetches configuration settings and preferences associated with a broker company
 * using their unique company ID. These settings may include display preferences, notification
 * configurations, or other customizable options set for the broker in the CRM system.
 * 
 * @param session - The active session token for API authentication
 * @param companyId - The ID of the broker company for which to retrieve settings
 * @returns A Promise that resolves to an object containing broker settings on success, or null on failure
 */
export async function getBrokerSettings(session: string, companyId: string): Promise<Record<string, any> | null> {
  logger.debug('Retrieving broker settings', { companyId });
  
  try {
    const restData = {
      session,
      params: {
        company_id: companyId
      }
    };
    
    logger.trace('Making get_broker_settings API request');
    const response = await axios.get(buildQueryURL('get_broker_settings', restData));
    
    if (response.data && response.data.success && response.data.settings) {
      logger.info('Broker settings retrieved successfully', { companyId });
      return response.data.settings;
    }
    
    logger.warn('Broker settings retrieval unsuccessful', { companyId });
    return null;
  } catch (error) {
    logger.error('Broker settings retrieval failed', { companyId, error });
    return null;
  }
} 