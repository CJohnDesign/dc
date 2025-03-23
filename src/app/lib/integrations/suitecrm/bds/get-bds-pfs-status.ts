import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getBDSPFSStatus(session: string, leadId: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_bds_pfs_status', restData));
    
    if (response.data && response.data.success) {
      return response.data.bds_pfs_form_status === true;
    }
    
    return false;
  } catch (error) {
    console.error('Get BDS PFS status failed:', error);
    return false;
  }
} 