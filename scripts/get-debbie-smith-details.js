#!/usr/bin/env node

/**
 * Script to retrieve detailed information about the DEBBIE SMITH lead
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
// MD5 hash of the password
const PASSWORD_HASH = '49c9d35708ec636e697b546d15b0db5d';

// Lead ID for DEBBIE SMITH (the new ID we found)
const LEAD_ID = 'e620e105-b444-a3b6-10f8-67d0664ee1d8';

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
 * Main function to authenticate and retrieve lead details
 */
async function main() {
  console.log('Attempting to retrieve detailed information about the DEBBIE SMITH lead...');
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

    // Step 2: Get detailed information about the lead
    console.log('\nGetting detailed information about the lead...');
    
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
        'date_entered',
        'description',
        'address_street',
        'address_city',
        'address_state',
        'address_postalcode',
        'primary_address_street',
        'primary_address_city',
        'primary_address_state',
        'primary_address_postalcode'
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
      console.error(`Error getting lead details: ${error.message}`);
    }

    // Step 3: Try to get related notes
    console.log('\nTrying to get related notes...');
    
    const notesParams = {
      session: sessionId,
      module_name: 'Leads',
      module_id: LEAD_ID,
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

    try {
      const notesResponse = await restRequest('get_relationships', notesParams);
      console.log('\nNotes Response:');
      console.log(JSON.stringify(notesResponse, null, 2));
      
      if (notesResponse && notesResponse.entry_list && notesResponse.entry_list.length > 0) {
        console.log(`\nFound ${notesResponse.entry_list.length} related notes.`);
        
        notesResponse.entry_list.forEach((note, index) => {
          console.log(`\nNote #${index + 1}:`);
          note.name_value_list.forEach(field => {
            console.log(`  ${field.name}: ${field.value}`);
          });
        });
      } else {
        console.log('No related notes found or unexpected response format.');
      }
    } catch (error) {
      console.error(`Error getting related notes: ${error.message}`);
    }

    // Step 4: Try to get related documents
    console.log('\nTrying to get related documents...');
    
    const documentsParams = {
      session: sessionId,
      module_name: 'Leads',
      module_id: LEAD_ID,
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

    try {
      const documentsResponse = await restRequest('get_relationships', documentsParams);
      console.log('\nDocuments Response:');
      console.log(JSON.stringify(documentsResponse, null, 2));
      
      if (documentsResponse && documentsResponse.entry_list && documentsResponse.entry_list.length > 0) {
        console.log(`\nFound ${documentsResponse.entry_list.length} related documents.`);
        
        documentsResponse.entry_list.forEach((document, index) => {
          console.log(`\nDocument #${index + 1}:`);
          document.name_value_list.forEach(field => {
            console.log(`  ${field.name}: ${field.value}`);
          });
        });
      } else {
        console.log('No related documents found or unexpected response format.');
      }
    } catch (error) {
      console.error(`Error getting related documents: ${error.message}`);
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