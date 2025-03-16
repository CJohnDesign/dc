#!/usr/bin/env node

/**
 * SuiteCRM Document Fetcher for DEBBIE SMITH
 * 
 * This script fetches detailed information about documents related to DEBBIE SMITH.
 * Usage: node get-smith-documents.js
 */

const axios = require('axios');
const querystring = require('querystring');
const crypto = require('crypto');

// API Configuration
const API_URL = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php';
const USERNAME = 'admin';
const PASSWORD = crypto.createHash('md5').update('QA6N6uBUyTHGg8g').digest('hex');

console.log(`Using API URL: ${API_URL}`);

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
 * Fetch document details
 */
async function fetchDocumentDetails(sessionId, documentId) {
  console.log(`\nFetching details for document ID: ${documentId}`);
  
  try {
    const result = await restRequest('get_entry', {
      module_name: 'Documents',
      id: documentId,
      select_fields: [
        'id', 
        'name', 
        'date_entered', 
        'document_name', 
        'filename', 
        'active_date', 
        'exp_date', 
        'category_id', 
        'subcategory_id', 
        'status_id', 
        'document_revision_id', 
        'description', 
        'related_doc_id', 
        'related_doc_name', 
        'related_doc_rev_id', 
        'is_template', 
        'template_type'
      ],
      link_name_to_fields_array: []
    }, sessionId);

    if (result && result.entry_list && result.entry_list.length > 0) {
      const document = result.entry_list[0];
      console.log('Document Details:');
      for (const [key, value] of Object.entries(document.name_value_list)) {
        console.log(`  ${key}: ${value.value || 'N/A'}`);
      }
      return document;
    } else {
      console.log('No document details found.');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching document details: ${error.message}`);
    return null;
  }
}

/**
 * Fetch document revisions
 */
async function fetchDocumentRevisions(sessionId, documentId) {
  console.log(`\nFetching revisions for document ID: ${documentId}`);
  
  try {
    const result = await restRequest('get_relationships', {
      module_name: 'Documents',
      module_id: documentId,
      link_field_name: 'revisions',
      related_module_query: '',
      related_fields: ['id', 'document_name', 'filename', 'revision', 'date_entered', 'created_by_name', 'change_log', 'file_mime_type', 'file_ext', 'file_size'],
      related_module_link_name_to_fields_array: [],
      deleted: 0
    }, sessionId);

    if (result && result.entry_list && result.entry_list.length > 0) {
      console.log(`Found ${result.entry_list.length} revision(s):`);
      result.entry_list.forEach((revision, index) => {
        console.log(`\nRevision #${index + 1}:`);
        for (const [key, value] of Object.entries(revision.name_value_list)) {
          console.log(`  ${key}: ${value.value || 'N/A'}`);
        }
      });
      return result.entry_list;
    } else {
      console.log('No revisions found.');
      return [];
    }
  } catch (error) {
    console.error(`Error fetching document revisions: ${error.message}`);
    return [];
  }
}

/**
 * Search for SMITH documents
 */
async function searchSmithDocuments(sessionId) {
  console.log('\nSearching for SMITH documents...');
  
  try {
    const result = await restRequest('get_entry_list', {
      module_name: 'Documents',
      query: "documents.name LIKE '%SMITH%'",
      order_by: 'date_entered DESC',
      offset: 0,
      select_fields: ['id', 'name', 'date_entered', 'document_name', 'status_id'],
      link_name_to_fields_array: [],
      max_results: 20,
      deleted: 0
    }, sessionId);

    if (result.entry_list && result.entry_list.length > 0) {
      console.log(`Found ${result.entry_list.length} SMITH documents:`);
      result.entry_list.forEach((doc, index) => {
        console.log(`${index + 1}. ID: ${doc.id}, Name: ${doc.name_value_list.name?.value || 'N/A'}, Date: ${doc.name_value_list.date_entered?.value || 'N/A'}`);
      });
      return result.entry_list;
    } else {
      console.log('No SMITH documents found.');
      return [];
    }
  } catch (error) {
    console.error(`Error searching for SMITH documents: ${error.message}`);
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
      application_name: 'SuiteCRM Document Fetcher'
    });

    if (!authResult.id) {
      throw new Error('Authentication failed');
    }

    const sessionId = authResult.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);

    // Search for SMITH documents
    const smithDocuments = await searchSmithDocuments(sessionId);
    
    if (smithDocuments.length > 0) {
      // Get details for the first document
      const firstDocId = smithDocuments[0].id;
      await fetchDocumentDetails(sessionId, firstDocId);
      
      // Get revisions for the first document
      await fetchDocumentRevisions(sessionId, firstDocId);
      
      // Simulate customer data for DEBBIE SMITH
      console.log('\n--- SIMULATED CUSTOMER DATA FOR DEBBIE SMITH ---');
      console.log({
        success: true,
        lead: {
          id: '4c35978a-0aec-7b36-1747-5e540def5546',
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
        documents: smithDocuments.map(doc => ({
          id: doc.id,
          name: doc.name_value_list.name?.value || 'N/A',
          date: doc.name_value_list.date_entered?.value || 'N/A',
          status: doc.name_value_list.status_id?.value || 'N/A'
        })),
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
      });
    }

    console.log('\nDone!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main(); 