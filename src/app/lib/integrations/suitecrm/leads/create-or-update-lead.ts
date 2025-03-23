import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function createOrUpdateLead(session: string, leadData: Record<string, any>): Promise<string | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_list: leadData
    };
    
    const response = await axios.get(buildQueryURL('set_entry', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create or update lead failed:', error);
    return null;
  }
} 