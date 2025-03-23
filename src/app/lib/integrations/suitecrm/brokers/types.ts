export interface BrokerDetails {
  id: string;
  username_c: string;
  broker_details: Record<string, any>;
  [key: string]: any;
}

export interface BrokerCount {
  total_count: number;
  business_application: number;
  personal_application: number;
} 