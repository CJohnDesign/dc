import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

interface BrokerDetails {
  id: string;
  username_c: string;
  broker_details: Record<string, any>;
  [key: string]: any;
}

/**
 * Authenticates a broker using manual login credentials.
 * 
 * This function attempts to authenticate a broker by their username and password
 * through the SuiteCRM API. It returns the broker's details upon successful
 * authentication or null if authentication fails.
 * 
 * @param session - The active session token for API authentication
 * @param username - The broker's username
 * @param password - The broker's password
 * @returns A Promise that resolves to the broker's details on success, or null on failure
 */
export async function manualBrokerLogin(
  session: string, 
  username: string, 
  password: string
): Promise<BrokerDetails | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('manual_login', restData));
    
    if (response.data && response.data.id) {
      return response.data as BrokerDetails;
    }
    
    return null;
  } catch (error) {
    console.error('Manual broker login failed:', error);
    return null;
  }
} 