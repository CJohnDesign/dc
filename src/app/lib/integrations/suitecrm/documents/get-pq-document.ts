import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import { Document } from './types';

export async function getPQDocument(session: string, leadId: string): Promise<Document | null> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('get_pq_document', restData), {});
    
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
    console.error('Get PQ document failed:', error);
    return null;
  }
} 