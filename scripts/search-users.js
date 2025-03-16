#!/usr/bin/env node

/**
 * Script to search for users in SuiteCRM
 * 
 * Usage:
 *   node scripts/search-users.js
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
    
    // Get all users
    console.log('\nGetting all users...');
    
    try {
      const getAllUsersResponse = await restRequest('get_entry_list', {
        module_name: 'Users',
        query: '',
        order_by: 'date_entered DESC',
        offset: 0,
        select_fields: [
          'id', 
          'user_name', 
          'first_name', 
          'last_name', 
          'email1', 
          'status', 
          'is_admin',
          'date_entered'
        ],
        link_name_to_fields_array: [],
        max_results: 20,
        deleted: 0
      }, sessionId);
      
      console.log('\nAll Users Response:');
      console.log(JSON.stringify(getAllUsersResponse, null, 2));
    } catch (error) {
      console.error(`Error getting all users: ${error.message}`);
    }
    
    // Search for a specific user by username
    console.log('\nSearching for user with username "admin"...');
    
    try {
      const searchUserResponse = await restRequest('get_entry_list', {
        module_name: 'Users',
        query: "users.user_name = 'admin'",
        order_by: '',
        offset: 0,
        select_fields: [
          'id', 
          'user_name', 
          'first_name', 
          'last_name', 
          'email1', 
          'status', 
          'is_admin',
          'date_entered'
        ],
        link_name_to_fields_array: [],
        max_results: 1,
        deleted: 0
      }, sessionId);
      
      console.log('\nUser Search Response:');
      console.log(JSON.stringify(searchUserResponse, null, 2));
      
      // If we found a user, get more details
      if (searchUserResponse.entry_list && searchUserResponse.entry_list.length > 0) {
        const userId = searchUserResponse.entry_list[0].id;
        
        console.log(`\nGetting detailed information for user ID: ${userId}`);
        
        const userDetailsResponse = await restRequest('get_entry', {
          module_name: 'Users',
          id: userId,
          select_fields: [
            'id', 
            'user_name', 
            'first_name', 
            'last_name', 
            'email1', 
            'status', 
            'is_admin',
            'title',
            'department',
            'phone_work',
            'phone_mobile',
            'address_street',
            'address_city',
            'address_state',
            'address_postalcode',
            'address_country',
            'description',
            'date_entered',
            'date_modified'
          ]
        }, sessionId);
        
        console.log('\nUser Details Response:');
        console.log(JSON.stringify(userDetailsResponse, null, 2));
      }
    } catch (error) {
      console.error(`Error searching for user: ${error.message}`);
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 