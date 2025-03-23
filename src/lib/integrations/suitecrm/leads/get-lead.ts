import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';

export async function getLead(session: string, leadId: string, selectFields: string[] = []): Promise<Lead | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      id: leadId,
      offset: 0,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: 1,
      deleted: "false"
    };
    
    const response = await axios.get(buildQueryURL('get_entry', restData));
    
    if (response.data && response.data.success && response.data.entry) {
      return response.data.entry;
    }
    
    return null;
  } catch (error) {
    console.error('Get lead failed:', error);
    return null;
  }
} 