import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Creates or updates a lead record in the SuiteCRM system.
 * 
 * This function sends lead data to the SuiteCRM API to either create a new lead
 * or update an existing one based on the provided data. It constructs the appropriate
 * request payload with the necessary authentication and lead information, then
 * processes the response to retrieve the ID of the created or updated lead.
 * 
 * @param session - The active session token for API authentication
 * @param leadData - An object containing the lead fields and values to be created or updated
 * @returns A Promise that resolves to the ID of the created/updated lead if successful, or null if the operation failed
 */
export async function createOrUpdateLead(session: string, leadData: Record<string, any>): Promise<string | null> {
  // Extract lead identifiers for logging
  const leadEmail = leadData.email1 || leadData.email || 'unknown';
  const leadId = leadData.id || 'new lead';
  const isNew = !leadData.id;
  
  logger.debug(`${isNew ? 'Creating' : 'Updating'} lead`, { 
    leadId,
    email: leadEmail,
    fieldCount: Object.keys(leadData).length
  });
  
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_list: leadData
    };
    
    logger.trace('Making set_entry API request for lead', { 
      action: isNew ? 'create' : 'update',
      email: leadEmail 
    });
    const response = await axios.get(buildQueryURL('set_entry', restData));
    
    if (response.data && response.data.id) {
      logger.info(`Lead ${isNew ? 'created' : 'updated'} successfully`, { 
        leadId: response.data.id,
        email: leadEmail
      });
      return response.data.id;
    }
    
    logger.warn(`Lead ${isNew ? 'creation' : 'update'} unsuccessful`, { 
      email: leadEmail 
    });
    return null;
  } catch (error) {
    logger.error(`Lead ${isNew ? 'creation' : 'update'} failed`, { 
      leadId,
      email: leadEmail,
      error
    });
    return null;
  }
} 