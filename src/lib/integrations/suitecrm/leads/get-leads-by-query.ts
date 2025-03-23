import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Lead } from './types';

export async function getLeadsByQuery(
  session: string, 
  query: string, 
  selectFields: string[] = [], 
  maxResults: number = 0, 
  offset: string = ""
): Promise<{ leads: Lead[], resultCount: number, nextOffset: number }> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      query,
      order_by: "",
      offset,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: maxResults,
      deleted: "false"
    };
    
    const response = await axios.get(buildQueryURL('get_entry_list', restData));
    
    if (response.data && response.data.success) {
      return {
        leads: response.data.entry_list || [],
        resultCount: response.data.result_count || 0,
        nextOffset: response.data.next_offset || 0
      };
    }
    
    return { leads: [], resultCount: 0, nextOffset: 0 };
  } catch (error) {
    console.error('Get leads by query failed:', error);
    return { leads: [], resultCount: 0, nextOffset: 0 };
  }
} 