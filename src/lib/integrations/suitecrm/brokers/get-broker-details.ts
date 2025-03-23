import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getBrokerDetails(session: string, brokerId: string): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_details', restData));
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker details failed:', error);
    return null;
  }
} 