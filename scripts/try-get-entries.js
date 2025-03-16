#!/usr/bin/env node

/**
 * Script to call get_entries endpoint using the exact format from the API interface
 * 
 * Usage:
 *   node scripts/try-get-entries.js
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
async function restRequest(method, inputType, responseType, restData) {
  const data = {
    method,
    input_type: inputType,
    response_type: responseType,
    rest_data: restData
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
    const loginResponse = await restRequest(
      'login',
      'JSON',
      'JSON',
      JSON.stringify({
        user_auth: {
          user_name: USERNAME,
          password: PASSWORD_MD5
        },
        application_name: 'DC CRM Client'
      })
    );
    
    if (!loginResponse.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId}`);
    
    // Call get_entries using the exact format from the API interface
    console.log('\nCalling get_entries endpoint with exact format from API interface...');
    
    // Format exactly as shown in the API documentation
    const getEntriesResponse = await restRequest(
      'get_entries',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        module_name: "Leads",
        ids: [LEAD_ID],
        select_fields: ["first_name", "last_name"]
      })
    );
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(getEntriesResponse, null, 2));
    
    // Try with a different lead ID if the first one fails
    console.log('\nTrying with a different approach - getting all leads...');
    
    const getAllLeadsResponse = await restRequest(
      'get_entry_list',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        module_name: "Leads",
        query: "",
        order_by: "date_entered DESC",
        offset: 0,
        select_fields: ["id", "first_name", "last_name", "email1", "status"],
        link_name_to_fields_array: [],
        max_results: 10,
        deleted: 0
      })
    );
    
    console.log('\nAll Leads Response:');
    console.log(JSON.stringify(getAllLeadsResponse, null, 2));
    
    // Try with Contacts module instead
    console.log('\nTrying with Contacts module instead...');
    
    const getContactsResponse = await restRequest(
      'get_entry_list',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        module_name: "Contacts",
        query: "",
        order_by: "date_entered DESC",
        offset: 0,
        select_fields: ["id", "first_name", "last_name", "email1"],
        link_name_to_fields_array: [],
        max_results: 10,
        deleted: 0
      })
    );
    
    console.log('\nContacts Response:');
    console.log(JSON.stringify(getContactsResponse, null, 2));
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 