#!/usr/bin/env node

/**
 * SuiteCRM Data Explorer
 * 
 * This script explores multiple modules in SuiteCRM to find available data.
 * Usage: node explore-suitecrm-data.js [max_results]
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
const PASSWORD = crypto.createHash('md5').update('QA6N6uBUyTHGg8g').digest('hex');

// Get max results from command line argument or default to 10
const MAX_RESULTS = process.argv[2] ? parseInt(process.argv[2]) : 10;

console.log(`Using API URL: ${API_URL}`);
console.log(`Max results: ${MAX_RESULTS}`);

/**
 * Make a REST API request to SuiteCRM
 */
async function restRequest(method, parameters = {}, sessionId = null) {
  const data = {
    method,
    input_type: 'JSON',
    response_type: 'JSON',
    rest_data: JSON.stringify(sessionId ? { session: sessionId, ...parameters } : parameters)
  };

  try {
    const response = await axios.post(API_URL, querystring.stringify(data));
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`API Response Status: ${error.response.status}`);
      console.error(`API Response Data: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetch entries from a specific module
 */
async function fetchEntries(sessionId, module_name, max_results) {
  console.log(`\nFetching data from ${module_name} module...`);
  
  try {
    const result = await restRequest('get_entry_list', {
      module_name,
      query: '',
      order_by: 'date_entered DESC',
      offset: 0,
      select_fields: ['id', 'name', 'date_entered'],
      link_name_to_fields_array: [],
      max_results,
      deleted: 0
    }, sessionId);

    if (result.entry_list && result.entry_list.length > 0) {
      console.log(`Found ${result.entry_list.length} entries in ${module_name}:`);
      result.entry_list.forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry.id}, Name: ${entry.name_value_list.name?.value || 'N/A'}, Date: ${entry.name_value_list.date_entered?.value || 'N/A'}`);
      });
      return result.entry_list;
    } else {
      console.log(`No entries found in ${module_name}.`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${module_name}: ${error.message}`);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Authenticate with SuiteCRM
    console.log('Authenticating with SuiteCRM API...');
    const authResult = await restRequest('login', {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD
      },
      application_name: 'SuiteCRM Explorer'
    });

    if (!authResult.id) {
      throw new Error('Authentication failed');
    }

    const sessionId = authResult.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);

    // List of modules to check
    const modulesToCheck = [
      'Leads',
      'Contacts',
      'Accounts',
      'Opportunities',
      'Notes',
      'Documents',
      'Tasks',
      'Calls',
      'Meetings',
      'Emails',
      'Campaigns',
      'Cases',
      'dc_brokers',
      'dc_submissions',
      'dc_inquiries',
      'dc_loan_program',
      'dc_marketng_activity',
      'dc_closed_accounts',
      'dc_personal_assets',
      'dc_payments',
      'dc_liabilities',
      'dc_lenders',
      'dc_derogatory',
      'dc_sms_msg',
      'dc_sms_templates'
    ];

    // Check each module for data
    const results = {};
    for (const module of modulesToCheck) {
      const entries = await fetchEntries(sessionId, module, MAX_RESULTS);
      results[module] = entries.length;
    }

    // Summary
    console.log('\n--- SUMMARY ---');
    console.log('Modules with data:');
    let foundData = false;
    
    for (const [module, count] of Object.entries(results)) {
      if (count > 0) {
        console.log(`- ${module}: ${count} entries`);
        foundData = true;
      }
    }
    
    if (!foundData) {
      console.log('No data found in any of the checked modules.');
    }

    console.log('\nDone!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main(); 