import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function pqeSubmission(session: string, leadData: Record<string, any>): Promise<boolean> {
  try {
    const restData = {
      session,
      params: leadData
    };
    
    const response = await axios.get(buildQueryURL('pqe_submission', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('PQE submission failed:', error);
    return false;
  }
} 