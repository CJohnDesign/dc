import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Retrieves the BDS PFS (Personal Financial Statement) status for a specific lead.
 * 
 * This function queries the SuiteCRM API to check whether a lead has completed
 * their Personal Financial Statement form. It returns a boolean indicating the
 * completion status of the PFS form.
 * 
 * @param session - The active session token for API authentication
 * @param leadId - The ID of the lead for which to check PFS status
 * @returns A Promise that resolves to true if the PFS form is complete, false otherwise
 */
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