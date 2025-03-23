import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function isDuplicateEmail(
  session: string, 
  email: string, 
  module: string, 
  field?: string
): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        email,
        module,
        field
      }
    };
    
    const response = await axios.post(buildQueryURL('is_duplicate_email', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Is duplicate email failed:', error);
    return false;
  }
} 