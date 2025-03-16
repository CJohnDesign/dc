#!/usr/bin/env node

/**
 * Script to simulate the expected behavior of the get_customer_data endpoint
 * 
 * Usage:
 *   node scripts/simulate-customer-data.js [lead_id]
 * 
 * If lead_id is not provided, it will use a default example ID
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

// Get lead ID from command line arguments or use default
const leadId = process.argv[2] || "4c35978a-0aec-7b36-1747-5e540def5546"; // Example ID from documentation

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

// Function to simulate customer data response
function simulateCustomerData(leadId) {
  // This is a simulated response based on what we would expect from the API
  return {
    success: true,
    lead: {
      id: leadId,
      first_name: "DEBBIE",
      last_name: "SMITH",
      email: "debbiesmith@mailiantor.com",
      status: "Warm Lead",
      lead_source: "Web",
      phone_work: "555-123-4567",
      phone_mobile: "555-987-6543",
      primary_address_street: "123 Main St",
      primary_address_city: "Anytown",
      primary_address_state: "CA",
      primary_address_postalcode: "90210",
      description: "Interested in business financing options",
      created_date: "2023-05-15",
      modified_date: "2023-06-01"
    },
    documents: [
      {
        id: "doc-001",
        name: "Business Plan.pdf",
        date_created: "2023-05-20",
        status: "Approved"
      },
      {
        id: "doc-002",
        name: "Financial Statement.pdf",
        date_created: "2023-05-22",
        status: "Under Review"
      }
    ],
    notes: [
      {
        id: "note-001",
        subject: "Initial Contact",
        description: "Spoke with DEBBIE about her business financing needs.",
        date_created: "2023-05-16",
        created_by: "John Broker"
      },
      {
        id: "note-002",
        subject: "Follow-up Call",
        description: "Discussed loan options and requested additional documentation.",
        date_created: "2023-05-25",
        created_by: "John Broker"
      }
    ]
  };
}

// Main function
async function main() {
  try {
    console.log(`Using API URL: ${API_URL}`);
    console.log(`Using lead ID: ${leadId}`);
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
    
    // First, try the actual API call
    console.log('\nAttempting to call the actual get_customer_data endpoint...');
    let apiCallSucceeded = false;
    
    try {
      const customerDataArgs = {
        session: sessionId,
        params: {
          origin: "web_portal",
          leadID: leadId
        }
      };
      
      const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
      
      // Check if the response indicates an error
      if (customerDataResponse.data && customerDataResponse.data.name && customerDataResponse.data.name.includes("Error")) {
        console.log('Actual API Response (Error):');
        console.log(JSON.stringify(customerDataResponse.data, null, 2));
        apiCallSucceeded = false;
      } else {
        console.log('Actual API Response (Success):');
        console.log(JSON.stringify(customerDataResponse.data, null, 2));
        apiCallSucceeded = true;
      }
    } catch (error) {
      console.error('Error with actual API call:', error.message);
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', error.response.data);
      }
      apiCallSucceeded = false;
    }
    
    // If the actual API call fails, show the simulated response
    if (!apiCallSucceeded) {
      console.log('\n--- SIMULATED RESPONSE ---');
      console.log('Since the actual API call failed, here is a simulated response:');
      const simulatedData = simulateCustomerData(leadId);
      console.log(JSON.stringify(simulatedData, null, 2));
      
      // Explain how to use the get_customer_data endpoint
      console.log('\n--- How to use the get_customer_data endpoint ---');
      console.log('Based on the documentation, here is how to call the get_customer_data endpoint:');
      console.log('\n1. First, authenticate to get a session ID:');
      console.log(`
const loginArgs = {
  user_auth: {
    user_name: "admin",
    password: "md5_hashed_password"
  },
  application_name: "DC CRM Client",
  name_value_list: {}
};

const loginResponse = await restRequest('login', loginArgs);
const sessionId = loginResponse.data.id;
`);
      
      console.log('\n2. Then, call the get_customer_data endpoint with the lead ID:');
      console.log(`
const customerDataArgs = {
  session: sessionId,
  params: {
    origin: "web_portal",
    leadID: "${leadId}"
  }
};

const customerDataResponse = await restRequest('get_customer_data', customerDataArgs);
console.log(JSON.stringify(customerDataResponse.data, null, 2));
`);
      
      console.log('\n3. Process the response data to get customer information:');
      console.log(`
// Example of processing the response
const customerData = customerDataResponse.data;
if (customerData.success) {
  const lead = customerData.lead;
  console.log(\`Customer: \${lead.first_name} \${lead.last_name}\`);
  console.log(\`Email: \${lead.email}\`);
  console.log(\`Status: \${lead.status}\`);
  
  // Process documents
  customerData.documents.forEach(doc => {
    console.log(\`Document: \${doc.name} (Status: \${doc.status})\`);
  });
  
  // Process notes
  customerData.notes.forEach(note => {
    console.log(\`Note: \${note.subject} - \${note.date_created}\`);
  });
}
`);

      // Example React hook for using the get_customer_data endpoint
      console.log('\n4. Example React hook for using the get_customer_data endpoint:');
      console.log(`
// useCustomerData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * React hook to fetch customer data from the SuiteCRM API
 * @param {string} leadId - The ID of the lead to fetch data for
 * @param {string} sessionId - The SuiteCRM session ID
 * @returns {object} - The customer data and loading state
 */
export function useCustomerData(leadId, sessionId) {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!leadId || !sessionId) {
      setLoading(false);
      return;
    }

    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
        
        const post = {
          method: 'get_customer_data',
          input_type: "JSON",
          response_type: "JSON",
          rest_data: JSON.stringify({
            session: sessionId,
            params: {
              origin: "web_portal",
              leadID: leadId
            }
          })
        };

        const response = await axios.post(API_URL, new URLSearchParams(post).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (response.data && response.data.success) {
          setCustomerData(response.data);
        } else {
          setError(new Error('Failed to fetch customer data'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [leadId, sessionId]);

  return { customerData, loading, error };
}
`);

      // Example usage of the React hook
      console.log('\n5. Example usage of the React hook:');
      console.log(`
// CustomerProfile.jsx
import React from 'react';
import { useCustomerData } from './hooks/useCustomerData';

function CustomerProfile({ leadId, sessionId }) {
  const { customerData, loading, error } = useCustomerData(leadId, sessionId);

  if (loading) return <div>Loading customer data...</div>;
  if (error) return <div>Error loading customer data: {error.message}</div>;
  if (!customerData) return <div>No customer data available</div>;

  const { lead, documents, notes } = customerData;

  return (
    <div className="customer-profile">
      <h1>{lead.first_name} {lead.last_name}</h1>
      <div className="customer-details">
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Phone:</strong> {lead.phone_work}</p>
        <p><strong>Mobile:</strong> {lead.phone_mobile}</p>
        <p><strong>Address:</strong> {lead.primary_address_street}, {lead.primary_address_city}, {lead.primary_address_state} {lead.primary_address_postalcode}</p>
      </div>

      <h2>Documents</h2>
      {documents.length > 0 ? (
        <ul className="documents-list">
          {documents.map(doc => (
            <li key={doc.id}>
              {doc.name} - <span className={doc.status.toLowerCase()}>{doc.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents available</p>
      )}

      <h2>Notes</h2>
      {notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map(note => (
            <li key={note.id}>
              <h3>{note.subject}</h3>
              <p>{note.description}</p>
              <small>Created on {new Date(note.date_created).toLocaleDateString()} by {note.created_by}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
}

export default CustomerProfile;
`);
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