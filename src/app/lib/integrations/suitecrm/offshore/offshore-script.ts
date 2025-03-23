import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function offshoreScript(
  session: string, 
  leadFields: Record<string, any>, 
  appointment?: string, 
  assignedUserId?: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        ...leadFields,
        appointment,
        assigned_user_id: assignedUserId
      }
    };
    
    const response = await axios.post(buildQueryURL('off_shore_script', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Offshore script failed:', error);
    return false;
  }
} 