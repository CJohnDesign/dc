import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Updates a broker's profile data in SuiteCRM.
 * 
 * This function sends updated profile information for a broker to the SuiteCRM API,
 * specifically handling profile photo updates. It constructs the appropriate request
 * payload and returns a boolean indicating whether the update was successful.
 * 
 * @param session - The active session token for API authentication
 * @param id - The ID of the broker whose profile data is being updated
 * @param photo - The photo data to be updated for the broker's profile
 * @returns A Promise that resolves to true if the update was successful, false otherwise
 */
export async function setBrokerProfileData(session: string, id: string, photo: string): Promise<boolean> {
  logger.debug('Updating broker profile data', { id, hasPhoto: !!photo });
  
  try {
    const data = {
      rest_data: {
        session,
        params: {
          id,
          photo
        }
      }
    };
    
    logger.trace('Making set_broker_profile_data API request');
    const response = await axios.post(buildQueryURL('set_broker_profile_data', {}), data);
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('Broker profile data updated successfully', { id });
    } else {
      logger.warn('Broker profile data update unsuccessful', { id });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('Broker profile data update failed', { id, error });
    return false;
  }
} 