#!/usr/bin/env node

/**
 * Script to fetch all users from the SuiteCRM API
 * 
 * Usage:
 *   node scripts/fetch-all-users.js
 * 
 * This script demonstrates how to use the SuiteCRM API client
 * to authenticate and fetch all users.
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
    
    console.log('\nFetching all users...');
    
    // Prepare the search parameters to get all users
    let searchArgs = {
      session: sessionId,
      module_name: 'Users',
      query: '', // Empty query to get all users
      order_by: '',
      offset: 0,
      select_fields: ['id', 'user_name', 'first_name', 'last_name', 'email', 'phone_work', 'phone_mobile', 'status'],
      link_name_to_fields_array: [],
      max_results: 100, // Get up to 100 users
      deleted: 0
    };
    
    // Call the API to get all users
    const entryListResponse = await restRequest('get_entry_list', searchArgs);
    
    console.log('\nUsers Response:');
    console.log(`Total users found: ${entryListResponse.data.result_count}`);
    
    // Display all users
    if (entryListResponse.data && 
        entryListResponse.data.entry_list && 
        entryListResponse.data.entry_list.length > 0) {
      
      console.log('\nUsers:');
      entryListResponse.data.entry_list.forEach((user, index) => {
        console.log(`\nUser #${index + 1}:`);
        console.log(`ID: ${user.id}`);
        
        // Display name values
        if (user.name_value_list) {
          Object.keys(user.name_value_list).forEach(key => {
            const value = user.name_value_list[key].value;
            if (value) {
              console.log(`${key}: ${value}`);
            }
          });
        }
      });
      
      // Try to find DEBBIE SMITH in the results
      const debbieSmith = entryListResponse.data.entry_list.find(user => {
        const firstName = user.name_value_list.first_name?.value || '';
        const lastName = user.name_value_list.last_name?.value || '';
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
        console.log('\nDEBBIE SMITH not found in the users list.');
      }
      
    } else {
      console.log('\nNo users found in the system.');
    }
    
    // Try to search in other modules
    const modulesToSearch = ['Accounts', 'Leads', 'dc_brokers', 'dc_customers', 'dc_inquiries'];
    
    for (const moduleName of modulesToSearch) {
      console.log(`\nSearching in ${moduleName} module...`);
      
      try {
        const moduleSearchArgs = {
          session: sessionId,
          module_name: moduleName,
          query: '', // Empty query to get all records
          order_by: '',
          offset: 0,
          select_fields: ['id', 'name', 'first_name', 'last_name', 'email'],
          link_name_to_fields_array: [],
          max_results: 100,
          deleted: 0
        };
        
        const moduleResponse = await restRequest('get_entry_list', moduleSearchArgs);
        
        console.log(`Total ${moduleName} found: ${moduleResponse.data.result_count}`);
        
        if (moduleResponse.data && 
            moduleResponse.data.entry_list && 
            moduleResponse.data.entry_list.length > 0) {
          
          // Look for DEBBIE SMITH in the results
          const debbieSmith = moduleResponse.data.entry_list.find(entry => {
            if (!entry.name_value_list) return false;
            
            // Check various name fields that might contain "DEBBIE SMITH"
            const name = entry.name_value_list.name?.value || '';
            const firstName = entry.name_value_list.first_name?.value || '';
            const lastName = entry.name_value_list.last_name?.value || '';
            
            return name.toUpperCase().includes('DEBBIE SMITH') || 
                  (firstName.toUpperCase() === 'DEBBIE' && lastName.toUpperCase() === 'SMITH');
          });
          
          if (debbieSmith) {
            console.log(`\nFound DEBBIE SMITH in ${moduleName}:`);
            console.log(`ID: ${debbieSmith.id}`);
            Object.keys(debbieSmith.name_value_list).forEach(key => {
              const value = debbieSmith.name_value_list[key].value;
              if (value) {
                console.log(`${key}: ${value}`);
              }
            });
            
            // Get full details for this entry
            const entryArgs = {
              session: sessionId,
              module_name: moduleName,
              id: debbieSmith.id,
              select_fields: [],
              link_name_to_fields_array: []
            };
            
            const entryResponse = await restRequest('get_entry', entryArgs);
            
            console.log('\nFull Details:');
            console.log(JSON.stringify(entryResponse.data, null, 2));
          }
        }
      } catch (error) {
        console.error(`Error searching in ${moduleName}:`, error.message);
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