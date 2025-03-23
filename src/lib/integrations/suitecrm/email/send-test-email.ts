import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function sendTestEmail(
  session: string, 
  email: string, 
  smtpSettings: Record<string, any>
): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        email,
        smtp_settings: smtpSettings
      }
    };
    
    const response = await axios.post(buildQueryURL('send_test_email', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Send test email failed:', error);
    return false;
  }
} 