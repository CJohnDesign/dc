import axios from 'axios';
import { buildQueryURL } from '../utils/api-helpers';

/**
 * Creates a meeting associated with a lead in the SuiteCRM system.
 * 
 * This function sends a request to the SuiteCRM API to schedule a meeting for a specific lead.
 * It constructs the appropriate request payload with the necessary authentication, meeting details,
 * and lead information, then processes the response to determine if the operation was successful.
 * 
 * @param session - The active session token for API authentication
 * @param event - The type or category of the meeting event
 * @param email - The email address of the lead for whom the meeting is being scheduled
 * @param name - The name of the lead for whom the meeting is being scheduled
 * @param startTime - The start time of the meeting in a format recognized by SuiteCRM
 * @param endTime - The end time of the meeting in a format recognized by SuiteCRM
 * @param description - Additional details or notes about the meeting
 * @returns A Promise that resolves to a boolean indicating whether the meeting was successfully scheduled
 */
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