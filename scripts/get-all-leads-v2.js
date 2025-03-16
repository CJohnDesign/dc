#!/usr/bin/env node

/**
 * Script to retrieve all leads from SuiteCRM
 * 
 * Usage:
 *   node scripts/get-all-leads-v2.js
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const CUSTOM_API_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';
const USERNAME = 'admin';
const PASSWORD = 'QA6N6uBUyTHGg8g';
// MD5 hash the password as required by SuiteCRM API v4.1
const PASSWORD_MD5 = crypto.createHash('md5').update(PASSWORD).digest('hex');

// Helper function for REST API requests
async function restRequest(url, method, parameters = {}, sessionId = null) {
  const data = {
    method,
    input_type: 'JSON',
    response_type: 'JSON',
    rest_data: JSON.stringify(sessionId ? { session: sessionId, ...parameters } : parameters)
  };

  console.log('\nMaking request to:', url);
  console.log('Method:', method);
  console.log('Parameters:', JSON.stringify(parameters, null, 2));

  try {
    const response = await axios.post(url, querystring.stringify(data), {
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
    console.log('Attempting to retrieve all leads from SuiteCRM...');
    console.log(`Using standard API URL: ${API_URL}`);
    console.log('Authenticating with SuiteCRM API...');
    
    // Login using the standard API
    const loginResponse = await restRequest(API_URL, 'login', {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD_MD5
      },
      application_name: 'DC CRM Client'
    });
    
    if (!loginResponse.id) {
      throw new Error('Failed to get session ID from standard API');
    }
    
    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated with standard API. Session ID: ${sessionId}`);
    
    // Try to get all leads using standard API
    console.log('\nTrying to get all leads using standard API...');
    
    try {
      const getAllLeadsResponse = await restRequest(API_URL, 'get_entry_list', {
        module_name: 'Leads',
        query: '',
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
          'phone_mobile',
          'date_entered'
        ],
        link_name_to_fields_array: [],
        max_results: 20,
        deleted: 0
      }, sessionId);
      
      console.log('\nStandard API - All Leads Response:');
      console.log(JSON.stringify(getAllLeadsResponse, null, 2));
    } catch (error) {
      console.error(`Error getting all leads from standard API: ${error.message}`);
    }
    
    // Now try with the custom API
    console.log(`\nUsing custom API URL: ${CUSTOM_API_URL}`);
    console.log('Authenticating with custom API...');
    
    // Login using the custom API
    try {
      const customLoginResponse = await axios.get(`${CUSTOM_API_URL}/login`, {
        params: {
          user_name: USERNAME,
          password: PASSWORD
        }
      });
      
      if (customLoginResponse.data && customLoginResponse.data.session_id) {
        const customSessionId = customLoginResponse.data.session_id;
        console.log(`Successfully authenticated with custom API. Session ID: ${customSessionId}`);
        
        // Try to get all leads using custom API
        console.log('\nTrying to get all leads using custom API...');
        
        const customGetLeadsResponse = await axios.get(`${CUSTOM_API_URL}/get_entry_list`, {
          params: {
            session: customSessionId,
            module_name: 'Leads',
            query: '',
            order_by: 'date_entered DESC',
            offset: 0,
            select_fields: JSON.stringify([
              'id', 
              'first_name', 
              'last_name', 
              'email1', 
              'status', 
              'lead_source',
              'phone_work',
              'phone_mobile',
              'date_entered'
            ]),
            max_results: 20
          }
        });
        
        console.log('\nCustom API - All Leads Response:');
        console.log(JSON.stringify(customGetLeadsResponse.data, null, 2));
      } else {
        console.error('Failed to get session ID from custom API');
      }
    } catch (error) {
      console.error(`Error with custom API: ${error.message}`);
      if (error.response) {
        console.error(`Custom API Response Status: ${error.response.status}`);
        console.error(`Custom API Response Data:`, error.response.data);
      }
    }
    
    // Try the get_associated_leads endpoint
    console.log('\nTrying the get_associated_leads endpoint...');
    
    try {
      const associatedLeadsResponse = await axios.get(`${CUSTOM_API_URL}/get_associated_leads`, {
        params: {
          session: sessionId,
          broker_id: '' // Try without specifying a broker_id first
        }
      });
      
      console.log('\nAssociated Leads Response:');
      console.log(JSON.stringify(associatedLeadsResponse.data, null, 2));
    } catch (error) {
      console.error(`Error getting associated leads: ${error.message}`);
      if (error.response) {
        console.error(`Response Status: ${error.response.status}`);
        console.error(`Response Data:`, error.response.data);
      }
      
      // Try with the admin user ID
      console.log('\nTrying get_associated_leads with admin user ID...');
      
      try {
        const adminId = '1'; // From our previous search, we know admin has ID 1
        const associatedLeadsWithAdminResponse = await axios.get(`${CUSTOM_API_URL}/get_associated_leads`, {
          params: {
            session: sessionId,
            broker_id: adminId
          }
        });
        
        console.log('\nAssociated Leads with Admin Response:');
        console.log(JSON.stringify(associatedLeadsWithAdminResponse.data, null, 2));
      } catch (error) {
        console.error(`Error getting associated leads with admin: ${error.message}`);
        if (error.response) {
          console.error(`Response Status: ${error.response.status}`);
          console.error(`Response Data:`, error.response.data);
        }
      }
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 