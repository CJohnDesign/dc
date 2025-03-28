#!/usr/bin/env node

/**
 * Script to retrieve a single lead by ID from SuiteCRM
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
// MD5 hash of the password
const PASSWORD_HASH = '49c9d35708ec636e697b546d15b0db5d';

// Lead ID to retrieve - this is the ID for DEBBIE SMITH from previous scripts
const LEAD_ID = '4c35978a-0aec-7b36-1747-5e540def5546';

/**
 * Make a REST API request to SuiteCRM
 * @param {string} method - The API method to call
 * @param {object} parameters - The parameters for the API call
 * @returns {Promise<any>} - The API response
 */
async function restRequest(method, parameters = {}) {
  console.log(`\nMaking request to: ${API_URL}`);
  console.log(`Method: ${method}`);
  console.log(`Parameters:`, JSON.stringify(parameters, null, 2));

  try {
    const requestData = {
      method,
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: JSON.stringify(parameters)
    };

    console.log('Request data:', querystring.stringify(requestData));

    const response = await axios.post(
      API_URL,
      querystring.stringify(requestData),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log(`API Response Status: ${response.status}`);
    
    if (typeof response.data === 'object') {
      return response.data;
    } else {
      console.log(`API Response Data (raw): ${response.data}`);
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`Status: ${error.response.status}`);
      console.log(`Headers:`, error.response.headers);
      console.log(`Data:`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error message:', error.message);
    }
    console.log('Error config:', error.config);
    throw error;
  }
}

/**
 * Main function to authenticate and retrieve a single lead
 */
async function main() {
  console.log('Attempting to retrieve a single lead from SuiteCRM...');
  console.log(`Lead ID: ${LEAD_ID}`);
  
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

    // Step 2: Try to get a single lead by ID
    console.log('\nTrying to get a single lead by ID...');
    
    const leadParams = {
      session: sessionId,
      module_name: 'Leads',
      id: LEAD_ID,
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
      link_name_to_fields_array: []
    };

    try {
      const leadResponse = await restRequest('get_entry', leadParams);
      console.log('\nLead Response:');
      console.log(JSON.stringify(leadResponse, null, 2));
      
      if (leadResponse && leadResponse.entry_list && leadResponse.entry_list.length > 0) {
        console.log('\nLead Details:');
        leadResponse.entry_list[0].name_value_list.forEach(field => {
          console.log(`  ${field.name}: ${field.value}`);
        });
      } else {
        console.log('Lead not found or unexpected response format.');
      }
    } catch (error) {
      console.error(`Error getting lead: ${error.message}`);
      
      // Try with a different approach - using search_by_module
      console.log('\nTrying with search_by_module...');
      const searchParams = {
        session: sessionId,
        search_string: 'DEBBIE SMITH', // Search for DEBBIE SMITH
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
      
      try {
        const searchResponse = await restRequest('search_by_module', searchParams);
        console.log('\nSearch Response:');
        console.log(JSON.stringify(searchResponse, null, 2));
      } catch (searchError) {
        console.error(`Error searching for lead: ${searchError.message}`);
      }
    }

    // Step 3: Try to get server info to verify API functionality
    console.log('\nGetting server info to verify API functionality...');
    try {
      const serverInfoResponse = await restRequest('get_server_info', {});
      console.log('\nServer Info Response:');
      console.log(JSON.stringify(serverInfoResponse, null, 2));
    } catch (error) {
      console.error(`Error getting server info: ${error.message}`);
    }

  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
}

// Run the main function
main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
}); 