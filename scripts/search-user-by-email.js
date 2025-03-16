#!/usr/bin/env node

/**
 * Script to search for a user by email in SuiteCRM
 * 
 * Usage:
 *   node scripts/search-user-by-email.js
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

// Email to search for
const EMAIL_TO_SEARCH = 'michelle@delivercapital.com';

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
    
    // Search for user by email
    console.log(`\nSearching for user with email "${EMAIL_TO_SEARCH}"...`);
    
    try {
      const searchUserByEmailResponse = await restRequest('get_entry_list', {
        module_name: 'Users',
        query: `users.email1 = '${EMAIL_TO_SEARCH}'`,
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
      
      console.log('\nUser Search by Email Response:');
      console.log(JSON.stringify(searchUserByEmailResponse, null, 2));
    } catch (error) {
      console.error(`Error searching for user by email: ${error.message}`);
    }
    
    // Try searching for Test User 1 by email
    const TEST_USER_EMAIL = 'test.user.1.dc@mailinator.com';
    console.log(`\nSearching for user with email "${TEST_USER_EMAIL}"...`);
    
    try {
      const searchTestUserResponse = await restRequest('get_entry_list', {
        module_name: 'Users',
        query: `users.email1 = '${TEST_USER_EMAIL}'`,
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
      
      console.log('\nTest User Search Response:');
      console.log(JSON.stringify(searchTestUserResponse, null, 2));
    } catch (error) {
      console.error(`Error searching for test user: ${error.message}`);
    }
    
    // Try searching for Broker User by email
    const BROKER_USER_EMAIL = 'abdulhaqasif786@gmail.com';
    console.log(`\nSearching for user with email "${BROKER_USER_EMAIL}"...`);
    
    try {
      const searchBrokerUserResponse = await restRequest('get_entry_list', {
        module_name: 'Users',
        query: `users.email1 = '${BROKER_USER_EMAIL}'`,
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
      
      console.log('\nBroker User Search Response:');
      console.log(JSON.stringify(searchBrokerUserResponse, null, 2));
    } catch (error) {
      console.error(`Error searching for broker user: ${error.message}`);
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 