#!/usr/bin/env node

/**
 * Script to try multiple API methods to get a lead ID
 * 
 * Usage:
 *   node scripts/try-multiple-methods.js
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
    
    // Method 1: Try get_entry_list
    console.log('\n--- Method 1: get_entry_list ---');
    try {
      const leadsArgs = {
        session: sessionId,
        module_name: 'Leads',
        query: '', // Empty query to get all leads
        order_by: '',
        offset: 0,
        select_fields: ['id', 'first_name', 'last_name', 'status'],
        link_name_to_fields_array: [],
        max_results: 10,
        deleted: 0
      };
      
      const leadsResponse = await restRequest('get_entry_list', leadsArgs);
      
      if (leadsResponse.data && leadsResponse.data.result_count > 0) {
        console.log(`Found ${leadsResponse.data.result_count} leads.`);
        
        // Display all leads
        console.log('\nAll Leads:');
        leadsResponse.data.entry_list.forEach((lead, index) => {
          if (lead.name_value_list) {
            const firstName = lead.name_value_list.first_name?.value || '';
            const lastName = lead.name_value_list.last_name?.value || '';
            console.log(`${index + 1}. ${firstName} ${lastName} (ID: ${lead.id})`);
          }
        });
      } else {
        console.log('No leads found in the system.');
      }
    } catch (error) {
      console.error('Error with get_entry_list:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 2: Try get_associated_leads
    console.log('\n--- Method 2: get_associated_leads ---');
    try {
      // We don't know what parameters this needs, so let's try with session ID
      const associatedLeadsArgs = {
        session: sessionId
      };
      
      const associatedLeadsResponse = await restRequest('get_associated_leads', associatedLeadsArgs);
      console.log('Associated Leads Response:');
      console.log(JSON.stringify(associatedLeadsResponse.data, null, 2));
    } catch (error) {
      console.error('Error with get_associated_leads:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 3: Try manual_lead_login
    console.log('\n--- Method 3: manual_lead_login ---');
    try {
      // We don't know what parameters this needs, so let's try with some common ones
      const manualLeadLoginArgs = {
        session: sessionId,
        username: 'DEBBIE',
        password: 'SMITH'
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
    
    // Method 4: Try get_entry with email
    console.log('\n--- Method 4: get_entry with email ---');
    try {
      // We'll try with a generic email format for DEBBIE SMITH
      const getEntryArgs = {
        session: sessionId,
        module_name: 'Leads',
        id: 'debbie.smith@example.com',
        select_fields: ['id', 'first_name', 'last_name', 'status'],
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
    
    // Method 5: Try check_email_exist
    console.log('\n--- Method 5: check_email_exist ---');
    try {
      // We'll try with a generic email format for DEBBIE SMITH
      const checkEmailArgs = {
        session: sessionId,
        email: 'debbie.smith@example.com'
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
    
    // Method 6: Try get_customer_data with example lead ID
    console.log('\n--- Method 6: get_customer_data with example ID ---');
    try {
      // Use the example lead ID from the screenshot
      const exampleLeadId = "4c35978a-0aec-7b36-1747-5e540def5546";
      
      const customerDataArgs = {
        session: sessionId,
        params: {
          origin: "web_portal",
          leadID: exampleLeadId
        }
      };
      
      const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
      console.log('Customer Data Response:');
      console.log(JSON.stringify(customerDataResponse.data, null, 2));
    } catch (error) {
      console.error('Error with get_customer_data:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
    }
    
    // Method 7: Try get_broker_details
    console.log('\n--- Method 7: get_broker_details ---');
    try {
      const brokerDetailsArgs = {
        session: sessionId
      };
      
      const brokerDetailsResponse = await restRequest('get_broker_details', brokerDetailsArgs);
      console.log('Broker Details Response:');
      console.log(JSON.stringify(brokerDetailsResponse.data, null, 2));
    } catch (error) {
      console.error('Error with get_broker_details:', error.message);
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