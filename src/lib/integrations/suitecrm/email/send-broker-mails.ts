import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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
  try {
    const data = {
      session,
      params: {
        contact_id: contactId,
        company_id: companyId
      }
    };
    
    const response = await axios.post(buildQueryURL('send_broker_mails', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Send broker mails failed:', error);
    return false;
  }
} 