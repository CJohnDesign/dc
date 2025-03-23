import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

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