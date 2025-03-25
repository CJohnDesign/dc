import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

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
  logger.debug('Retrieving BDS form data', { 
    leadId, 
    fieldCount: Object.keys(requestedFields).length 
  });
  
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId,
        ...requestedFields
      }
    };
    
    logger.trace('Making get_bds_form_data API request', { 
      leadId, 
      fields: Object.keys(requestedFields) 
    });
    const response = await axios.get(buildQueryURL('get_bds_form_data', restData));
    
    if (response.data && response.data.success) {
      logger.info('BDS form data retrieved successfully', { leadId });
      return response.data;
    }
    
    logger.warn('BDS form data retrieval unsuccessful', { leadId });
    return null;
  } catch (error) {
    logger.error('BDS form data retrieval failed', { leadId, error });
    return null;
  }
} 