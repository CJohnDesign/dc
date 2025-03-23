import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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