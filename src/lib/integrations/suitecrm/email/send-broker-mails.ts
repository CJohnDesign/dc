import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Sends broker-related emails through the SuiteCRM system.
 * 
 * This function triggers the sending of predefined broker emails in SuiteCRM for a specific
 * contact and company. It constructs the appropriate request payload with the necessary
 * authentication and recipient information, then processes the response to determine if
 * the emails were successfully sent.
 * 
 * @param session - The active session token for API authentication
 * @param contactId - The ID of the contact recipient for the broker emails
 * @param companyId - The ID of the company associated with the broker emails
 * @returns A Promise that resolves to true if the emails were successfully sent, false otherwise
 */
export async function sendBrokerMails(session: string, contactId: string, companyId: string): Promise<boolean> {
  logger.debug('Sending broker emails', { contactId, companyId });
  
  try {
    const data = {
      session,
      params: {
        contact_id: contactId,
        company_id: companyId
      }
    };
    
    logger.trace('Making send_broker_mails API request');
    const response = await axios.post(buildQueryURL('send_broker_mails', {}), data);
    
    const isSuccessful = response.data && response.data.success === true;
    if (isSuccessful) {
      logger.info('Broker emails sent successfully', { contactId, companyId });
    } else {
      logger.warn('Broker emails sending unsuccessful', { contactId, companyId });
    }
    
    return isSuccessful;
  } catch (error) {
    logger.error('Broker emails sending failed', { contactId, companyId, error });
    return false;
  }
} 