import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Retrieves BDS form data for a specific lead.
 * 
 * This function fetches form data from the SuiteCRM API for a given lead ID and
 * the requested fields. It can be used to populate forms with existing data from the CRM.
 * 
 * @param session - The active session token for API authentication
 * @param leadId - The ID of the lead for which to retrieve form data
 * @param requestedFields - An object containing the fields to retrieve, with field names as keys
 * @returns A Promise that resolves to the requested data on success, or null on failure
 */
export async function getBDSFormData(
  session: string, 
  leadId: string, 
  requestedFields: Record<string, string>
): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId,
        ...requestedFields
      }
    };
    
    const response = await axios.get(buildQueryURL('get_bds_form_data', restData));
    
    if (response.data && response.data.success) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get BDS form data failed:', error);
    return null;
  }
} 