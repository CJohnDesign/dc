import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Document } from './types';
import logger from '@/utils/logger';

/**
 * Retrieves a PQ (Pre-Qualification) document for a specific lead from the SuiteCRM system.
 * 
 * This function fetches the PQ document associated with the provided lead ID from SuiteCRM.
 * It constructs the appropriate request payload with the necessary authentication and lead
 * information, then processes the response to extract the document details.
 * 
 * @param session - The active session token for API authentication
 * @param leadId - The unique identifier of the lead whose PQ document is being requested
 * @returns A Promise that resolves to a Document object if successful, or null if the request fails
 */
export async function getPQDocument(session: string, leadId: string): Promise<Document | null> {
  logger.debug('Retrieving PQ document for lead', { leadId });
  
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId
      }
    };
    
    logger.trace('Making get_pq_document API request');
    const response = await axios.post(buildQueryURL('get_pq_document', restData), {});
    
    if (response.data && response.data.success === "true") {
      const document = {
        document_name: response.data.document_name,
        document_revision_id: response.data.document_revision_id,
        template_type: response.data.template_type,
        file_mime_type: response.data.file_mime_type,
        file_ext: response.data.file_ext,
        filename: response.data.filename,
        preview: response.data.preview,
        file_content: response.data.file_content
      };
      
      logger.info('PQ document retrieved successfully', { 
        leadId, 
        documentName: document.document_name,
        fileType: document.file_mime_type
      });
      
      return document;
    }
    
    logger.warn('PQ document retrieval unsuccessful', { leadId });
    return null;
  } catch (error) {
    logger.error('PQ document retrieval failed', { leadId, error });
    return null;
  }
} 