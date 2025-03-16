#!/usr/bin/env node

/**
 * Example script to fetch customer data from SuiteCRM API
 * 
 * Usage:
 *   node scripts/fetch-customer-data.js CUSTOMER_ID
 * 
 * This script demonstrates how to use the SuiteCRM API client
 * to authenticate and fetch customer data.
 */

// Import the API client
// Note: In a real script, you would use the correct relative path
const suitecrmApi = require('../src/utils/suitecrm-api');

// Get customer ID from command line arguments
const customerId = process.argv[2];

// Validate input
if (!customerId) {
  console.error('Error: Please provide a customer ID as an argument');
  console.error('Usage: node scripts/fetch-customer-data.js CUSTOMER_ID');
  process.exit(1);
}

// Main function
async function main() {
  try {
    console.log('Authenticating with SuiteCRM API...');
    
    // Login to get session ID
    const sessionId = await suitecrmApi.login();
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);
    
    console.log(`\nFetching data for customer ID: ${customerId}`);
    
    // Fetch customer data
    const customerData = await suitecrmApi.getCustomerData(customerId);
    
    // Display the data
    console.log('\nCustomer Data:');
    console.log(JSON.stringify(customerData, null, 2));
    
    // Example of fetching additional data
    if (customerData.documents && customerData.documents.length > 0) {
      const documentId = customerData.documents[0].id;
      console.log(`\nFetching document with ID: ${documentId}`);
      
      const documentData = await suitecrmApi.getPQDocument(documentId);
      console.log('\nDocument Data:');
      console.log(JSON.stringify(documentData, null, 2));
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the main function
main(); 