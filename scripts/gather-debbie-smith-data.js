#!/usr/bin/env node

/**
 * Script to gather all available information about Debbie Smith from SuiteCRM
 * and save it as a JSON file in the data folder
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
// MD5 hash of the password
const PASSWORD_HASH = '49c9d35708ec636e697b546d15b0db5d';

// Lead ID for DEBBIE SMITH (the new ID we found)
const LEAD_ID = 'e620e105-b444-a3b6-10f8-67d0664ee1d8';

// Output file path
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'debbie-smith.json');

/**
 * Make a REST API request to SuiteCRM
 * @param {string} method - The API method to call
 * @param {object} parameters - The parameters for the API call
 * @returns {Promise<any>} - The API response
 */
async function restRequest(method, parameters = {}) {
  console.log(`Making request to: ${API_URL}`);
  console.log(`Method: ${method}`);

  try {
    const requestData = {
      method,
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: JSON.stringify(parameters)
    };

    const response = await axios.post(
      API_URL,
      querystring.stringify(requestData),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (typeof response.data === 'object') {
      return response.data;
    } else {
      try {
        // Try to parse the response if it's a JSON string
        return JSON.parse(response.data);
      } catch (parseError) {
        console.log(`Could not parse response as JSON: ${parseError.message}`);
        return response.data;
      }
    }
  } catch (error) {
    console.log('Error in API request:');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Data:`, error.response.data);
    } else {
      console.log(`Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Search for leads by name
 * @param {string} sessionId - The session ID
 * @param {string} searchTerm - The search term
 * @returns {Promise<any>} - The search response
 */
async function searchLeads(sessionId, searchTerm) {
  console.log(`Searching for leads with term: "${searchTerm}"`);
  
  const searchParams = {
    session: sessionId,
    search_string: searchTerm,
    modules: ['Leads'],
    offset: 0,
    max_results: 10,
    assigned_user_id: '',
    select_fields: [
      'id',
      'first_name',
      'last_name',
      'email1',
      'status',
      'lead_source',
      'phone_work',
      'phone_mobile',
      'date_entered'
    ],
    unified_search_only: false
  };
  
  return await restRequest('search_by_module', searchParams);
}

/**
 * Get detailed information about a lead
 * @param {string} sessionId - The session ID
 * @param {string} leadId - The lead ID
 * @returns {Promise<any>} - The lead response
 */
async function getLeadDetails(sessionId, leadId) {
  console.log(`Getting detailed information about lead ID: ${leadId}`);
  
  const leadParams = {
    session: sessionId,
    module_name: 'Leads',
    id: leadId,
    select_fields: [
      'id',
      'first_name',
      'last_name',
      'email1',
      'status',
      'lead_source',
      'phone_work',
      'phone_mobile',
      'date_entered',
      'description',
      'address_street',
      'address_city',
      'address_state',
      'address_postalcode',
      'primary_address_street',
      'primary_address_city',
      'primary_address_state',
      'primary_address_postalcode',
      'ssn_c',
      'experian_fico_c',
      'equifax_fico_c',
      'transunion_fico_c',
      'total_assets_pfs_c',
      'total_liabilities_pfs_c',
      'net_worth_pfs_c',
      'total_income_pfs_c',
      'total_liabilities_and_net_worth_pfs_c',
      'total_contingent_liabilities_pfs_c',
      'pre_qualification_c',
      'pre_qualification_score_c',
      'pre_eval_decision_c',
      'upfront_fee_c',
      'number_of_payments_c',
      'go_high_level_status_c'
    ],
    link_name_to_fields_array: []
  };
  
  return await restRequest('get_entry', leadParams);
}

/**
 * Get related notes for a lead
 * @param {string} sessionId - The session ID
 * @param {string} leadId - The lead ID
 * @returns {Promise<any>} - The notes response
 */
async function getRelatedNotes(sessionId, leadId) {
  console.log(`Getting related notes for lead ID: ${leadId}`);
  
  const notesParams = {
    session: sessionId,
    module_name: 'Leads',
    module_id: leadId,
    link_field_name: 'notes',
    related_module_query: '',
    related_fields: [
      'id',
      'name',
      'description',
      'date_entered',
      'filename'
    ],
    related_module_link_name_to_fields_array: [],
    deleted: 0
  };
  
  return await restRequest('get_relationships', notesParams);
}

/**
 * Get related documents for a lead
 * @param {string} sessionId - The session ID
 * @param {string} leadId - The lead ID
 * @returns {Promise<any>} - The documents response
 */
async function getRelatedDocuments(sessionId, leadId) {
  console.log(`Getting related documents for lead ID: ${leadId}`);
  
  const documentsParams = {
    session: sessionId,
    module_name: 'Leads',
    module_id: leadId,
    link_field_name: 'documents',
    related_module_query: '',
    related_fields: [
      'id',
      'document_name',
      'description',
      'date_entered',
      'filename'
    ],
    related_module_link_name_to_fields_array: [],
    deleted: 0
  };
  
  return await restRequest('get_relationships', documentsParams);
}

/**
 * Format the lead data into a more readable format
 * @param {object} leadResponse - The lead response from the API
 * @returns {object} - The formatted lead data
 */
function formatLeadData(leadResponse) {
  if (!leadResponse || !leadResponse.entry_list || !leadResponse.entry_list[0]) {
    return {};
  }
  
  const leadData = {};
  const nameValueList = leadResponse.entry_list[0].name_value_list;
  
  // Convert name_value_list to a more readable format
  for (const key in nameValueList) {
    if (nameValueList[key] && nameValueList[key].name && nameValueList[key].value !== undefined) {
      leadData[nameValueList[key].name] = nameValueList[key].value;
    }
  }
  
  return leadData;
}

/**
 * Main function to gather all information about Debbie Smith
 */
async function main() {
  console.log('Gathering all available information about Debbie Smith from SuiteCRM...');
  
  try {
    // Step 1: Authenticate with SuiteCRM API
    console.log('Authenticating with SuiteCRM API...');
    const loginParams = {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD_HASH
      },
      application_name: 'DC CRM Client'
    };

    const loginResponse = await restRequest('login', loginParams);
    
    if (!loginResponse || !loginResponse.id) {
      console.error('Failed to authenticate with SuiteCRM API');
      return;
    }

    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated with SuiteCRM API. Session ID: ${sessionId}`);

    // Step 2: Search for Debbie Smith leads
    const searchResponse = await searchLeads(sessionId, 'smith');
    
    // Initialize the data object
    const debbieSmithData = {
      lead: {},
      notes: [],
      documents: []
    };
    
    // Step 3: Get detailed information about the lead
    const leadResponse = await getLeadDetails(sessionId, LEAD_ID);
    debbieSmithData.lead = formatLeadData(leadResponse);
    
    // Step 4: Get related notes
    const notesResponse = await getRelatedNotes(sessionId, LEAD_ID);
    if (notesResponse && notesResponse.entry_list) {
      debbieSmithData.notes = notesResponse.entry_list;
    }
    
    // Step 5: Get related documents
    const documentsResponse = await getRelatedDocuments(sessionId, LEAD_ID);
    if (documentsResponse && documentsResponse.entry_list) {
      debbieSmithData.documents = documentsResponse.entry_list;
    }
    
    // Step 6: Add additional information from the image
    debbieSmithData.additionalInfo = {
      time_in_status: "5 Days",
      ssn: "*****7777",
      experian_fico: "538",
      equifax_fico: "0",
      transunion_fico: "0",
      total_assets_pfs: "0",
      total_liabilities_pfs: "0",
      net_worth_pfs: "0",
      total_income_pfs: "0",
      total_liabilities_and_net_worth_pfs: "0",
      total_contingent_liabilities_pfs: "0",
      pre_qualification: "Fail",
      pre_qualification_score: "37.5",
      go_high_level_status: "Not Synced With Go High Level",
      dc_pre_qualification_score: "37.5",
      cc_pre_qualification_approval_rate: "$2,625",
      credit_score: "538",
      open_tl: "8",
      total_tl_limit: "$18,032",
      highest_rev_limit: "$350",
      age_of_oldest_tl: "3y 3m",
      individual_credit_util: "93%",
      total_credit_util: "92%",
      inquiries: "1"
    };
    
    // Step 7: Save the data to a JSON file
    console.log(`Saving data to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(debbieSmithData, null, 2));
    
    console.log('Data saved successfully!');
    console.log(`File location: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
}

// Run the main function
main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
}); 