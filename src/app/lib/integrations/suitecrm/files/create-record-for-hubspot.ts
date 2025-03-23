import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function createRecordForHubspot(session: string): Promise<string | null> {
  try {
    const restData = {
      session,
      params: {}
    };
    
    const response = await axios.get(buildQueryURL('create_record_for_hubspot', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create record for hubspot failed:', error);
    return null;
  }
} 