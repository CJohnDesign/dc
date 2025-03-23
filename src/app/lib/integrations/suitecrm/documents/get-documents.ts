import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getDocuments(session: string, module: string, leadId: string): Promise<Record<string, string> | null> {
  try {
    const restData = {
      session,
      params: {
        module,
        lead_id: leadId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_documents', restData));
    
    if (response.data && response.data.success && response.data.documantsAvailable) {
      return response.data.documents;
    }
    
    return null;
  } catch (error) {
    console.error('Get documents failed:', error);
    return null;
  }
} 