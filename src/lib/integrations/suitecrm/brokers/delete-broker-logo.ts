import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Deletes a broker's logo from the SuiteCRM system.
 * 
 * This function sends a request to remove a broker's logo image from the CRM
 * for a specific broker ID. It returns a boolean indicating whether the
 * deletion was successful.
 * 
 * @param session - The active session token for API authentication
 * @param id - The ID of the broker whose logo should be deleted
 * @returns A Promise that resolves to true if deletion was successful, false otherwise
 */
export async function deleteBrokerLogo(session: string, id: string): Promise<boolean> {
  logger.debug('Deleting broker logo', { id });
  
  try {
    const restData = {
      session,
      params: {
        id
      }
    };
    
    logger.trace('Making delete_broker_logo API request');
    const response = await axios.get(buildQueryURL('delete_broker_logo', restData));
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('Broker logo deleted successfully', { id });
    } else {
      logger.warn('Broker logo deletion unsuccessful', { id });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('Broker logo deletion failed', { id, error });
    return false;
  }
} 