#!/usr/bin/env node

/**
 * Script to retrieve leads using the get_associated_leads method from SuiteCRM
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';
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
    const response = await axios.post(
      API_URL,
      querystring.stringify({
        method,
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: JSON.stringify(parameters)
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.status === 200) {
      console.log(`API Response Status: ${response.status}`);
      if (typeof response.data === 'object') {
        return response.data;
      } else {
        console.log(`API Response Data: ${JSON.stringify(response.data)}`);
        return response.data;
      }
    } else {
      console.log(`API Response Status: ${response.status}`);
      console.log(`API Response Data: ${JSON.stringify(response.data)}`);
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.log(`API Response Status: ${error.response.status}`);
      console.log(`API Response Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Main function to authenticate and retrieve leads
 */
async function main() {
  console.log('Attempting to retrieve associated leads from SuiteCRM...');
  
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

    // Step 2: Try to get associated leads
    console.log('\nTrying to get associated leads...');
    
    // Try with minimal parameters first
    const leadsParams = {
      session: sessionId,
      params: {}
    };

    try {
      const leadsResponse = await restRequest('get_associated_leads', leadsParams);
      console.log('\nAssociated Leads Response:');
      console.log(JSON.stringify(leadsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting associated leads: ${error.message}`);
      
      // Try with a broker_id parameter if available
      console.log('\nTrying with a broker_id parameter...');
      const leadsWithBrokerParams = {
        session: sessionId,
        params: {
          broker_id: 'sample_broker_id' // This is a placeholder, replace with actual broker ID if known
        }
      };
      
      try {
        const leadsWithBrokerResponse = await restRequest('get_associated_leads', leadsWithBrokerParams);
        console.log('\nAssociated Leads with Broker ID Response:');
        console.log(JSON.stringify(leadsWithBrokerResponse, null, 2));
      } catch (brokerError) {
        console.error(`Error getting associated leads with broker ID: ${brokerError.message}`);
      }
    }

    // Step 3: Try to get available modules to understand what's available
    console.log('\nGetting available modules to understand the API better...');
    const modulesParams = {
      session: sessionId
    };

    try {
      const modulesResponse = await restRequest('get_available_modules', modulesParams);
      console.log('\nAvailable Modules Response:');
      console.log(JSON.stringify(modulesResponse, null, 2));
    } catch (error) {
      console.error(`Error getting available modules: ${error.message}`);
    }

    // Step 4: Try to get server info
    console.log('\nGetting server info...');
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