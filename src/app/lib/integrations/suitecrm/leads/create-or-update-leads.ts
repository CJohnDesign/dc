import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function createOrUpdateLeads(session: string, leadsData: Record<string, any>[]): Promise<string[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_lists: leadsData
    };
    
    const response = await axios.get(buildQueryURL('set_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data.map(item => item.id);
    }
    
    return [];
  } catch (error) {
    console.error('Create or update leads failed:', error);
    return [];
  }
} 