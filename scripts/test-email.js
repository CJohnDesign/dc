#!/usr/bin/env node

/**
 * Script to test the email debbiesmith@mailiantor.com with various API methods
 * 
 * Usage:
 *   node scripts/test-email.js
 */

// Import axios for making direct API calls
const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
const PASSWORD = 'QA6N6uBUyTHGg8g';
// MD5 hash the password as required by SuiteCRM API v4.1
const PASSWORD_MD5 = crypto.createHash('md5').update(PASSWORD).digest('hex');

// The email to test
const TEST_EMAIL = 'debbiesmith@mailiantor.com';

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
    console.log(`Testing email: ${TEST_EMAIL}`);
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
    
    // Method 1: Try check_email_exist
    console.log('\n--- Method 1: check_email_exist ---');
    try {
      const checkEmailArgs = {
        session: sessionId,
        email: TEST_EMAIL
      };
      
      const checkEmailResponse = await restRequest('check_email_exist', checkEmailArgs);
      console.log('Check Email Exist Response:');
      console.log(JSON.stringify(checkEmailResponse.data, null, 2));
    } catch (error) {
      console.error('Error with check_email_exist:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 2: Try get_entry with email as ID
    console.log('\n--- Method 2: get_entry with email as ID ---');
    try {
      const getEntryArgs = {
        session: sessionId,
        module_name: 'Leads',
        id: TEST_EMAIL,
        select_fields: ['id', 'first_name', 'last_name', 'status', 'email1'],
        link_name_to_fields_array: []
      };
      
      const getEntryResponse = await restRequest('get_entry', getEntryArgs);
      console.log('Get Entry Response:');
      console.log(JSON.stringify(getEntryResponse.data, null, 2));
    } catch (error) {
      console.error('Error with get_entry:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 3: Try get_entry_list with email filter
    console.log('\n--- Method 3: get_entry_list with email filter ---');
    try {
      const leadsArgs = {
        session: sessionId,
        module_name: 'Leads',
        query: `leads.email1 = '${TEST_EMAIL}'`,
        order_by: '',
        offset: 0,
        select_fields: ['id', 'first_name', 'last_name', 'status', 'email1'],
        link_name_to_fields_array: [],
        max_results: 10,
        deleted: 0
      };
      
      const leadsResponse = await restRequest('get_entry_list', leadsArgs);
      
      if (leadsResponse.data && leadsResponse.data.result_count > 0) {
        console.log(`Found ${leadsResponse.data.result_count} leads with email ${TEST_EMAIL}.`);
        
        // Display all leads
        console.log('\nMatching Leads:');
        leadsResponse.data.entry_list.forEach((lead, index) => {
          if (lead.name_value_list) {
            const firstName = lead.name_value_list.first_name?.value || '';
            const lastName = lead.name_value_list.last_name?.value || '';
            const email = lead.name_value_list.email1?.value || '';
            console.log(`${index + 1}. ${firstName} ${lastName} (Email: ${email}, ID: ${lead.id})`);
            
            // If we found a lead, try get_customer_data with the lead ID
            console.log(`\nTrying get_customer_data with lead ID: ${lead.id}`);
            
            // Format according to the screenshot
            const params = {
              origin: "web_portal",
              leadID: lead.id
            };
            
            const customerDataArgs = {
              session: sessionId,
              params: params
            };
            
            restRequest('get_customer_data', customerDataArgs)
              .then(response => {
                console.log('Customer Data Response:');
                console.log(JSON.stringify(response.data, null, 2));
              })
              .catch(error => {
                console.error('Error calling get_customer_data:', error.message);
                if (error.response) {
                  console.error('API Response Status:', error.response.status);
                  console.error('API Response Data:', error.response.data);
                }
              });
          }
        });
      } else {
        console.log(`No leads found with email ${TEST_EMAIL}.`);
      }
    } catch (error) {
      console.error('Error with get_entry_list:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 4: Try manual_lead_login with email
    console.log('\n--- Method 4: manual_lead_login with email ---');
    try {
      const manualLeadLoginArgs = {
        session: sessionId,
        username: TEST_EMAIL,
        password: 'password' // We don't know the password, just trying a common one
      };
      
      const manualLeadLoginResponse = await restRequest('manual_lead_login', manualLeadLoginArgs);
      console.log('Manual Lead Login Response:');
      console.log(JSON.stringify(manualLeadLoginResponse.data, null, 2));
    } catch (error) {
      console.error('Error with manual_lead_login:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 5: Try customer_portal_login with email
    console.log('\n--- Method 5: customer_portal_login with email ---');
    try {
      const customerPortalLoginArgs = {
        session: sessionId,
        username: TEST_EMAIL,
        password: 'password' // We don't know the password, just trying a common one
      };
      
      const customerPortalLoginResponse = await restRequest('customer_portal_login', customerPortalLoginArgs);
      console.log('Customer Portal Login Response:');
      console.log(JSON.stringify(customerPortalLoginResponse.data, null, 2));
    } catch (error) {
      console.error('Error with customer_portal_login:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 6: Try direct get_customer_data with email
    console.log('\n--- Method 6: direct get_customer_data with email ---');
    try {
      const customerDataArgs = {
        session: sessionId,
        params: {
          origin: "web_portal",
          email: TEST_EMAIL
        }
      };
      
      const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
      console.log('Customer Data Response:');
      console.log(JSON.stringify(customerDataResponse.data, null, 2));
    } catch (error) {
      console.error('Error with direct get_customer_data:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
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