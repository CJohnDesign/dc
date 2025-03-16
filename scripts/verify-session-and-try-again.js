#!/usr/bin/env node

/**
 * Script to verify session ID validity and try different approaches with get_customer_data
 * 
 * Usage:
 *   node scripts/verify-session-and-try-again.js
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
const PASSWORD = 'QA6N6uBUyTHGg8g';
// MD5 hash the password as required by SuiteCRM API v4.1
const PASSWORD_MD5 = crypto.createHash('md5').update(PASSWORD).digest('hex');

// Debbie Smith's lead ID
const LEAD_ID = '4c35978a-0aec-7b36-1747-5e540def5546';

// Helper function for REST API requests
async function restRequest(method, parameters = {}, sessionId = null) {
  const data = {
    method,
    input_type: 'JSON',
    response_type: 'JSON',
    rest_data: JSON.stringify(sessionId ? { session: sessionId, ...parameters } : parameters)
  };

  try {
    console.log(`\nMaking request to ${method}:`);
    console.log(JSON.stringify(data, null, 2));
    
    const response = await axios.post(API_URL, querystring.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`API Response Status: ${error.response.status}`);
      console.error(`API Response Data: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    throw error;
  }
}

// Main function
async function main() {
  try {
    console.log(`Using API URL: ${API_URL}`);
    console.log(`Lead ID: ${LEAD_ID}`);
    console.log('Authenticating with SuiteCRM API...');
    
    // Login using the correct format from documentation
    const loginResponse = await restRequest('login', {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD_MD5
      },
      application_name: 'DC CRM Client'
    });
    
    if (!loginResponse.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId}`);
    
    // Verify session ID is valid by calling a known working endpoint
    console.log('\nVerifying session ID validity by calling get_available_modules...');
    try {
      const modulesResponse = await restRequest('get_available_modules', {}, sessionId);
      console.log('Session ID is valid. Available modules:');
      console.log(`Found ${modulesResponse.modules.length} modules.`);
      console.log(`First few modules: ${modulesResponse.modules.slice(0, 5).map(m => m.module_key).join(', ')}...`);
    } catch (error) {
      console.error('Error verifying session ID:', error.message);
      throw new Error('Session ID verification failed');
    }
    
    // Try different approaches with get_customer_data
    console.log('\n--- APPROACH 1: Using the exact format from documentation ---');
    try {
      const customerDataResponse1 = await restRequest('get_customer_data', {
        params: {
          origin: "web_portal",
          leadID: LEAD_ID
        }
      }, sessionId);
      
      console.log('Response:');
      console.log(JSON.stringify(customerDataResponse1, null, 2));
    } catch (error) {
      console.error('Approach 1 failed:', error.message);
    }
    
    console.log('\n--- APPROACH 2: Using a different parameter format ---');
    try {
      const customerDataResponse2 = await restRequest('get_customer_data', {
        origin: "web_portal",
        leadID: LEAD_ID
      }, sessionId);
      
      console.log('Response:');
      console.log(JSON.stringify(customerDataResponse2, null, 2));
    } catch (error) {
      console.error('Approach 2 failed:', error.message);
    }
    
    console.log('\n--- APPROACH 3: Using a different method name ---');
    try {
      const customerDataResponse3 = await restRequest('get_lead_data', {
        params: {
          origin: "web_portal",
          leadID: LEAD_ID
        }
      }, sessionId);
      
      console.log('Response:');
      console.log(JSON.stringify(customerDataResponse3, null, 2));
    } catch (error) {
      console.error('Approach 3 failed:', error.message);
    }
    
    console.log('\n--- APPROACH 4: Using get_entry to fetch lead directly ---');
    try {
      const leadResponse = await restRequest('get_entry', {
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
          'primary_address_street',
          'primary_address_city',
          'primary_address_state',
          'primary_address_postalcode',
          'primary_address_country',
          'description',
          'date_entered',
          'date_modified'
        ]
      }, sessionId);
      
      console.log('Lead Response:');
      console.log(JSON.stringify(leadResponse, null, 2));
      
      // If successful, try to get related documents and notes
      if (leadResponse && leadResponse.entry_list && leadResponse.entry_list.length > 0) {
        const lead = leadResponse.entry_list[0];
        
        console.log('\nFetching related documents...');
        try {
          const documentsResponse = await restRequest('get_relationships', {
            module_name: 'Leads',
            module_id: LEAD_ID,
            link_field_name: 'documents',
            related_module_query: '',
            related_fields: ['id', 'name', 'document_name', 'date_entered', 'status_id', 'description'],
            related_module_link_name_to_fields_array: [],
            deleted: 0
          }, sessionId);
          
          console.log('Documents Response:');
          console.log(JSON.stringify(documentsResponse, null, 2));
        } catch (error) {
          console.error('Error fetching documents:', error.message);
        }
        
        console.log('\nFetching related notes...');
        try {
          const notesResponse = await restRequest('get_relationships', {
            module_name: 'Leads',
            module_id: LEAD_ID,
            link_field_name: 'notes',
            related_module_query: '',
            related_fields: ['id', 'name', 'date_entered', 'description', 'created_by_name'],
            related_module_link_name_to_fields_array: [],
            deleted: 0
          }, sessionId);
          
          console.log('Notes Response:');
          console.log(JSON.stringify(notesResponse, null, 2));
        } catch (error) {
          console.error('Error fetching notes:', error.message);
        }
      }
    } catch (error) {
      console.error('Approach 4 failed:', error.message);
    }
    
    console.log('\n--- APPROACH 5: Check available API methods ---');
    try {
      const serverInfoResponse = await axios.get(`${API_URL}?method=get_server_info`);
      console.log('Server Info Response:');
      console.log(JSON.stringify(serverInfoResponse.data, null, 2));
    } catch (error) {
      console.error('Error getting server info:', error.message);
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 