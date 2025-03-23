import axios from 'axios';

// Base API URL from swagger
export const API_BASE_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';

// Utility to build the query URL with parameters
export function buildQueryURL(method: string, restData: any): string {
  return `${API_BASE_URL}?input_type=JSON&method=${method}&response_type=JSON&rest_data=${encodeURIComponent(JSON.stringify(restData))}`;
} 