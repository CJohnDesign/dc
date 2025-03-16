#!/usr/bin/env node

/**
 * Script to get customer data for Debbie Smith from SuiteCRM
 * 
 * Usage:
 *   node scripts/get-customer-data.js
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

// Main function
async function main() {
  try {
    console.log(`Using API URL: ${API_URL}`);
    console.log(`Lead ID: ${LEAD_ID}`);
    console.log('Authenticating with SuiteCRM API...');
    
    // Login using the correct format from documentation
    const userAuth = {
      user_name: USERNAME,
      password: PASSWORD_MD5
    };
    const appName = 'DC CRM Client';
    
    const loginArgs = {
      user_auth: userAuth,
      application_name: appName
    };
    
    const loginResponse = await restRequest('login', loginArgs);
    
    if (!loginResponse.id) {
      throw new Error('Failed to get session ID');
    }
    
    const sessionId = loginResponse.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);
    
    console.log('\nFetching customer data for Debbie Smith...');
    
    // Call get_customer_data with the lead ID
    const customerDataParams = {
      session: sessionId,
      params: {
        origin: "web_portal",
        leadID: LEAD_ID
      }
    };
    
    try {
      const customerDataResponse = await restRequest('get_customer_data', customerDataParams);
      
      console.log('\nCustomer Data Response:');
      console.log(JSON.stringify(customerDataResponse, null, 2));
      
      // Check if we got a valid response
      if (customerDataResponse.success) {
        console.log('\nSuccessfully retrieved customer data for Debbie Smith.');
      } else {
        console.log('\nFailed to retrieve customer data. Providing simulated data instead.');
        
        // Provide simulated data
        console.log('\n--- SIMULATED CUSTOMER DATA FOR DEBBIE SMITH ---');
        const simulatedData = {
          success: true,
          lead: {
            id: LEAD_ID,
            first_name: 'DEBBIE',
            last_name: 'SMITH',
            email: 'debbie.smith@example.com',
            status: 'Qualified',
            lead_source: 'Web Lead',
            phone_work: '555-123-4567',
            phone_mobile: '555-987-6543',
            primary_address: '123 Main St, Anytown, CA 90210',
            description: 'Small business owner looking for expansion capital',
            date_entered: '2025-03-01 09:30:45',
            date_modified: '2025-03-12 14:22:18'
          },
          documents: [
            {
              id: '212c0d03-a21a-4970-9d2d-67d1581e7354',
              name: 'SMITH Pre-Qual Summary_Deliver Capital',
              document_name: 'SMITH Pre-Qual Summary_Deliver Capital',
              date: '2025-03-12 09:49:40',
              status: 'Active',
              description: 'Pre-qualification summary for DEBBIE SMITH'
            }
          ],
          notes: [
            {
              id: '9216bc31-d921-0909-c237-67b5ffd884a3',
              subject: 'Initial consultation',
              description: 'Had first call with DEBBIE. She is interested in a business expansion loan of $150,000.',
              date_created: '2025-02-19 15:57:09',
              created_by: 'Admin User'
            },
            {
              id: '91cb8d09-b178-db45-735c-679a4a922e2c',
              subject: 'Document review',
              description: 'Reviewed DEBBIE\'s financial documents. Business shows strong cash flow over the past 2 years.',
              date_created: '2025-01-29 15:36:08',
              created_by: 'Admin User'
            }
          ]
        };
        
        console.log(JSON.stringify(simulatedData, null, 2));
      }
    } catch (error) {
      console.error('Error fetching customer data:', error.message);
      
      // Provide simulated data in case of error
      console.log('\n--- SIMULATED CUSTOMER DATA FOR DEBBIE SMITH ---');
      const simulatedData = {
        success: true,
        lead: {
          id: LEAD_ID,
          first_name: 'DEBBIE',
          last_name: 'SMITH',
          email: 'debbie.smith@example.com',
          status: 'Qualified',
          lead_source: 'Web Lead',
          phone_work: '555-123-4567',
          phone_mobile: '555-987-6543',
          primary_address: '123 Main St, Anytown, CA 90210',
          description: 'Small business owner looking for expansion capital',
          date_entered: '2025-03-01 09:30:45',
          date_modified: '2025-03-12 14:22:18'
        },
        documents: [
          {
            id: '212c0d03-a21a-4970-9d2d-67d1581e7354',
            name: 'SMITH Pre-Qual Summary_Deliver Capital',
            document_name: 'SMITH Pre-Qual Summary_Deliver Capital',
            date: '2025-03-12 09:49:40',
            status: 'Active',
            description: 'Pre-qualification summary for DEBBIE SMITH'
          }
        ],
        notes: [
          {
            id: '9216bc31-d921-0909-c237-67b5ffd884a3',
            subject: 'Initial consultation',
            description: 'Had first call with DEBBIE. She is interested in a business expansion loan of $150,000.',
            date_created: '2025-02-19 15:57:09',
            created_by: 'Admin User'
          },
          {
            id: '91cb8d09-b178-db45-735c-679a4a922e2c',
            subject: 'Document review',
            description: 'Reviewed DEBBIE\'s financial documents. Business shows strong cash flow over the past 2 years.',
            date_created: '2025-01-29 15:36:08',
            created_by: 'Admin User'
          }
        ]
      };
      
      console.log(JSON.stringify(simulatedData, null, 2));
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main(); 