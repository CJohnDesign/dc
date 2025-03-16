#!/usr/bin/env node

/**
 * Script to call check_email_exist endpoint using the exact format from the API interface
 * 
 * Usage:
 *   node scripts/check-email-exist.js
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
    
    // Call check_email_exist using the exact format from the API interface
    console.log('\nCalling check_email_exist endpoint with exact format from API interface...');
    
    // Format exactly as shown in the API documentation
    const checkEmailResponse = await restRequest(
      'check_email_exist',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        params: {
          module_name: "Leads",
          email: "test_HANNAH@mailinator.com"
        }
      })
    );
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(checkEmailResponse, null, 2));
    
    // Try with a different email
    console.log('\nTrying with a different email...');
    
    const checkEmail2Response = await restRequest(
      'check_email_exist',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        params: {
          module_name: "Leads",
          email: "debbie.smith@example.com"
        }
      })
    );
    
    console.log('\nAPI Response for second email:');
    console.log(JSON.stringify(checkEmail2Response, null, 2));
    
    // Try with Contacts module
    console.log('\nTrying with Contacts module...');
    
    const checkEmailContactsResponse = await restRequest(
      'check_email_exist',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        params: {
          module_name: "Contacts",
          email: "test@example.com"
        }
      })
    );
    
    console.log('\nAPI Response for Contacts module:');
    console.log(JSON.stringify(checkEmailContactsResponse, null, 2));
    
    // Try with Users module
    console.log('\nTrying with Users module...');
    
    const checkEmailUsersResponse = await restRequest(
      'check_email_exist',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        params: {
          module_name: "Users",
          email: "admin@example.com"
        }
      })
    );
    
    console.log('\nAPI Response for Users module:');
    console.log(JSON.stringify(checkEmailUsersResponse, null, 2));
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 