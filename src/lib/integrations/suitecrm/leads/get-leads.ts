import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';

export async function getLeads(session: string, leadIds: string[], selectFields: string[] = []): Promise<Lead[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      ids: leadIds,
      select_fields: selectFields
    };
    
    const response = await axios.get(buildQueryURL('get_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get leads failed:', error);
    return [];
  }
} 