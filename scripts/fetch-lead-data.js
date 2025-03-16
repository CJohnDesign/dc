/**
 * Fetch Lead Data Script
 * 
 * This script demonstrates how to fetch and log lead data from SuiteCRM.
 * Run with: node scripts/fetch-lead-data.js
 */

const axios = require('axios');

// API endpoints
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const CUSTOM_API_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';

// Authentication credentials
const USERNAME = 'admin';
// MD5 hash of the password
const PASSWORD_HASH = '49c9d35708ec636e697b546d15b0db5d';

// Example lead IDs from the documentation
const EXAMPLE_LEAD_IDS = [
  'e620e105-b444-a3b6-10f8-67d0664ee1d8', // DEBBIE SMITH
  '85ea89fe-5c55-6a8a-565e-67d625e93c94', // Chris Johnston
  '876a8e2f-2440-3110-6a7c-67d068ed5943'  // JOHN HOMEOWNER
];

// Store the session ID
let sessionId = null;

/**
 * Make a REST request to the SuiteCRM API
 */
async function restRequest(url, method, params = {}) {
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
async function login() {
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
async function searchLeads(searchTerm, maxResults = 10) {
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
async function getLeadById(leadId) {
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
async function getLeadFields() {
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
 */
async function getLeadRelationships(leadId, linkFieldName = 'notes') {
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
 */
async function getCustomLeadData(leadId) {
  if (!sessionId) {
    await login();
  }

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
async function getComprehensiveLeadData(leadId) {
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

/**
 * Search for leads by name
 */
async function searchLeadsByName(name) {
  console.log(`\n--- Searching for leads with name: ${name} ---`);
  try {
    const results = await searchLeads(name);
    console.log(`Found ${results.length} leads:`);
    
    results.forEach((lead, index) => {
      console.log(`${index + 1}. ID: ${lead.id}, Name: ${lead.name}, Module: ${lead.module_name}`);
    });
    
    return results;
  } catch (error) {
    console.error('Error searching leads:', error);
    return [];
  }
}

/**
 * Get detailed information for a specific lead
 */
async function getLeadDetails(leadId) {
  console.log(`\n--- Getting details for lead ID: ${leadId} ---`);
  try {
    const lead = await getLeadById(leadId);
    
    if (!lead) {
      console.log('No lead found with this ID');
      return;
    }
    
    console.log('Lead Details:');
    console.log(JSON.stringify(lead, null, 2));
    
    return lead;
  } catch (error) {
    console.error('Error getting lead details:', error);
  }
}

/**
 * Main function to run the script
 */
async function main() {
  try {
    // Login first
    console.log('Logging in to SuiteCRM...');
    await login();
    console.log('Login successful!');
    
    // Search for leads by name
    await searchLeadsByName('smith');
    
    // Get details for a specific lead
    const leadId = EXAMPLE_LEAD_IDS[0]; // DEBBIE SMITH
    await getLeadDetails(leadId);
    
    // Get comprehensive data for the lead
    console.log(`\n--- Getting comprehensive data for lead ID: ${leadId} ---`);
    const comprehensiveData = await getComprehensiveLeadData(leadId);
    console.log('Comprehensive Lead Data:');
    console.log(JSON.stringify(comprehensiveData, null, 2));
    
    // Get available lead fields
    console.log('\n--- Getting available lead fields ---');
    const fields = await getLeadFields();
    console.log('Available Lead Fields:');
    console.log(JSON.stringify(fields, null, 2));
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

// Run the script
main().catch(console.error); 