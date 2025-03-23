import axios from 'axios';

import { buildQueryURL } from '../utils/api-helpers';

/**
 * Sends a test email using the specified SMTP settings through the SuiteCRM system.
 * 
 * This function sends a test email to verify that the provided SMTP settings are working correctly.
 * It constructs the appropriate request payload with the necessary authentication, recipient email,
 * and SMTP configuration, then processes the response to determine if the test email was sent successfully.
 * 
 * @param session - The active session token for API authentication
 * @param email - The recipient email address for the test message
 * @param smtpSettings - An object containing SMTP configuration parameters
 * @returns A Promise that resolves to true if the test email was sent successfully, false otherwise
 */
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