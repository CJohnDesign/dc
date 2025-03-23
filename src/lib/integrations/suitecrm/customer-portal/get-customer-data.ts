import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getCustomerData(
  session: string, 
  origin: string, 
  leadId: string
): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        origin,
        leadID: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('get_customer_data', restData), {});
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get customer data failed:', error);
    return null;
  }
} 