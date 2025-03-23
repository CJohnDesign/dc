import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { BrokerCount } from './types';

export async function getBrokerCount(session: string, brokerId: string): Promise<BrokerCount | null> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_count', restData));
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data as BrokerCount;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker count failed:', error);
    return null;
  }
} 