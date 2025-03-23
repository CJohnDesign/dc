import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Submits BDS PFS (Personal Financial Statement) form data to the SuiteCRM API.
 * 
 * This function sends a request to validate and process BDS PFS form data for a
 * specific module and record. It returns a boolean indicating whether the
 * submission was successful.
 * 
 * @param session - The active session token for API authentication
 * @param module - The CRM module name to which the form data belongs
 * @param id - The ID of the record being processed
 * @param fieldToCheck - The field name to be checked during submission validation
 * @returns A Promise that resolves to true if submission was successful, false otherwise
 */
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