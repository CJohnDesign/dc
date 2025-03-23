import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

interface LoginResponse {
  id: string;
}

export async function login(username: string, password: string): Promise<string> {
  try {
    const restData = {
      user_auth: {
        user_name: username,
        password: password,
        encryption: "PLAIN"
      },
      application: "Autobot"
    };
    
    const response = await axios.get<LoginResponse>(buildQueryURL('login', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    } else {
      throw new Error('Login failed: Invalid response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
} 