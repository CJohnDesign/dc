// TODO: Turn this into server action or route handler

/**
 * SuiteCRM Lead Data Retrieval
 * 
 * This utility provides functions to retrieve lead data from SuiteCRM.
 * Based on the exploration documented in docs/customer-data.md
 */

import axios from 'axios';

// API endpoints
const API_URL = process.env.NEXT_PUBLIC_SUITECRM_API_URL || 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const CUSTOM_API_URL = process.env.NEXT_PUBLIC_SUITECRM_CUSTOM_API_URL || 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';

// Authentication credentials - hard-coded for local development
const USERNAME = process.env.SUITECRM_USERNAME || 'admin';
// MD5 hash of the password
const PASSWORD_HASH = process.env.SUITECRM_PASSWORD_HASH || '49c9d35708ec636e697b546d15b0db5d';

// Store the session ID
let sessionId: string | null = null;

/**
 * Make a REST request to the SuiteCRM API
 */
async function restRequest(url: string, method: string, params: any = {}) {
  try {
    const response = await axios.post(url, {
      method,
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: JSON.stringify(params)
    });

    if (response.data && response.data.error) {
      throw new Error(`API Error: ${response.data.error.description || 'Unknown error'}`);
    }

    return response.data;
  } catch (error) {
    console.error(`REST request error (${method}):`, error);
    throw error;
  }
}

/**
 * Login to SuiteCRM and get a session ID
 */
export async function login(): Promise<string> {
  try {
    const loginParams = {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD_HASH
      },
      application_name: 'DC CRM Client'
    };

    const response = await restRequest(API_URL, 'login', loginParams);
    
    if (response && response.id) {
      sessionId = response.id;
      return response.id;
    } else {
      throw new Error('Failed to get session ID');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Search for leads based on a search term
 */
export async function searchLeads(searchTerm: string, maxResults: number = 10): Promise<any[]> {
  if (!sessionId) {
    await login();
  }

  const searchParams = {
    session: sessionId,
    search_string: searchTerm,
    modules: ['Leads'],
    offset: 0,
    max_results: maxResults
  };

  const response = await restRequest(API_URL, 'search_by_module', searchParams);
  return response?.entry_list || [];
}

/**
 * Get detailed information for a specific lead
 */
export async function getLeadById(leadId: string): Promise<any> {
  if (!sessionId) {
    await login();
  }

  const leadParams = {
    session: sessionId,
    module_name: 'Leads',
    id: leadId,
    select_fields: [
      'id', 'first_name', 'last_name', 'email1', 'status',
      'primary_address_street', 'primary_address_city', 
      'primary_address_state', 'primary_address_postalcode',
      'ssn_c', 'experian_fico_c', 'equifax_fico_c', 'transunion_fico_c',
      'pre_qualification_score_c', 'pre_eval_decision_c',
      'date_entered', 'date_modified'
    ]
  };

  const response = await restRequest(API_URL, 'get_entry', leadParams);
  return response?.entry_list?.[0] || null;
}

/**
 * Get all available fields for the Leads module
 */
export async function getLeadFields(): Promise<any> {
  if (!sessionId) {
    await login();
  }

  const moduleFieldsParams = {
    session: sessionId,
    module_name: 'Leads'
  };

  const response = await restRequest(API_URL, 'get_module_fields', moduleFieldsParams);
  return response?.module_fields || null;
}

/**
 * Try to get relationships for a lead (notes, etc.)
 * Note: This method may return empty results as mentioned in the documentation
 */
export async function getLeadRelationships(leadId: string, linkFieldName: string = 'notes'): Promise<any> {
  if (!sessionId) {
    await login();
  }

  const relationshipsParams = {
    session: sessionId,
    module_name: 'Leads',
    module_id: leadId,
    link_field_name: linkFieldName,
    related_module_query: '',
    related_fields: ['*'],
    related_module_link_name_to_fields_array: [],
    deleted: 0
  };

  const response = await restRequest(API_URL, 'get_relationships', relationshipsParams);
  return response?.entry_list || [];
}

/**
 * Try to get custom data for a lead using the custom API
 * This is an experimental method based on the documentation
 */
export async function getCustomLeadData(leadId: string): Promise<any> {
  if (!sessionId) {
    await login();
  }

  // Try different custom methods mentioned in the documentation
  const customParams = {
    session: sessionId,
    lead_id: leadId
  };

  try {
    const response = await restRequest(CUSTOM_API_URL, 'get_customer_data', customParams);
    return response || null;
  } catch (error) {
    console.warn('Custom API call failed, this is expected based on documentation:', error);
    return null;
  }
}

/**
 * Get comprehensive lead data by combining multiple API calls
 */
export async function getComprehensiveLeadData(leadId: string): Promise<any> {
  if (!sessionId) {
    await login();
  }

  // Get basic lead data
  const basicData = await getLeadById(leadId);
  
  // Try to get relationships
  let relationships = null;
  try {
    relationships = await getLeadRelationships(leadId);
  } catch (error) {
    console.warn('Failed to get relationships:', error);
  }
  
  // Try to get custom data
  let customData = null;
  try {
    customData = await getCustomLeadData(leadId);
  } catch (error) {
    console.warn('Failed to get custom data:', error);
  }
  
  return {
    basicData,
    relationships,
    customData
  };
}

// Export a default object with all functions
export default {
  login,
  searchLeads,
  getLeadById,
  getLeadFields,
  getLeadRelationships,
  getCustomLeadData,
  getComprehensiveLeadData
}; 