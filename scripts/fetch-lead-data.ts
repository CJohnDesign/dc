/**
 * Fetch Lead Data Script
 * 
 * This script demonstrates how to use the lead-data utility to fetch and log lead data.
 * Run with: npx ts-node scripts/fetch-lead-data.ts
 */

import leadData from '../src/utils/lead-data';

// Example lead IDs from the documentation
const EXAMPLE_LEAD_IDS = [
  'e620e105-b444-a3b6-10f8-67d0664ee1d8', // DEBBIE SMITH
  '85ea89fe-5c55-6a8a-565e-67d625e93c94', // Chris Johnston
  '876a8e2f-2440-3110-6a7c-67d068ed5943'  // JOHN HOMEOWNER
];

/**
 * Search for leads by name
 */
async function searchLeadsByName(name: string) {
  console.log(`\n--- Searching for leads with name: ${name} ---`);
  try {
    const results = await leadData.searchLeads(name);
    console.log(`Found ${results.length} leads:`);
    
    results.forEach((lead: any, index: number) => {
      console.log(`${index + 1}. ID: ${lead.id}, Name: ${lead.name}, Module: ${lead.module_name}`);
    });
    
    return results;
  } catch (error) {
    console.error('Error searching leads:', error);
    return [];
  }
}

/**
 * Get detailed information for a specific lead
 */
async function getLeadDetails(leadId: string) {
  console.log(`\n--- Getting details for lead ID: ${leadId} ---`);
  try {
    const lead = await leadData.getLeadById(leadId);
    
    if (!lead) {
      console.log('No lead found with this ID');
      return;
    }
    
    console.log('Lead Details:');
    console.log(JSON.stringify(lead, null, 2));
    
    return lead;
  } catch (error) {
    console.error('Error getting lead details:', error);
  }
}

/**
 * Get comprehensive data for a lead
 */
async function getComprehensiveLeadData(leadId: string) {
  console.log(`\n--- Getting comprehensive data for lead ID: ${leadId} ---`);
  try {
    const data = await leadData.getComprehensiveLeadData(leadId);
    
    console.log('Comprehensive Lead Data:');
    console.log(JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('Error getting comprehensive lead data:', error);
  }
}

/**
 * Get all available fields for the Leads module
 */
async function getAvailableLeadFields() {
  console.log('\n--- Getting available lead fields ---');
  try {
    const fields = await leadData.getLeadFields();
    
    console.log('Available Lead Fields:');
    console.log(JSON.stringify(fields, null, 2));
    
    return fields;
  } catch (error) {
    console.error('Error getting lead fields:', error);
  }
}

/**
 * Main function to run the script
 */
async function main() {
  try {
    // Login first
    console.log('Logging in to SuiteCRM...');
    await leadData.login();
    console.log('Login successful!');
    
    // Search for leads by name
    await searchLeadsByName('smith');
    
    // Get details for a specific lead
    const leadId = EXAMPLE_LEAD_IDS[0]; // DEBBIE SMITH
    await getLeadDetails(leadId);
    
    // Get comprehensive data for the lead
    await getComprehensiveLeadData(leadId);
    
    // Get available lead fields
    await getAvailableLeadFields();
    
  } catch (error) {
    console.error('Script error:', error);
  }
}

// Run the script
main().catch(console.error); 