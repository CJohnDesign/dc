#!/usr/bin/env node

/**
 * Script to fetch all contacts from the SuiteCRM API
 * 
 * Usage:
 *   node scripts/fetch-all-contacts.js
 * 
 * This script demonstrates how to use the SuiteCRM API client
 * to authenticate and fetch all contacts.
 */

// Import axios for making direct API calls
const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

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
    
    const loginResponse = await restRequest('login', loginArgs);
    
    if (!loginResponse.data || !loginResponse.data.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.data.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);
    
    console.log('\nFetching all contacts...');
    
    // Prepare the search parameters to get all contacts
    let searchArgs = {
      session: sessionId,
      module_name: 'Contacts',
      query: '', // Empty query to get all contacts
      order_by: '',
      offset: 0,
      select_fields: ['id', 'first_name', 'last_name', 'email', 'phone_work', 'phone_mobile'],
      link_name_to_fields_array: [],
      max_results: 100, // Get up to 100 contacts
      deleted: 0
    };
    
    // Call the API to get all contacts
    const entryListResponse = await restRequest('get_entry_list', searchArgs);
    
    console.log('\nContacts Response:');
    console.log(`Total contacts found: ${entryListResponse.data.result_count}`);
    
    // Display all contacts
    if (entryListResponse.data && 
        entryListResponse.data.entry_list && 
        entryListResponse.data.entry_list.length > 0) {
      
      console.log('\nContacts:');
      entryListResponse.data.entry_list.forEach((contact, index) => {
        console.log(`\nContact #${index + 1}:`);
        console.log(`ID: ${contact.id}`);
        
        // Display name values
        if (contact.name_value_list) {
          Object.keys(contact.name_value_list).forEach(key => {
            const value = contact.name_value_list[key].value;
            if (value) {
              console.log(`${key}: ${value}`);
            }
          });
        }
      });
      
      // Try to find DEBBIE SMITH in the results
      const debbieSmith = entryListResponse.data.entry_list.find(contact => {
        const firstName = contact.name_value_list.first_name?.value || '';
        const lastName = contact.name_value_list.last_name?.value || '';
        return firstName.toUpperCase() === 'DEBBIE' && lastName.toUpperCase() === 'SMITH';
      });
      
      if (debbieSmith) {
        console.log('\nFound DEBBIE SMITH:');
        console.log(`ID: ${debbieSmith.id}`);
        Object.keys(debbieSmith.name_value_list).forEach(key => {
          const value = debbieSmith.name_value_list[key].value;
          if (value) {
            console.log(`${key}: ${value}`);
          }
        });
      } else {
        console.log('\nDEBBIE SMITH not found in the contacts list.');
      }
      
    } else {
      console.log('\nNo contacts found in the system.');
    }
    
    // Try to get available modules
    console.log('\nFetching available modules...');
    const availableModulesArgs = {
      session: sessionId
    };
    
    const availableModulesResponse = await restRequest('get_available_modules', availableModulesArgs);
    console.log('\nAvailable Modules:');
    
    if (availableModulesResponse.data && availableModulesResponse.data.modules) {
      availableModulesResponse.data.modules.forEach(module => {
        console.log(`- ${module.module_key}`);
      });
    } else {
      console.log('No modules information available.');
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