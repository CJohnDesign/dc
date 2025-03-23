import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

export async function setMeetingForLead(
  session: string, 
  event: string, 
  email: string, 
  name: string,
  startTime: string,
  endTime: string,
  description: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      data: {
        event,
        payload: {
          email,
          name,
          scheduled_event: {
            start_time: startTime,
            end_time: endTime
          },
          questions_and_answers: [
            {
              answer: description
            }
          ]
        }
      }
    };
    
    const response = await axios.post(buildQueryURL('set_metting_for_lead', restData), {});
    
    return response.data === true;
  } catch (error) {
    console.error('Set meeting for lead failed:', error);
    return false;
  }
} 