import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Creates or updates multiple lead records in the SuiteCRM system.
 * 
 * This function sends batch lead data to the SuiteCRM API to either create new leads
 * or update existing ones based on the provided data. It constructs the appropriate
 * request payload with the necessary authentication and lead information, then
 * processes the response to retrieve the IDs of the created or updated leads.
 * 
 * @param session - The active session token for API authentication
 * @param leadsData - An array of objects containing the lead fields and values to be created or updated
 * @returns A Promise that resolves to an array of IDs of the created/updated leads if successful, or an empty array if the operation failed
 */
export async function createOrUpdateLeads(session: string, leadsData: Record<string, any>[]): Promise<string[]> {
  // Count new vs. update operations for logging
  const newLeadsCount = leadsData.filter(lead => !lead.id).length;
  const updateLeadsCount = leadsData.length - newLeadsCount;
  
  logger.debug('Creating/updating multiple leads', { 
    totalCount: leadsData.length,
    newCount: newLeadsCount,
    updateCount: updateLeadsCount
  });
  
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_lists: leadsData
    };
    
    logger.trace('Making set_entries API request for leads batch', { 
      count: leadsData.length 
    });
    const response = await axios.get(buildQueryURL('set_entries', restData));
    
    if (Array.isArray(response.data)) {
      const leadIds = response.data.map(item => item.id);
      logger.info('Leads batch processing successful', { 
        processedCount: leadIds.length,
        requestedCount: leadsData.length
      });
      return leadIds;
    }
    
    logger.warn('Leads batch processing unsuccessful or invalid response format');
    return [];
  } catch (error) {
    logger.error('Leads batch processing failed', { 
      requestedCount: leadsData.length,
      error
    });
    return [];
  }
} 