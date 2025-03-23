import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Authenticates a lead using manual login credentials.
 * 
 * This function attempts to authenticate a lead by their username and password
 * through the SuiteCRM API. It returns the lead's details upon successful
 * authentication or null if authentication fails.
 * 
 * @param session - The active session token for API authentication
 * @param username - The lead's username
 * @param password - The lead's password
 * @returns A Promise that resolves to the lead's details on success, or null on failure
 */
export async function manualLeadLogin(
  session: string, 
  username: string, 
  password: string
): Promise<Lead | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('manual_lead_login', restData));
    
    if (response.data && response.data.id) {
      return response.data as Lead;
    }
    
    return null;
  } catch (error) {
    console.error('Manual lead login failed:', error);
    return null;
  }
} 