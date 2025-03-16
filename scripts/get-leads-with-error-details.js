#!/usr/bin/env node

/**
 * Script to retrieve leads from SuiteCRM with detailed error handling
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
// MD5 hash of the password
const PASSWORD_HASH = '49c9d35708ec636e697b546d15b0db5d';

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
 * Main function to authenticate and retrieve leads
 */
async function main() {
  console.log('Attempting to retrieve leads from SuiteCRM with detailed error handling...');
  
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

    // Step 2: Try to get leads with minimal query
    console.log('\nTrying to get leads with minimal query...');
    
    const leadsParams = {
      session: sessionId,
      module_name: 'Leads',
      query: '', // Empty query to get all leads
      order_by: 'date_entered DESC',
      offset: 0,
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
      link_name_to_fields_array: [],
      max_results: 10, // Limit to 10 results to avoid overwhelming response
      deleted: 0
    };

    try {
      const leadsResponse = await restRequest('get_entry_list', leadsParams);
      console.log('\nLeads Response:');
      console.log(JSON.stringify(leadsResponse, null, 2));
      
      if (leadsResponse && leadsResponse.entry_list) {
        console.log(`\nRetrieved ${leadsResponse.entry_list.length} leads.`);
        
        // Display lead information
        leadsResponse.entry_list.forEach((lead, index) => {
          console.log(`\nLead #${index + 1}:`);
          lead.name_value_list.forEach(field => {
            console.log(`  ${field.name}: ${field.value}`);
          });
        });
      } else {
        console.log('No leads found or unexpected response format.');
      }
    } catch (error) {
      console.error(`Error getting leads: ${error.message}`);
      
      // Try with a more specific query
      console.log('\nTrying with a more specific query...');
      const specificLeadsParams = {
        ...leadsParams,
        query: "leads.deleted=0", // Explicitly specify non-deleted leads
      };
      
      try {
        const specificLeadsResponse = await restRequest('get_entry_list', specificLeadsParams);
        console.log('\nSpecific Leads Response:');
        console.log(JSON.stringify(specificLeadsResponse, null, 2));
      } catch (specificError) {
        console.error(`Error getting leads with specific query: ${specificError.message}`);
      }
    }

    // Step 3: Try to get a list of modules to verify API functionality
    console.log('\nGetting available modules to verify API functionality...');
    const modulesParams = {
      session: sessionId
    };

    try {
      const modulesResponse = await restRequest('get_available_modules', modulesParams);
      console.log('\nAvailable Modules Response:');
      console.log(`Retrieved information about ${modulesResponse.modules.length} modules.`);
    } catch (error) {
      console.error(`Error getting available modules: ${error.message}`);
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