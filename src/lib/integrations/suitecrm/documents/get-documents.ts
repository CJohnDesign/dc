import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Retrieves documents associated with a specific lead from the SuiteCRM system.
 * 
 * This function fetches documents linked to a lead in the specified module from SuiteCRM.
 * It constructs the appropriate request payload with the necessary authentication and
 * lead information, then processes the response to extract the document data.
 * 
 * @param session - The active session token for API authentication
 * @param module - The CRM module name where the lead and documents are stored
 * @param leadId - The ID of the lead whose documents are being retrieved
 * @returns A Promise that resolves to a Record of document information if successful, or null otherwise
 */
export async function getDocuments(session: string, module: string, leadId: string): Promise<Record<string, string> | null> {
  logger.debug('Retrieving documents for lead', { module, leadId });
  
  try {
    const restData = {
      session,
      params: {
        module,
        lead_id: leadId
      }
    };
    
    logger.trace('Making get_documents API request');
    const response = await axios.get(buildQueryURL('get_documents', restData));
    
    if (response.data && response.data.success && response.data.documantsAvailable) {
      const documents = response.data.documents;
      const documentCount = documents ? Object.keys(documents).length : 0;
      
      logger.info('Documents retrieved successfully', { 
        leadId, 
        documentCount
      });
      
      return documents;
    }
    
    logger.warn('No documents available or retrieval unsuccessful', { leadId, module });
    return null;
  } catch (error) {
    logger.error('Document retrieval failed', { leadId, module, error });
    return null;
  }
} 