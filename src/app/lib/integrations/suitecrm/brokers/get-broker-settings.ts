import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getBrokerSettings(session: string, companyId: string): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        company_id: companyId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_settings', restData));
    
    if (response.data && response.data.success && response.data.settings) {
      return response.data.settings;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker settings failed:', error);
    return null;
  }
} 