import logger from "@/utils/logger";

/**
 * Base URL for the SuiteCRM API endpoints.
 * 
 * This constant defines the root URL for all API requests to the SuiteCRM system.
 * It points to the REST API endpoint as defined in the SuiteCRM Swagger documentation.
 */
export const API_BASE_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';

/**
 * Builds a properly formatted URL for SuiteCRM API requests.
 * 
 * This utility function constructs a complete URL for making requests to the SuiteCRM API.
 * It combines the base URL with the specified method name and serializes the provided data
 * into the required format for SuiteCRM's REST API.
 * 
 * @param method - The SuiteCRM API method to call (e.g., 'get_entry', 'set_entry')
 * @param restData - The data payload to include in the request, typically containing session and params
 * @returns A fully formatted URL string ready for API requests
 */
export function buildQueryURL(method: string, restData: any): string {
  return `${API_BASE_URL}?input_type=JSON&method=${method}&response_type=JSON&rest_data=${encodeURIComponent(JSON.stringify(restData))}`;
} 