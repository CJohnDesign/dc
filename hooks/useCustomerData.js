import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * React hook to fetch customer data from the SuiteCRM API
 * @param {string} leadId - The ID of the lead to fetch data for
 * @param {string} sessionId - The SuiteCRM session ID
 * @param {string} apiUrl - The SuiteCRM API URL (optional)
 * @returns {object} - The customer data and loading state
 */
export function useCustomerData(leadId, sessionId, apiUrl = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php') {
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

        const response = await axios.post(apiUrl, new URLSearchParams(post).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        // Check if the response indicates an error
        if (response.data && response.data.name && response.data.name.includes("Error")) {
          setError(new Error(response.data.description || 'Failed to fetch customer data'));
        } else if (response.data && response.data.success) {
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
  }, [leadId, sessionId, apiUrl]);

  return { customerData, loading, error };
}

/**
 * React hook to authenticate with the SuiteCRM API
 * @param {string} username - The username to authenticate with
 * @param {string} password - The password to authenticate with
 * @param {string} apiUrl - The SuiteCRM API URL (optional)
 * @returns {object} - The session ID and loading state
 */
export function useSuiteCRMAuth(username, password, apiUrl = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php') {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !password) {
      setLoading(false);
      return;
    }

    const authenticate = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hash the password using MD5
        const crypto = await import('crypto');
        const passwordMD5 = crypto.createHash('md5').update(password).digest('hex');
        
        const post = {
          method: 'login',
          input_type: "JSON",
          response_type: "JSON",
          rest_data: JSON.stringify({
            user_auth: {
              user_name: username,
              password: passwordMD5
            },
            application_name: 'DC CRM Client',
            name_value_list: {}
          })
        };

        const response = await axios.post(apiUrl, new URLSearchParams(post).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (response.data && response.data.id) {
          setSessionId(response.data.id);
        } else {
          setError(new Error('Failed to authenticate'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [username, password, apiUrl]);

  return { sessionId, loading, error };
}

/**
 * React hook to search for leads in the SuiteCRM API
 * @param {string} searchTerm - The search term to use
 * @param {string} sessionId - The SuiteCRM session ID
 * @param {string} apiUrl - The SuiteCRM API URL (optional)
 * @returns {object} - The search results and loading state
 */
export function useLeadSearch(searchTerm, sessionId, apiUrl = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php') {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm || !sessionId) {
      setLoading(false);
      return;
    }

    const searchLeads = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Create a query based on the search term
        let query = '';
        if (searchTerm.includes('@')) {
          // If the search term looks like an email
          query = `leads.email1 = '${searchTerm}'`;
        } else if (searchTerm.includes(' ')) {
          // If the search term looks like a name (first last)
          const [firstName, lastName] = searchTerm.split(' ');
          query = `leads.first_name LIKE '%${firstName}%' AND leads.last_name LIKE '%${lastName}%'`;
        } else {
          // Otherwise, search in both first and last name
          query = `leads.first_name LIKE '%${searchTerm}%' OR leads.last_name LIKE '%${searchTerm}%'`;
        }
        
        const post = {
          method: 'get_entry_list',
          input_type: "JSON",
          response_type: "JSON",
          rest_data: JSON.stringify({
            session: sessionId,
            module_name: 'Leads',
            query: query,
            order_by: '',
            offset: 0,
            select_fields: ['id', 'first_name', 'last_name', 'status', 'email1', 'phone_work', 'phone_mobile'],
            link_name_to_fields_array: [],
            max_results: 20,
            deleted: 0
          })
        };

        const response = await axios.post(apiUrl, new URLSearchParams(post).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (response.data && response.data.entry_list) {
          // Transform the response into a more usable format
          const transformedLeads = response.data.entry_list.map(lead => {
            const leadData = {};
            leadData.id = lead.id;
            
            if (lead.name_value_list) {
              Object.keys(lead.name_value_list).forEach(key => {
                leadData[key] = lead.name_value_list[key].value;
              });
            }
            
            return leadData;
          });
          
          setLeads(transformedLeads);
        } else {
          setLeads([]);
        }
      } catch (err) {
        setError(err);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    searchLeads();
  }, [searchTerm, sessionId, apiUrl]);

  return { leads, loading, error };
} 