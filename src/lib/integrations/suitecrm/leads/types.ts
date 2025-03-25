/**
 * Represents a lead record from the SuiteCRM system.
 * 
 * This interface defines the structure of a lead object as returned by the SuiteCRM API.
 * It includes common lead properties like ID, name, and contact information, while also
 * allowing for additional dynamic properties through an index signature.
 * 
 * @property id - The unique identifier of the lead in the SuiteCRM system
 * @property first_name - The first name of the lead contact (optional)
 * @property last_name - The last name of the lead contact (optional)
 * @property email - The email address of the lead contact (optional)
 * @property [key: string] - Additional dynamic properties that may be present in the lead record
 */
export interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
} 