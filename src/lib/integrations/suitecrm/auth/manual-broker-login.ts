import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

interface BrokerDetails {
  id: string;
  username_c: string;
  broker_details: Record<string, any>;
  [key: string]: any;
}

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