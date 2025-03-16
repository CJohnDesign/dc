#!/usr/bin/env node

/**
 * Script to call get_entry_list endpoint to retrieve all leads and contacts
 * 
 * Usage:
 *   node scripts/try-get-entry-list.js
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
    
    // Try to get available modules first
    console.log('\nGetting available modules...');
    
    const modulesResponse = await restRequest(
      'get_available_modules',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId
      })
    );
    
    console.log('\nAvailable Modules:');
    console.log(JSON.stringify(modulesResponse, null, 2));
    
    // Try to get all leads
    console.log('\nTrying to get all leads...');
    
    try {
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
    } catch (error) {
      console.error(`Error getting all leads: ${error.message}`);
    }
    
    // Try with Contacts module
    console.log('\nTrying to get all contacts...');
    
    try {
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
      
      console.log('\nAll Contacts Response:');
      console.log(JSON.stringify(getContactsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting all contacts: ${error.message}`);
    }
    
    // Try with Accounts module
    console.log('\nTrying to get all accounts...');
    
    try {
      const getAccountsResponse = await restRequest(
        'get_entry_list',
        'JSON',
        'JSON',
        JSON.stringify({
          session: sessionId,
          module_name: "Accounts",
          query: "",
          order_by: "date_entered DESC",
          offset: 0,
          select_fields: ["id", "name", "phone_office", "email1"],
          link_name_to_fields_array: [],
          max_results: 10,
          deleted: 0
        })
      );
      
      console.log('\nAll Accounts Response:');
      console.log(JSON.stringify(getAccountsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting all accounts: ${error.message}`);
    }
    
    // Try with Documents module
    console.log('\nTrying to get all documents...');
    
    try {
      const getDocumentsResponse = await restRequest(
        'get_entry_list',
        'JSON',
        'JSON',
        JSON.stringify({
          session: sessionId,
          module_name: "Documents",
          query: "",
          order_by: "date_entered DESC",
          offset: 0,
          select_fields: ["id", "name", "document_name", "filename", "active_date", "status_id"],
          link_name_to_fields_array: [],
          max_results: 10,
          deleted: 0
        })
      );
      
      console.log('\nAll Documents Response:');
      console.log(JSON.stringify(getDocumentsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting all documents: ${error.message}`);
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 