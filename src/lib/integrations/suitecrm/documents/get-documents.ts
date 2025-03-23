import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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