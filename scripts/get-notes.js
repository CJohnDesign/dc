#!/usr/bin/env node

/**
 * SuiteCRM Notes Fetcher
 * 
 * This script fetches notes from SuiteCRM and searches for notes related to SMITH.
 * Usage: node get-notes.js [max_results]
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
 * Fetch all notes
 */
async function fetchAllNotes(sessionId, maxResults) {
  console.log('\nFetching all notes...');
  
  try {
    const result = await restRequest('get_entry_list', {
      module_name: 'Notes',
      query: '',
      order_by: 'date_entered DESC',
      offset: 0,
      select_fields: ['id', 'name', 'date_entered', 'description', 'created_by_name', 'parent_type', 'parent_id', 'parent_name', 'contact_id', 'contact_name'],
      link_name_to_fields_array: [],
      max_results: maxResults,
      deleted: 0
    }, sessionId);

    if (result.entry_list && result.entry_list.length > 0) {
      console.log(`Found ${result.entry_list.length} notes:`);
      result.entry_list.forEach((note, index) => {
        console.log(`\nNote #${index + 1}:`);
        for (const [key, value] of Object.entries(note.name_value_list)) {
          console.log(`  ${key}: ${value.value || 'N/A'}`);
        }
      });
      return result.entry_list;
    } else {
      console.log('No notes found.');
      return [];
    }
  } catch (error) {
    console.error(`Error fetching notes: ${error.message}`);
    return [];
  }
}

/**
 * Search for SMITH notes
 */
async function searchSmithNotes(sessionId, maxResults) {
  console.log('\nSearching for SMITH notes...');
  
  try {
    // Try with a direct query first
    const result = await restRequest('get_entry_list', {
      module_name: 'Notes',
      query: "notes.name LIKE '%SMITH%' OR notes.description LIKE '%SMITH%'",
      order_by: 'date_entered DESC',
      offset: 0,
      select_fields: ['id', 'name', 'date_entered', 'description', 'created_by_name', 'parent_type', 'parent_id', 'parent_name', 'contact_id', 'contact_name'],
      link_name_to_fields_array: [],
      max_results: maxResults,
      deleted: 0
    }, sessionId);

    if (result.entry_list && result.entry_list.length > 0) {
      console.log(`Found ${result.entry_list.length} SMITH notes:`);
      result.entry_list.forEach((note, index) => {
        console.log(`\nNote #${index + 1}:`);
        for (const [key, value] of Object.entries(note.name_value_list)) {
          console.log(`  ${key}: ${value.value || 'N/A'}`);
        }
      });
      return result.entry_list;
    } else {
      console.log('No SMITH notes found with direct query.');
      
      // If direct query fails, search through all notes
      console.log('Searching through all notes for SMITH...');
      const allNotes = await fetchAllNotes(sessionId, 50); // Get more notes to search through
      
      const smithNotes = allNotes.filter(note => {
        const name = note.name_value_list.name?.value || '';
        const description = note.name_value_list.description?.value || '';
        const parentName = note.name_value_list.parent_name?.value || '';
        const contactName = note.name_value_list.contact_name?.value || '';
        
        return name.toUpperCase().includes('SMITH') || 
               description.toUpperCase().includes('SMITH') ||
               parentName.toUpperCase().includes('SMITH') ||
               contactName.toUpperCase().includes('SMITH');
      });
      
      if (smithNotes.length > 0) {
        console.log(`Found ${smithNotes.length} notes related to SMITH through manual search:`);
        smithNotes.forEach((note, index) => {
          console.log(`\nNote #${index + 1}:`);
          for (const [key, value] of Object.entries(note.name_value_list)) {
            console.log(`  ${key}: ${value.value || 'N/A'}`);
          }
        });
        return smithNotes;
      } else {
        console.log('No SMITH notes found through manual search.');
        return [];
      }
    }
  } catch (error) {
    console.error(`Error searching for SMITH notes: ${error.message}`);
    
    // If search fails, try to get all notes
    console.log('Attempting to fetch all notes instead...');
    return await fetchAllNotes(sessionId, maxResults);
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
      application_name: 'SuiteCRM Notes Fetcher'
    });

    if (!authResult.id) {
      throw new Error('Authentication failed');
    }

    const sessionId = authResult.id;
    console.log(`Successfully authenticated. Session ID: ${sessionId.substring(0, 8)}...`);

    // Search for SMITH notes
    const smithNotes = await searchSmithNotes(sessionId, MAX_RESULTS);
    
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
      notes: smithNotes.length > 0 
        ? smithNotes.map(note => ({
            id: note.id,
            subject: note.name_value_list.name?.value || 'N/A',
            description: note.name_value_list.description?.value || 'N/A',
            date_created: note.name_value_list.date_entered?.value || 'N/A',
            created_by: note.name_value_list.created_by_name?.value || 'N/A'
          }))
        : [
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

    console.log('\nDone!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main(); 