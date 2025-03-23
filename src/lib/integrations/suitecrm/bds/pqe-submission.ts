import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Submits Pre-Qualification Engine (PQE) data to the SuiteCRM API.
 * 
 * This function sends lead data to the PQE endpoint in SuiteCRM, which processes
 * the data for lead qualification. It returns a boolean indicating whether the
 * submission was successful.
 * 
 * @param session - The active session token for API authentication
 * @param leadData - An object containing the lead data to be submitted
 * @returns A Promise that resolves to true if submission was successful, false otherwise
 */
export async function pqeSubmission(session: string, leadData: Record<string, any>): Promise<boolean> {
  const leadId = leadData.id || leadData.lead_id || 'unknown';
  logger.debug('Submitting PQE data', { leadId });
  
  try {
    const restData = {
      session,
      params: leadData
    };
    
    logger.trace('Making pqe_submission API request', { dataFields: Object.keys(leadData) });
    const response = await axios.get(buildQueryURL('pqe_submission', restData));
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('PQE submission successful', { leadId });
    } else {
      logger.warn('PQE submission unsuccessful', { leadId });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('PQE submission failed', { leadId, error });
    return false;
  }
} 