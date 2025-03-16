#!/usr/bin/env node

/**
 * Script to check available API methods and try to get lead data using standard methods
 * 
 * Usage:
 *   node scripts/check-available-methods.js
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

  console.log('\nMaking request:');
  console.log(JSON.stringify(data, null, 2));

  try {
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
    
    // 1. Get available methods
    console.log('\n1. Checking available API methods...');
    const methodsResponse = await restRequest('get_server_info', {}, sessionId);
    console.log('Server Info:');
    console.log(JSON.stringify(methodsResponse, null, 2));
    
    // 2. Try to get lead using get_entry
    console.log('\n2. Trying to get lead using get_entry...');
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
    } catch (error) {
      console.error(`Error getting lead: ${error.message}`);
    }
    
    // 3. Try to get lead using get_entries
    console.log('\n3. Trying to get lead using get_entries...');
    try {
      const leadsResponse = await restRequest('get_entries', {
        module_name: 'Leads',
        ids: [LEAD_ID],
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
      
      console.log('Leads Response:');
      console.log(JSON.stringify(leadsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting leads: ${error.message}`);
    }
    
    // 4. Try to get lead using get_entry_list with ID filter
    console.log('\n4. Trying to get lead using get_entry_list with ID filter...');
    try {
      const leadListResponse = await restRequest('get_entry_list', {
        module_name: 'Leads',
        query: `leads.id = '${LEAD_ID}'`,
        order_by: '',
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
          'primary_address_street',
          'primary_address_city',
          'primary_address_state',
          'primary_address_postalcode',
          'primary_address_country',
          'description',
          'date_entered',
          'date_modified'
        ],
        link_name_to_fields_array: [],
        max_results: 1,
        deleted: 0
      }, sessionId);
      
      console.log('Lead List Response:');
      console.log(JSON.stringify(leadListResponse, null, 2));
    } catch (error) {
      console.error(`Error getting lead list: ${error.message}`);
    }
    
    // 5. Try to get related documents
    console.log('\n5. Trying to get related documents...');
    try {
      const documentsResponse = await restRequest('get_relationships', {
        module_name: 'Leads',
        module_id: LEAD_ID,
        link_field_name: 'documents',
        related_module_query: '',
        related_fields: [
          'id', 
          'name', 
          'document_name', 
          'filename', 
          'active_date', 
          'status_id', 
          'description', 
          'date_entered'
        ],
        related_module_link_name_to_fields_array: [],
        deleted: 0
      }, sessionId);
      
      console.log('Documents Response:');
      console.log(JSON.stringify(documentsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting related documents: ${error.message}`);
    }
    
    // 6. Try to get related notes
    console.log('\n6. Trying to get related notes...');
    try {
      const notesResponse = await restRequest('get_relationships', {
        module_name: 'Leads',
        module_id: LEAD_ID,
        link_field_name: 'notes',
        related_module_query: '',
        related_fields: [
          'id', 
          'name', 
          'description', 
          'date_entered', 
          'created_by_name'
        ],
        related_module_link_name_to_fields_array: [],
        deleted: 0
      }, sessionId);
      
      console.log('Notes Response:');
      console.log(JSON.stringify(notesResponse, null, 2));
    } catch (error) {
      console.error(`Error getting related notes: ${error.message}`);
    }
    
    // 7. Try to search for leads by name
    console.log('\n7. Trying to search for leads by name...');
    try {
      const searchResponse = await restRequest('get_entry_list', {
        module_name: 'Leads',
        query: `leads.first_name LIKE '%DEBBIE%' AND leads.last_name LIKE '%SMITH%'`,
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
          'phone_mobile'
        ],
        link_name_to_fields_array: [],
        max_results: 10,
        deleted: 0
      }, sessionId);
      
      console.log('Search Response:');
      console.log(JSON.stringify(searchResponse, null, 2));
    } catch (error) {
      console.error(`Error searching leads: ${error.message}`);
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 