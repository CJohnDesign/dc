import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function deleteBrokerLogo(session: string, id: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        id
      }
    };
    
    const response = await axios.get(buildQueryURL('delete_broker_logo', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Delete broker logo failed:', error);
    return false;
  }
} 