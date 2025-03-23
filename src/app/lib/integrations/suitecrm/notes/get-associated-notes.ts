import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getAssociatedNotes(session: string, query: string = "", limit: string = ""): Promise<any[]> {
  try {
    const restData = {
      session,
      params: {
        query,
        limit
      }
    };
    
    const response = await axios.get(buildQueryURL('get_associated_notes', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get associated notes failed:', error);
    return [];
  }
} 