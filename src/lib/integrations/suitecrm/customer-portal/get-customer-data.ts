import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Retrieves customer data from SuiteCRM based on lead information.
 * 
 * This function fetches detailed customer information from the SuiteCRM API using
 * the provided session token, origin identifier, and lead ID. It constructs the
 * appropriate request payload and handles error conditions gracefully.
 * 
 * @param session - The active session token for API authentication
 * @param origin - The origin identifier for the customer data request
 * @param leadId - The ID of the lead for which to retrieve customer data
 * @returns A Promise that resolves to an object containing customer data on success, or null on failure
 */
export async function getCustomerData(
  session: string, 
  origin: string, 
  leadId: string
): Promise<Record<string, any> | null> {
  logger.debug('Retrieving customer data', { origin, leadId });
  
  try {
    const restData = {
      session,
      params: {
        origin,
        leadID: leadId
      }
    };
    
    logger.trace('Making get_customer_data API request');
    const response = await axios.post(buildQueryURL('get_customer_data', restData), {});
    
    if (response.data && response.data.success && response.data.data) {
      logger.info('Customer data retrieved successfully', { leadId });
      return response.data.data;
    }
    
    logger.warn('Customer data retrieval unsuccessful', { leadId });
    return null;
  } catch (error) {
    logger.error('Customer data retrieval failed', { leadId, error });
    return null;
  }
} 