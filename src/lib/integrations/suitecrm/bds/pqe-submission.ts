import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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
  try {
    const restData = {
      session,
      params: leadData
    };
    
    const response = await axios.get(buildQueryURL('pqe_submission', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('PQE submission failed:', error);
    return false;
  }
} 