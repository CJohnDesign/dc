import axios from 'axios';
import { API_BASE_URL, buildQueryURL } from '../utils/api-helpers';
import logger from '@/utils/logger';

/**
 * Interface representing the response from a successful SuiteCRM login request.
 */
interface LoginResponse {
  id: string;
  module_name?: string;
  name_value_list?: Record<string, any>;
  error?: {
    number?: string;
    name?: string;
    description?: string;
  };
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
    const payload = {
      user_auth: {
        user_name: username,
        password: password,
        encryption: "PLAIN"
      },
      application: "Autobot"
    };
    
    logger.debug('SuiteCRM login request payload:', payload);
    
    // Use direct POST instead of building a URL with parameters
    const response = await axios.post(
      API_BASE_URL,
      null,
      {
        params: {
          input_type: 'JSON',
          method: 'login',
          response_type: 'JSON',
          rest_data: JSON.stringify(payload)
        }
      }
    );
    
    logger.debug('SuiteCRM login response:', JSON.stringify(response.data));
    
    if (response.data && response.data.id) {
      logger.info('SuiteCRM login successful');
      return response.data.id;
    } else {
      logger.error('SuiteCRM login failed: Invalid response structure', response.data);
      throw new Error('Login failed: Invalid response');
    }
  } catch (error) {
    logger.error('SuiteCRM login failed', error);
    throw error;
  }
}