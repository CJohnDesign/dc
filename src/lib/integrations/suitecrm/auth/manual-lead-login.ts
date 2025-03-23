import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

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