import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

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
  logger.debug('Submitting BDS PFS form data', { 
    module, 
    id, 
    fieldToCheck 
  });
  
  try {
    const restData = {
      session,
      params: {
        module,
        id,
        field_to_check: fieldToCheck
      }
    };
    
    logger.trace('Making submit_bds_pfs_form_data API request');
    const response = await axios.get(buildQueryURL('submit_bds_pfs_form_data', restData));
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('BDS PFS form data submitted successfully', { module, id });
    } else {
      logger.warn('BDS PFS form data submission unsuccessful', { module, id });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('BDS PFS form data submission failed', { module, id, error });
    return false;
  }
} 