import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function setPasswordCustomerPortal(
  session: string, 
  moduleName: string, 
  leadId: string, 
  password: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId,
        password_c: password
      }
    };
    
    const response = await axios.post(buildQueryURL('set_password_customer_portal', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Set password customer portal failed:', error);
    return false;
  }
} 