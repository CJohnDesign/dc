import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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