import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Document } from './types';

/**
 * Fetches and displays a document from the SuiteCRM system.
 * 
 * This function retrieves a specific document from SuiteCRM based on the provided document ID.
 * It can optionally request a preview version of the document. The function handles the API
 * communication and transforms the response into a structured Document object.
 * 
 * @param session - The active session token for API authentication
 * @param documentId - The unique identifier of the document to retrieve
 * @param preview - Optional parameter to specify whether to include a preview ("yes" or "no"), defaults to "yes"
 * @returns A Promise that resolves to a Document object if successful, or null if the request fails
 */
export async function fetchAndDisplayDocument(
  session: string, 
  documentId: string, 
  preview: string = "yes"
): Promise<Document | null> {
  try {
    const restData = {
      session,
      params: {
        document_id: documentId,
        preview
      }
    };
    
    const response = await axios.get(buildQueryURL('fetch_and_display_document', restData));
    
    if (response.data && response.data.success === "true") {
      return {
        document_name: response.data.document_name,
        document_revision_id: response.data.document_revision_id,
        template_type: response.data.template_type,
        file_mime_type: response.data.file_mime_type,
        file_ext: response.data.file_ext,
        filename: response.data.filename,
        preview: response.data.preview,
        file_content: response.data.file_content
      };
    }
    
    return null;
  } catch (error) {
    console.error('Fetch and display document failed:', error);
    return null;
  }
} 