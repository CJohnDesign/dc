#!/usr/bin/env node

/**
 * Script to fetch information for DEBBIE SMITH from the SuiteCRM API
 * 
 * Usage:
 *   node scripts/fetch-debbie-smith.js [CUSTOMER_ID]
 * 
 * Example:
 *   node scripts/fetch-debbie-smith.js
 *   node scripts/fetch-debbie-smith.js 12345
 * 
 * This script demonstrates how to use the SuiteCRM API client
 * to authenticate and fetch user data for a specific user.
 */

// Import axios for making direct API calls
const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// Get customer ID from command line arguments
const customerId = process.argv[2];

// API configuration - using the correct endpoint from documentation
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
const PASSWORD = 'QA6N6uBUyTHGg8g';
// MD5 hash the password as required by SuiteCRM API v4.1
const PASSWORD_MD5 = crypto.createHash('md5').update(PASSWORD).digest('hex');

// Helper function for REST API requests
function restRequest(method, arguments) {
  const post = {
    method: method,
    input_type: "JSON",
    response_type: "JSON",
    rest_data: JSON.stringify(arguments)
  };

  return axios.post(API_URL, querystring.stringify(post), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// Main function
async function main() {
  try {
    console.log(`Using API URL: ${API_URL}`);
    console.log('Authenticating with SuiteCRM API...');
    
    // Login using the correct format from documentation
    const userAuth = {
      user_name: USERNAME,
      password: PASSWORD_MD5
    };
    const appName = 'DC CRM Client';
    const nameValueList = {};
    
    const loginArgs = {
      user_auth: userAuth,
      application_name: appName,
      name_value_list: nameValueList
    };
    
    console.log('Login request data:', JSON.stringify(loginArgs, null, 2));
    
    const loginResponse = await restRequest('login', loginArgs);
    console.log('Login response:', JSON.stringify(loginResponse.data, null, 2));
    
    if (!loginResponse.data || !loginResponse.data.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.data.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);
    
    console.log('\nFetching data for user: DEBBIE SMITH');
    
    // Prepare the search parameters
    let searchArgs = {
      session: sessionId,
      module_name: 'Contacts',
      query: customerId 
        ? `contacts.id = '${customerId}'` 
        : `contacts.first_name = 'DEBBIE' AND contacts.last_name = 'SMITH'`,
      order_by: '',
      offset: 0,
      select_fields: ['id', 'first_name', 'last_name', 'email', 'phone_work', 'phone_mobile'],
      link_name_to_fields_array: [],
      max_results: 10,
      deleted: 0
    };
    
    // If customer ID is provided, use it
    if (customerId) {
      console.log(`Using customer ID: ${customerId}`);
    } else {
      // Otherwise search by name
      console.log('Searching by name: DEBBIE SMITH');
    }
    
    // Call the API to get customer data using get_entry_list
    console.log('Search request data:', JSON.stringify(searchArgs, null, 2));
    const entryListResponse = await restRequest('get_entry_list', searchArgs);
    
    console.log('\nSearch Response:');
    console.log(JSON.stringify(entryListResponse.data, null, 2));
    
    // If we found contacts, try to get more details
    if (entryListResponse.data && 
        entryListResponse.data.entry_list && 
        entryListResponse.data.entry_list.length > 0) {
      
      const contact = entryListResponse.data.entry_list[0];
      const contactId = contact.id;
      
      console.log(`\nFound contact with ID: ${contactId}`);
      
      // Try to get more details using get_entry
      const entryArgs = {
        session: sessionId,
        module_name: 'Contacts',
        id: contactId,
        select_fields: [],
        link_name_to_fields_array: []
      };
      
      const entryResponse = await restRequest('get_entry', entryArgs);
      
      console.log('\nContact Details:');
      console.log(JSON.stringify(entryResponse.data, null, 2));
    } else {
      console.log('\nNo contacts found matching the criteria.');
      
      // Try the custom get_customer_data endpoint
      console.log('\nTrying custom get_customer_data endpoint...');
      
      const customerDataArgs = {
        session: sessionId,
        search_parameters: customerId 
          ? { customer_id: customerId } 
          : { name: 'DEBBIE SMITH' }
      };
      
      try {
        const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
        console.log('\nCustomer Data Response:');
        console.log(JSON.stringify(customerDataResponse.data, null, 2));
      } catch (error) {
        console.error('Error with get_customer_data:', error.message);
        if (error.response) {
          console.error('API Response Status:', error.response.status);
          console.error('API Response Data:', error.response.data);
        }
      }
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the main function
main(); 