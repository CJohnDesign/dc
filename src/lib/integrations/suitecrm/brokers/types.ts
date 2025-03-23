/**
 * Represents detailed information about a broker in the SuiteCRM system.
 * 
 * This interface defines the structure of broker data retrieved from the CRM,
 * including core identifiers and additional details that may vary based on
 * the broker's configuration and status.
 */
export interface BrokerDetails {
  /** Unique identifier for the broker */
  id: string;
  /** Username associated with the broker account */
  username_c: string;
  /** Detailed information about the broker in a flexible format */
  broker_details: Record<string, any>;
  /** Additional properties that may be present in the broker data */
  [key: string]: any;
}

/**
 * Represents count statistics for a broker in the SuiteCRM system.
 * 
 * This interface defines various metrics associated with a broker,
 * such as the total number of applications and breakdowns by application type.
 */
export interface BrokerCount {
  /** Total number of applications associated with the broker */
  total_count: number;
  /** Number of business applications associated with the broker */
  business_application: number;
  /** Number of personal applications associated with the broker */
  personal_application: number;
} 