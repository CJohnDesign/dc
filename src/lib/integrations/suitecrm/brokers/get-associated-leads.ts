import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from '../leads/types';

export async function getAssociatedLeads(session: string, brokerId: string): Promise<Lead[]> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_associated_leads', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get associated leads failed:', error);
    return [];
  }
} 