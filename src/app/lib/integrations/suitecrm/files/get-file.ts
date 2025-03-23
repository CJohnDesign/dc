import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function getFile(session: string, recordId: string): Promise<any | null> {
  try {
    const restData = {
      session,
      recordId
    };
    
    const response = await axios.get(buildQueryURL('get_file', restData));
    
    if (response.data && response.data.success && response.data.file) {
      return response.data.file;
    }
    
    return null;
  } catch (error) {
    console.error('Get file failed:', error);
    return null;
  }
} 