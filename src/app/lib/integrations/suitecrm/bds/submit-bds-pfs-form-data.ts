import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function submitBDSPFSFormData(
  session: string, 
  module: string, 
  id: string, 
  fieldToCheck: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module,
        id,
        field_to_check: fieldToCheck
      }
    };
    
    const response = await axios.get(buildQueryURL('submit_bds_pfs_form_data', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Submit BDS PFS form data failed:', error);
    return false;
  }
} 