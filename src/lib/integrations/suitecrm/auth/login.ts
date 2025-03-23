import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Interface representing the response from a successful SuiteCRM login request.
 */
interface LoginResponse {
  id: string;
}

/**
 * Authenticates a user with the SuiteCRM API.
 * 
 * This function attempts to log in to the SuiteCRM system using the provided credentials.
 * It makes a GET request to the login endpoint with the user's credentials and returns
 * the session ID upon successful authentication.
 * 
 * @param username - The SuiteCRM username for authentication
 * @param password - The password associated with the username
 * @returns A Promise that resolves to the session ID string on successful login
 * @throws Error if authentication fails or if the API response is invalid
 */
export async function login(username: string, password: string): Promise<string> {
  logger.debug('Attempting SuiteCRM login', { username });
  
  try {
    const restData = {
      user_auth: {
        user_name: username,
        password: password,
        encryption: "PLAIN"
      },
      application: "Autobot"
    };
    
    logger.trace('Making SuiteCRM login request');
    const response = await axios.get<LoginResponse>(buildQueryURL('login', restData));
    
    if (response.data && response.data.id) {
      logger.info('SuiteCRM login successful');
      return response.data.id;
    } else {
      logger.error('SuiteCRM login failed: Invalid response structure');
      throw new Error('Login failed: Invalid response');
    }
  } catch (error) {
    logger.error('SuiteCRM login failed', error);
    throw error;
  }
}