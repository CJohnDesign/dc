#!/usr/bin/env node

/**
 * Script to search for a lead by email in SuiteCRM
 * 
 * Usage:
 *   node scripts/check-lead-email.js
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

// Email to search for
const EMAIL_TO_SEARCH = 'debbiesmith@mailiantor.com';

// Helper function for REST API requests
async function restRequest(method, parameters = {}, sessionId = null) {
  const data = {
    method,
    input_type: 'JSON',
    response_type: 'JSON',
    rest_data: JSON.stringify(sessionId ? { session: sessionId, ...parameters } : parameters)
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
    console.log(`Checking for lead with email: ${EMAIL_TO_SEARCH}`);
    console.log('Authenticating with SuiteCRM API...');
    
    // Login using the correct format from documentation
    const loginResponse = await restRequest('login', {
      user_auth: {
        user_name: USERNAME,
        password: PASSWORD_MD5
      },
      application_name: 'DC CRM Client'
    });
    
    if (!loginResponse.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId}`);
    
    // Search for lead by email
    console.log(`\nSearching for lead with email "${EMAIL_TO_SEARCH}"...`);
    
    try {
      const searchLeadByEmailResponse = await restRequest('get_entry_list', {
        module_name: 'Leads',
        query: `leads.email1 = '${EMAIL_TO_SEARCH}'`,
        order_by: '',
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
        max_results: 1,
        deleted: 0
      }, sessionId);
      
      console.log('\nLead Search by Email Response:');
      console.log(JSON.stringify(searchLeadByEmailResponse, null, 2));
      
      if (searchLeadByEmailResponse.result_count > 0) {
        console.log('\nLead found!');
        
        // Get more details about the lead
        const leadId = searchLeadByEmailResponse.entry_list[0].id;
        console.log(`\nGetting more details for lead ID: ${leadId}`);
        
        try {
          const leadDetailsResponse = await restRequest('get_entry', {
            module_name: 'Leads',
            id: leadId,
            select_fields: [
              'id', 
              'first_name', 
              'last_name', 
              'email1', 
              'status', 
              'lead_source',
              'phone_work',
              'phone_mobile',
              'primary_address_street',
              'primary_address_city',
              'primary_address_state',
              'primary_address_postalcode',
              'primary_address_country',
              'description',
              'date_entered',
              'date_modified'
            ]
          }, sessionId);
          
          console.log('\nLead Details Response:');
          console.log(JSON.stringify(leadDetailsResponse, null, 2));
        } catch (error) {
          console.error(`Error getting lead details: ${error.message}`);
        }
      } else {
        console.log('\nNo lead found with that email.');
        
        // Try a broader search with LIKE operator
        console.log('\nTrying a broader search...');
        
        const broadSearchResponse = await restRequest('get_entry_list', {
          module_name: 'Leads',
          query: `leads.email1 LIKE '%${EMAIL_TO_SEARCH.split('@')[0]}%'`,
          order_by: '',
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
          max_results: 5,
          deleted: 0
        }, sessionId);
        
        console.log('\nBroader Search Response:');
        console.log(JSON.stringify(broadSearchResponse, null, 2));
        
        // Try searching for DEBBIE SMITH by name
        console.log('\nSearching for leads with name "DEBBIE SMITH"...');
        
        const nameSearchResponse = await restRequest('get_entry_list', {
          module_name: 'Leads',
          query: `leads.first_name LIKE '%DEBBIE%' AND leads.last_name LIKE '%SMITH%'`,
          order_by: '',
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
          max_results: 5,
          deleted: 0
        }, sessionId);
        
        console.log('\nName Search Response:');
        console.log(JSON.stringify(nameSearchResponse, null, 2));
      }
    } catch (error) {
      console.error(`Error searching for lead by email: ${error.message}`);
      
      // If we get a database error, try searching for DEBBIE SMITH by name
      console.log('\nTrying to search for leads with name "DEBBIE SMITH" instead...');
      
      try {
        const nameSearchResponse = await restRequest('get_entry_list', {
          module_name: 'Leads',
          query: `leads.first_name LIKE '%DEBBIE%' AND leads.last_name LIKE '%SMITH%'`,
          order_by: '',
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
          max_results: 5,
          deleted: 0
        }, sessionId);
        
        console.log('\nName Search Response:');
        console.log(JSON.stringify(nameSearchResponse, null, 2));
      } catch (error) {
        console.error(`Error searching for lead by name: ${error.message}`);
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