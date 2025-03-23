import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function requestTwoFactorAgain(session: string, moduleName: string, leadId: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('request_two_factor_again', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Request two factor again failed:', error);
    return false;
  }
} 