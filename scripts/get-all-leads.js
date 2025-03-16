#!/usr/bin/env node

/**
 * Script to get all leads from SuiteCRM
 * 
 * Usage:
 *   node scripts/get-all-leads.js [max_results]
 * 
 * If max_results is not provided, it will default to 100
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

// Get max results from command line arguments or use default
const MAX_RESULTS = process.argv[2] ? parseInt(process.argv[2]) : 100;

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
    console.log(`Max results: ${MAX_RESULTS}`);
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
    
    console.log('\nFetching all leads...');
    
    // Prepare the search parameters to get all leads
    // Using an empty query string to get all leads
    const leadsArgs = {
      session: sessionId,
      module_name: 'Leads',
      query: '', // Empty query to get all leads
      order_by: 'date_entered DESC', // Sort by most recent first
      offset: 0,
      select_fields: [
        'id', 
        'first_name', 
        'last_name', 
        'status', 
        'lead_source', 
        'email1', 
        'phone_work', 
        'phone_mobile',
        'date_entered'
      ],
      link_name_to_fields_array: [],
      max_results: MAX_RESULTS,
      deleted: 0
    };
    
    try {
      const leadsResponse = await restRequest('get_entry_list', leadsArgs);
      
      if (leadsResponse.data && leadsResponse.data.result_count > 0) {
        console.log(`\nFound ${leadsResponse.data.result_count} leads.`);
        
        // Display all leads
        console.log('\nAll Leads:');
        leadsResponse.data.entry_list.forEach((lead, index) => {
          if (lead.name_value_list) {
            const firstName = lead.name_value_list.first_name?.value || '';
            const lastName = lead.name_value_list.last_name?.value || '';
            const email = lead.name_value_list.email1?.value || '';
            const status = lead.name_value_list.status?.value || '';
            const leadSource = lead.name_value_list.lead_source?.value || '';
            const dateEntered = lead.name_value_list.date_entered?.value || '';
            
            console.log(`\nLead #${index + 1}:`);
            console.log(`ID: ${lead.id}`);
            console.log(`Name: ${firstName} ${lastName}`);
            if (email) console.log(`Email: ${email}`);
            if (status) console.log(`Status: ${status}`);
            if (leadSource) console.log(`Source: ${leadSource}`);
            if (dateEntered) console.log(`Created: ${dateEntered}`);
            
            // Display all available fields
            console.log('All Fields:');
            Object.keys(lead.name_value_list).forEach(key => {
              const value = lead.name_value_list[key].value;
              if (value && !['first_name', 'last_name', 'email1', 'status', 'lead_source', 'date_entered'].includes(key)) {
                console.log(`  ${key}: ${value}`);
              }
            });
          }
        });
        
        // Check if there are more leads
        if (leadsResponse.data.result_count === MAX_RESULTS) {
          console.log(`\nNote: Only showing the first ${MAX_RESULTS} leads. There may be more leads available.`);
          console.log('To see more leads, run the script with a higher max_results parameter:');
          console.log(`  node scripts/get-all-leads.js ${MAX_RESULTS * 2}`);
        }
      } else {
        console.log('\nNo leads found in the system.');
      }
    } catch (error) {
      console.error('Error fetching leads:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
      
      // If we get a database error, try with a smaller batch size
      if (error.response && error.response.data && error.response.data.includes('Database failure')) {
        console.log('\nTrying with a smaller batch size...');
        
        // Reduce the batch size
        leadsArgs.max_results = Math.min(10, MAX_RESULTS);
        
        try {
          const smallBatchResponse = await restRequest('get_entry_list', leadsArgs);
          
          if (smallBatchResponse.data && smallBatchResponse.data.result_count > 0) {
            console.log(`\nFound ${smallBatchResponse.data.result_count} leads with smaller batch size.`);
            
            // Display leads
            console.log('\nLeads:');
            smallBatchResponse.data.entry_list.forEach((lead, index) => {
              if (lead.name_value_list) {
                const firstName = lead.name_value_list.first_name?.value || '';
                const lastName = lead.name_value_list.last_name?.value || '';
                console.log(`${index + 1}. ${firstName} ${lastName} (ID: ${lead.id})`);
              }
            });
          } else {
            console.log('\nNo leads found with smaller batch size.');
          }
        } catch (smallBatchError) {
          console.error('Error with smaller batch size:', smallBatchError.message);
        }
      }
      
      // Try to get available modules as a fallback
      console.log('\nFetching available modules...');
      try {
        const modulesResponse = await restRequest('get_available_modules', { 
          session: sessionId 
        });
        
        console.log('Available modules:');
        modulesResponse.data.modules.forEach(module => {
          console.log(`- ${module.module_key}`);
        });
        
        // Try to get module fields for Leads
        console.log('\nFetching fields for Leads module...');
        const fieldsArgs = {
          session: sessionId,
          module_name: 'Leads'
        };
        
        try {
          const fieldsResponse = await restRequest('get_module_fields', fieldsArgs);
          console.log('Fields for Leads module:');
          Object.keys(fieldsResponse.data.module_fields).forEach(field => {
            console.log(`- ${field}`);
          });
        } catch (fieldsError) {
          console.error('Error fetching module fields:', fieldsError.message);
        }
      } catch (modulesError) {
        console.error('Error fetching modules:', modulesError.message);
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