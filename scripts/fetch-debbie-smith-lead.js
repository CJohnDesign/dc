#!/usr/bin/env node

/**
 * Script to fetch DEBBIE SMITH's information from the Leads module
 * 
 * Usage:
 *   node scripts/fetch-debbie-smith-lead.js
 * 
 * This script demonstrates how to use the SuiteCRM API client
 * to authenticate and fetch lead data for DEBBIE SMITH.
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
    
    console.log('\nFetching data for lead: DEBBIE SMITH');
    
    // Prepare the search parameters to find DEBBIE SMITH in the Leads module
    let searchArgs = {
      session: sessionId,
      module_name: 'Leads',
      query: "leads.first_name = 'DEBBIE' AND leads.last_name = 'SMITH'",
      order_by: '',
      offset: 0,
      select_fields: ['id', 'first_name', 'last_name', 'status', 'email', 'phone_work', 'phone_mobile', 'lead_source'],
      link_name_to_fields_array: [],
      max_results: 10,
      deleted: 0
    };
    
    // Call the API to get lead data
    const entryListResponse = await restRequest('get_entry_list', searchArgs);
    
    console.log('\nSearch Response:');
    console.log(`Total leads found: ${entryListResponse.data.result_count}`);
    
    // Display lead information
    if (entryListResponse.data && 
        entryListResponse.data.entry_list && 
        entryListResponse.data.entry_list.length > 0) {
      
      const lead = entryListResponse.data.entry_list[0];
      const leadId = lead.id;
      
      console.log(`\nFound lead with ID: ${leadId}`);
      
      // Display basic lead information
      if (lead.name_value_list) {
        console.log('\nLead Information:');
        Object.keys(lead.name_value_list).forEach(key => {
          const value = lead.name_value_list[key].value;
          if (value) {
            console.log(`${key}: ${value}`);
          }
        });
      }
      
      // Get full details using get_entry
      const entryArgs = {
        session: sessionId,
        module_name: 'Leads',
        id: leadId,
        select_fields: [],
        link_name_to_fields_array: []
      };
      
      const entryResponse = await restRequest('get_entry', entryArgs);
      
      console.log('\nFull Lead Details:');
      console.log(JSON.stringify(entryResponse.data, null, 2));
      
    } else {
      console.log('\nNo leads found matching DEBBIE SMITH.');
      
      // Try a broader search in case the capitalization is different
      console.log('\nTrying a broader search...');
      
      const broadSearchArgs = {
        session: sessionId,
        module_name: 'Leads',
        query: '', // Empty query to get all leads
        order_by: '',
        offset: 0,
        select_fields: ['id', 'first_name', 'last_name', 'status', 'email', 'phone_work', 'phone_mobile', 'lead_source'],
        link_name_to_fields_array: [],
        max_results: 100,
        deleted: 0
      };
      
      const broadResponse = await restRequest('get_entry_list', broadSearchArgs);
      
      console.log(`Total leads found: ${broadResponse.data.result_count}`);
      
      if (broadResponse.data && 
          broadResponse.data.entry_list && 
          broadResponse.data.entry_list.length > 0) {
        
        // Look for any lead that might be DEBBIE SMITH (case insensitive)
        const debbieSmith = broadResponse.data.entry_list.find(lead => {
          if (!lead.name_value_list) return false;
          
          const firstName = (lead.name_value_list.first_name?.value || '').toUpperCase();
          const lastName = (lead.name_value_list.last_name?.value || '').toUpperCase();
          
          return firstName.includes('DEBBIE') && lastName.includes('SMITH');
        });
        
        if (debbieSmith) {
          console.log('\nFound DEBBIE SMITH with different capitalization:');
          console.log(`ID: ${debbieSmith.id}`);
          
          // Display lead information
          if (debbieSmith.name_value_list) {
            Object.keys(debbieSmith.name_value_list).forEach(key => {
              const value = debbieSmith.name_value_list[key].value;
              if (value) {
                console.log(`${key}: ${value}`);
              }
            });
          }
          
          // Get full details
          const entryArgs = {
            session: sessionId,
            module_name: 'Leads',
            id: debbieSmith.id,
            select_fields: [],
            link_name_to_fields_array: []
          };
          
          const entryResponse = await restRequest('get_entry', entryArgs);
          
          console.log('\nFull Lead Details:');
          console.log(JSON.stringify(entryResponse.data, null, 2));
        } else {
          console.log('\nDEBBIE SMITH not found in any leads.');
          
          // List all leads for reference
          console.log('\nAll Leads:');
          broadResponse.data.entry_list.forEach((lead, index) => {
            if (lead.name_value_list) {
              const firstName = lead.name_value_list.first_name?.value || '';
              const lastName = lead.name_value_list.last_name?.value || '';
              console.log(`${index + 1}. ${firstName} ${lastName}`);
            }
          });
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