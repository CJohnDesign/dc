#!/usr/bin/env node

/**
 * Script to get all contacts (customers) from SuiteCRM
 * 
 * Usage:
 *   node scripts/get-all-contacts.js [max_results]
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
    
    console.log('\nFetching all contacts...');
    
    // Prepare the search parameters to get all contacts
    // Using an empty query string to get all contacts
    const contactsArgs = {
      session: sessionId,
      module_name: 'Contacts',
      query: '', // Empty query to get all contacts
      order_by: 'date_entered DESC', // Sort by most recent first
      offset: 0,
      select_fields: [
        'id', 
        'first_name', 
        'last_name', 
        'title',
        'account_name',
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
      const contactsResponse = await restRequest('get_entry_list', contactsArgs);
      
      if (contactsResponse.data && contactsResponse.data.result_count > 0) {
        console.log(`\nFound ${contactsResponse.data.result_count} contacts.`);
        
        // Display all contacts
        console.log('\nAll Contacts:');
        contactsResponse.data.entry_list.forEach((contact, index) => {
          if (contact.name_value_list) {
            const firstName = contact.name_value_list.first_name?.value || '';
            const lastName = contact.name_value_list.last_name?.value || '';
            const email = contact.name_value_list.email1?.value || '';
            const title = contact.name_value_list.title?.value || '';
            const accountName = contact.name_value_list.account_name?.value || '';
            const dateEntered = contact.name_value_list.date_entered?.value || '';
            
            console.log(`\nContact #${index + 1}:`);
            console.log(`ID: ${contact.id}`);
            console.log(`Name: ${firstName} ${lastName}`);
            if (title) console.log(`Title: ${title}`);
            if (accountName) console.log(`Company: ${accountName}`);
            if (email) console.log(`Email: ${email}`);
            if (dateEntered) console.log(`Created: ${dateEntered}`);
            
            // Display all available fields
            console.log('All Fields:');
            Object.keys(contact.name_value_list).forEach(key => {
              const value = contact.name_value_list[key].value;
              if (value && !['first_name', 'last_name', 'email1', 'title', 'account_name', 'date_entered'].includes(key)) {
                console.log(`  ${key}: ${value}`);
              }
            });
          }
        });
        
        // Check if there are more contacts
        if (contactsResponse.data.result_count === MAX_RESULTS) {
          console.log(`\nNote: Only showing the first ${MAX_RESULTS} contacts. There may be more contacts available.`);
          console.log('To see more contacts, run the script with a higher max_results parameter:');
          console.log(`  node scripts/get-all-contacts.js ${MAX_RESULTS * 2}`);
        }
      } else {
        console.log('\nNo contacts found in the system.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
      
      // If we get a database error, try with a smaller batch size
      if (error.response && error.response.data && error.response.data.includes('Database failure')) {
        console.log('\nTrying with a smaller batch size...');
        
        // Reduce the batch size
        contactsArgs.max_results = Math.min(10, MAX_RESULTS);
        
        try {
          const smallBatchResponse = await restRequest('get_entry_list', contactsArgs);
          
          if (smallBatchResponse.data && smallBatchResponse.data.result_count > 0) {
            console.log(`\nFound ${smallBatchResponse.data.result_count} contacts with smaller batch size.`);
            
            // Display contacts
            console.log('\nContacts:');
            smallBatchResponse.data.entry_list.forEach((contact, index) => {
              if (contact.name_value_list) {
                const firstName = contact.name_value_list.first_name?.value || '';
                const lastName = contact.name_value_list.last_name?.value || '';
                console.log(`${index + 1}. ${firstName} ${lastName} (ID: ${contact.id})`);
              }
            });
          } else {
            console.log('\nNo contacts found with smaller batch size.');
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
        
        // Try to get module fields for Contacts
        console.log('\nFetching fields for Contacts module...');
        const fieldsArgs = {
          session: sessionId,
          module_name: 'Contacts'
        };
        
        try {
          const fieldsResponse = await restRequest('get_module_fields', fieldsArgs);
          console.log('Fields for Contacts module:');
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
    
    // Also try to get accounts (companies/organizations)
    console.log('\nFetching all accounts (companies)...');
    
    const accountsArgs = {
      session: sessionId,
      module_name: 'Accounts',
      query: '', // Empty query to get all accounts
      order_by: 'date_entered DESC', // Sort by most recent first
      offset: 0,
      select_fields: [
        'id', 
        'name', 
        'industry',
        'billing_address_city',
        'billing_address_state',
        'phone_office',
        'website',
        'date_entered'
      ],
      link_name_to_fields_array: [],
      max_results: MAX_RESULTS,
      deleted: 0
    };
    
    try {
      const accountsResponse = await restRequest('get_entry_list', accountsArgs);
      
      if (accountsResponse.data && accountsResponse.data.result_count > 0) {
        console.log(`\nFound ${accountsResponse.data.result_count} accounts (companies).`);
        
        // Display all accounts
        console.log('\nAll Accounts:');
        accountsResponse.data.entry_list.forEach((account, index) => {
          if (account.name_value_list) {
            const name = account.name_value_list.name?.value || '';
            const industry = account.name_value_list.industry?.value || '';
            const city = account.name_value_list.billing_address_city?.value || '';
            const state = account.name_value_list.billing_address_state?.value || '';
            
            console.log(`\nAccount #${index + 1}:`);
            console.log(`ID: ${account.id}`);
            console.log(`Name: ${name}`);
            if (industry) console.log(`Industry: ${industry}`);
            if (city || state) console.log(`Location: ${city}${city && state ? ', ' : ''}${state}`);
            
            // Display all available fields
            console.log('All Fields:');
            Object.keys(account.name_value_list).forEach(key => {
              const value = account.name_value_list[key].value;
              if (value && !['name', 'industry', 'billing_address_city', 'billing_address_state'].includes(key)) {
                console.log(`  ${key}: ${value}`);
              }
            });
          }
        });
      } else {
        console.log('\nNo accounts found in the system.');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error.message);
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