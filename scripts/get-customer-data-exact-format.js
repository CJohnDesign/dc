#!/usr/bin/env node

/**
 * Script to call get_customer_data endpoint using the exact format from the API interface
 * 
 * Usage:
 *   node scripts/get-customer-data-exact-format.js
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
    
    // Call get_customer_data using the exact format from the API interface
    console.log('\nCalling get_customer_data endpoint with exact format from API interface...');
    
    const customerDataResponse = await restRequest(
      'get_customer_data',
      'JSON',
      'JSON',
      JSON.stringify({
        session: sessionId,
        params: {
          origin: "web_portal",
          leadID: LEAD_ID
        }
      })
    );
    
    console.log('\nAPI Response:');
    console.log(JSON.stringify(customerDataResponse, null, 2));
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 