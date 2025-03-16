#!/usr/bin/env node

/**
 * Script to find a lead ID and then use it with get_customer_data endpoint
 * 
 * Usage:
 *   node scripts/find-lead-id.js [lead_name]
 * 
 * If lead_name is not provided, it will search for "DEBBIE SMITH"
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

// Get lead name from command line arguments or use default
const leadName = process.argv[2] || "DEBBIE SMITH";
const [firstName, lastName] = leadName.split(' ');

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
    
    // First, let's try to get all available modules
    console.log('\nFetching available modules...');
    try {
      const modulesResponse = await restRequest('get_available_modules', { 
        session: sessionId 
      });
      
      console.log(`Available modules: ${modulesResponse.data.modules.map(m => m.module_key).join(', ')}`);
    } catch (error) {
      console.error('Error fetching modules:', error.message);
    }
    
    // Try to get all leads first to see what's available
    console.log(`\nFetching all leads...`);
    
    try {
      const leadsArgs = {
        session: sessionId,
        module_name: 'Leads',
        query: '', // Empty query to get all leads
        order_by: '',
        offset: 0,
        select_fields: ['id', 'first_name', 'last_name', 'status'],
        link_name_to_fields_array: [],
        max_results: 100,
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
        
        // Look for our target lead
        const targetLead = leadsResponse.data.entry_list.find(lead => {
          if (!lead.name_value_list) return false;
          
          const leadFirstName = (lead.name_value_list.first_name?.value || '').toUpperCase();
          const leadLastName = (lead.name_value_list.last_name?.value || '').toUpperCase();
          
          return leadFirstName.includes(firstName.toUpperCase()) && 
                 leadLastName.includes(lastName.toUpperCase());
        });
        
        if (targetLead) {
          console.log(`\nFound ${leadName}!`);
          console.log(`Lead ID: ${targetLead.id}`);
          
          // Display lead details
          console.log('\nLead Details:');
          Object.keys(targetLead.name_value_list).forEach(key => {
            const value = targetLead.name_value_list[key].value;
            if (value) {
              console.log(`${key}: ${value}`);
            }
          });
          
          // Now use get_customer_data with the lead ID
          console.log('\nCalling get_customer_data with the lead ID...');
          
          // Format according to the screenshot
          const params = {
            origin: "web_portal",
            leadID: targetLead.id
          };
          
          const customerDataArgs = {
            session: sessionId,
            params: params
          };
          
          try {
            const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
            console.log('\nCustomer Data Response:');
            console.log(JSON.stringify(customerDataResponse.data, null, 2));
          } catch (error) {
            console.error('Error calling get_customer_data:', error.message);
            if (error.response) {
              console.error('API Response Status:', error.response.status);
              console.error('API Response Data:', error.response.data);
            }
            
            // Try alternative format based on the screenshot
            console.log('\nTrying alternative format for get_customer_data...');
            
            // Direct format from the screenshot example
            const post = {
              method: 'get_customer_data',
              input_type: "JSON",
              response_type: "JSON",
              rest_data: JSON.stringify({
                session: sessionId,
                params: {
                  origin: "web_portal",
                  leadID: targetLead.id
                }
              })
            };
            
            try {
              const directResponse = await axios.post(API_URL, querystring.stringify(post), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              });
              
              console.log('\nDirect API Response:');
              console.log(JSON.stringify(directResponse.data, null, 2));
            } catch (directError) {
              console.error('Error with direct API call:', directError.message);
              if (directError.response) {
                console.error('API Response Status:', directError.response.status);
                console.error('API Response Data:', directError.response.data);
              }
            }
          }
        } else {
          console.log(`\nCould not find ${leadName} in the leads list.`);
          
          // Try a hardcoded lead ID from the screenshot example
          console.log('\nTrying with example lead ID from documentation...');
          const exampleLeadId = "4c35978a-0aec-7b36-1747-5e540def5546";
          
          const params = {
            origin: "web_portal",
            leadID: exampleLeadId
          };
          
          const customerDataArgs = {
            session: sessionId,
            params: params
          };
          
          try {
            const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
            console.log('\nCustomer Data Response with example lead ID:');
            console.log(JSON.stringify(customerDataResponse.data, null, 2));
          } catch (error) {
            console.error('Error calling get_customer_data with example ID:', error.message);
            if (error.response) {
              console.error('API Response Status:', error.response.status);
              console.error('API Response Data:', error.response.data);
            }
          }
        }
      } else {
        console.log('No leads found in the system.');
        
        // Try a hardcoded lead ID from the screenshot example
        console.log('\nTrying with example lead ID from documentation...');
        const exampleLeadId = "4c35978a-0aec-7b36-1747-5e540def5546";
        
        const params = {
          origin: "web_portal",
          leadID: exampleLeadId
        };
        
        const customerDataArgs = {
          session: sessionId,
          params: params
        };
        
        try {
          const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
          console.log('\nCustomer Data Response with example lead ID:');
          console.log(JSON.stringify(customerDataResponse.data, null, 2));
        } catch (error) {
          console.error('Error calling get_customer_data with example ID:', error.message);
          if (error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', error.response.data);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching leads:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
      
      // If we can't get leads, try with the example lead ID from the screenshot
      console.log('\nTrying with example lead ID from documentation...');
      const exampleLeadId = "4c35978a-0aec-7b36-1747-5e540def5546";
      
      const params = {
        origin: "web_portal",
        leadID: exampleLeadId
      };
      
      const customerDataArgs = {
        session: sessionId,
        params: params
      };
      
      try {
        const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
        console.log('\nCustomer Data Response with example lead ID:');
        console.log(JSON.stringify(customerDataResponse.data, null, 2));
      } catch (error) {
        console.error('Error calling get_customer_data with example ID:', error.message);
        if (error.response) {
          console.error('API Response Status:', error.response.status);
          console.error('API Response Data:', error.response.data);
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