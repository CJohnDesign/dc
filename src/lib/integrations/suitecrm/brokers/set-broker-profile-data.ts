import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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
    
    const response = await axios.post(buildQueryURL('set_broker_profile_data', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Set broker profile data failed:', error);
    return false;
  }
} 