import axios from 'axios';

// Base API URL from swagger
const API_BASE_URL = 'https://pq-crm-stage.avmdemo.com/custom/service/v4_1_custom/rest.php';

// Utility to build the query URL with parameters
function buildQueryURL(method: string, restData: any): string {
  return `${API_BASE_URL}?input_type=JSON&method=${method}&response_type=JSON&rest_data=${encodeURIComponent(JSON.stringify(restData))}`;
}

// Session management
let currentSession: string | null = null;

// Types based on the Swagger API
interface LoginResponse {
  id: string;
}

interface Lead {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  [key: string]: any;
}

interface BrokerDetails {
  id: string;
  username_c: string;
  broker_details: Record<string, any>;
  [key: string]: any;
}

interface BrokerCount {
  total_count: number;
  business_application: number;
  personal_application: number;
}

interface Document {
  document_name: string;
  document_revision_id: string;
  template_type: string;
  file_mime_type: string;
  file_ext: string;
  filename: string;
  preview: string;
  file_content: string;
}

// Authentication Functions
export async function login(username: string, password: string): Promise<string> {
  try {
    const restData = {
      user_auth: {
        user_name: username,
        password: password,
        encryption: "PLAIN"
      },
      application: "Autobot"
    };
    
    const response = await axios.get<LoginResponse>(buildQueryURL('login', restData));
    
    if (response.data && response.data.id) {
      currentSession = response.data.id;
      return response.data.id;
    } else {
      throw new Error('Login failed: Invalid response');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Lead Management Functions
export async function getLead(session: string, leadId: string, selectFields: string[] = []): Promise<Lead | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      id: leadId,
      offset: 0,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: 1,
      deleted: "false"
    };
    
    const response = await axios.get(buildQueryURL('get_entry', restData));
    
    if (response.data && response.data.success && response.data.entry) {
      return response.data.entry;
    }
    
    return null;
  } catch (error) {
    console.error('Get lead failed:', error);
    return null;
  }
}

export async function getLeads(session: string, leadIds: string[], selectFields: string[] = []): Promise<Lead[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      ids: leadIds,
      select_fields: selectFields
    };
    
    const response = await axios.get(buildQueryURL('get_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get leads failed:', error);
    return [];
  }
}

export async function getLeadsByQuery(
  session: string, 
  query: string, 
  selectFields: string[] = [], 
  maxResults: number = 0, 
  offset: string = ""
): Promise<{ leads: Lead[], resultCount: number, nextOffset: number }> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      query,
      order_by: "",
      offset,
      select_fields: selectFields,
      link_name_to_fields_array: [],
      max_results: maxResults,
      deleted: "false"
    };
    
    const response = await axios.get(buildQueryURL('get_entry_list', restData));
    
    if (response.data && response.data.success) {
      return {
        leads: response.data.entry_list || [],
        resultCount: response.data.result_count || 0,
        nextOffset: response.data.next_offset || 0
      };
    }
    
    return { leads: [], resultCount: 0, nextOffset: 0 };
  } catch (error) {
    console.error('Get leads by query failed:', error);
    return { leads: [], resultCount: 0, nextOffset: 0 };
  }
}

export async function createOrUpdateLead(session: string, leadData: Record<string, any>): Promise<string | null> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_list: leadData
    };
    
    const response = await axios.get(buildQueryURL('set_entry', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create or update lead failed:', error);
    return null;
  }
}

export async function createOrUpdateLeads(session: string, leadsData: Record<string, any>[]): Promise<string[]> {
  try {
    const restData = {
      session,
      module_name: "Leads",
      name_value_lists: leadsData
    };
    
    const response = await axios.get(buildQueryURL('set_entries', restData));
    
    if (Array.isArray(response.data)) {
      return response.data.map(item => item.id);
    }
    
    return [];
  } catch (error) {
    console.error('Create or update leads failed:', error);
    return [];
  }
}

// Broker Functions
export async function manualBrokerLogin(
  session: string, 
  username: string, 
  password: string
): Promise<BrokerDetails | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('manual_login', restData));
    
    if (response.data && response.data.id) {
      return response.data as BrokerDetails;
    }
    
    return null;
  } catch (error) {
    console.error('Manual broker login failed:', error);
    return null;
  }
}

export async function manualLeadLogin(
  session: string, 
  username: string, 
  password: string
): Promise<Lead | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('manual_lead_login', restData));
    
    if (response.data && response.data.id) {
      return response.data as Lead;
    }
    
    return null;
  } catch (error) {
    console.error('Manual lead login failed:', error);
    return null;
  }
}

export async function getBrokerDetails(session: string, brokerId: string): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_details', restData));
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker details failed:', error);
    return null;
  }
}

export async function getBrokerCount(session: string, brokerId: string): Promise<BrokerCount | null> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_count', restData));
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data as BrokerCount;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker count failed:', error);
    return null;
  }
}

export async function getAssociatedLeads(session: string, brokerId: string): Promise<Lead[]> {
  try {
    const restData = {
      session,
      params: {
        id: brokerId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_associated_leads', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get associated leads failed:', error);
    return [];
  }
}

export async function getAssociatedNotes(session: string, query: string = "", limit: string = ""): Promise<any[]> {
  try {
    const restData = {
      session,
      params: {
        query,
        limit
      }
    };
    
    const response = await axios.get(buildQueryURL('get_associated_notes', restData));
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Get associated notes failed:', error);
    return [];
  }
}

// File Management Functions
export async function getFile(session: string, recordId: string): Promise<any | null> {
  try {
    const restData = {
      session,
      recordId
    };
    
    const response = await axios.get(buildQueryURL('get_file', restData));
    
    if (response.data && response.data.success && response.data.file) {
      return response.data.file;
    }
    
    return null;
  } catch (error) {
    console.error('Get file failed:', error);
    return null;
  }
}

// Email Verification Functions
export async function checkEmailExists(
  session: string, 
  moduleName: string, 
  email: string
): Promise<{ exists: boolean, recordId?: string }> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        email
      }
    };
    
    const response = await axios.get(buildQueryURL('check_email_exist', restData));
    
    if (response.data) {
      return {
        exists: response.data.exists || false,
        recordId: response.data.record_id
      };
    }
    
    return { exists: false };
  } catch (error) {
    console.error('Check email exists failed:', error);
    return { exists: false };
  }
}

export async function changePassword(session: string, moduleName: string, email: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        email
      }
    };
    
    const response = await axios.get(buildQueryURL('change_password', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Change password failed:', error);
    return false;
  }
}

// Offshore Script Function
export async function offshoreScript(
  session: string, 
  leadFields: Record<string, any>, 
  appointment?: string, 
  assignedUserId?: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        ...leadFields,
        appointment,
        assigned_user_id: assignedUserId
      }
    };
    
    const response = await axios.post(buildQueryURL('off_shore_script', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Offshore script failed:', error);
    return false;
  }
}

// Document Functions
export async function getDocuments(session: string, module: string, leadId: string): Promise<Record<string, string> | null> {
  try {
    const restData = {
      session,
      params: {
        module,
        lead_id: leadId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_documents', restData));
    
    if (response.data && response.data.success && response.data.documantsAvailable) {
      return response.data.documents;
    }
    
    return null;
  } catch (error) {
    console.error('Get documents failed:', error);
    return null;
  }
}

// PQE Submission Function
export async function pqeSubmission(session: string, leadData: Record<string, any>): Promise<boolean> {
  try {
    const restData = {
      session,
      params: leadData
    };
    
    const response = await axios.get(buildQueryURL('pqe_submission', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('PQE submission failed:', error);
    return false;
  }
}

// BDS Form Functions
export async function getBDSFormData(
  session: string, 
  leadId: string, 
  requestedFields: Record<string, string>
): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId,
        ...requestedFields
      }
    };
    
    const response = await axios.get(buildQueryURL('get_bds_form_data', restData));
    
    if (response.data && response.data.success) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get BDS form data failed:', error);
    return null;
  }
}

export async function submitBDSPFSFormData(
  session: string, 
  module: string, 
  id: string, 
  fieldToCheck: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module,
        id,
        field_to_check: fieldToCheck
      }
    };
    
    const response = await axios.get(buildQueryURL('submit_bds_pfs_form_data', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Submit BDS PFS form data failed:', error);
    return false;
  }
}

export async function getBDSPFSStatus(session: string, leadId: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_bds_pfs_status', restData));
    
    if (response.data && response.data.success) {
      return response.data.bds_pfs_form_status === true;
    }
    
    return false;
  } catch (error) {
    console.error('Get BDS PFS status failed:', error);
    return false;
  }
}

// Customer Portal Functions
export async function customerPortalSignup(session: string, username: string, password: string): Promise<string | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password
      }
    };
    
    const response = await axios.get(buildQueryURL('customer_protal_signup', restData));
    
    if (response.data && response.data.success && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Customer portal signup failed:', error);
    return null;
  }
}

export async function customerPortalLogin(
  session: string, 
  username: string, 
  password: string, 
  twoFactorAuthId?: string
): Promise<{ id: string, twoFaCheck: boolean } | null> {
  try {
    const restData = {
      session,
      params: {
        username_c: username,
        password_c: password,
        two_factor_auth_id: twoFactorAuthId
      }
    };
    
    const response = await axios.get(buildQueryURL('customer_portal_login', restData));
    
    if (response.data && response.data.success && response.data.id) {
      return {
        id: response.data.id,
        twoFaCheck: response.data.two_fa_check === true
      };
    }
    
    return null;
  } catch (error) {
    console.error('Customer portal login failed:', error);
    return null;
  }
}

export async function changePasswordCustomerPortal(session: string, moduleName: string, username: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        username_c: username
      }
    };
    
    const response = await axios.get(buildQueryURL('change_password_customer_portal', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Change password customer portal failed:', error);
    return false;
  }
}

export async function setPasswordCustomerPortal(
  session: string, 
  moduleName: string, 
  leadId: string, 
  password: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId,
        password_c: password
      }
    };
    
    const response = await axios.post(buildQueryURL('set_password_customer_portal', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Set password customer portal failed:', error);
    return false;
  }
}

export async function customerPortalTwofa(
  session: string, 
  moduleName: string, 
  leadId: string, 
  twofaCode: string,
  rememberMe?: string
): Promise<{ success: boolean, twoFactorId?: string }> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId,
        twofa_code: twofaCode,
        remember_me: rememberMe
      }
    };
    
    const response = await axios.post(buildQueryURL('customer_portal_twofa', restData), {});
    
    if (response.data && response.data.success) {
      return {
        success: true,
        twoFactorId: response.data.two_factor_id
      };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Customer portal twofa failed:', error);
    return { success: false };
  }
}

export async function requestTwoFactorAgain(session: string, moduleName: string, leadId: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        module_name: moduleName,
        lead_id: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('request_two_factor_again', restData), {});
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Request two factor again failed:', error);
    return false;
  }
}

// Customer Data Functions
export async function getCustomerData(
  session: string, 
  origin: string, 
  leadId: string
): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        origin,
        leadID: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('get_customer_data', restData), {});
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Get customer data failed:', error);
    return null;
  }
}

export async function getPQDocument(session: string, leadId: string): Promise<Document | null> {
  try {
    const restData = {
      session,
      params: {
        lead_id: leadId
      }
    };
    
    const response = await axios.post(buildQueryURL('get_pq_document', restData), {});
    
    if (response.data && response.data.success === "true") {
      return {
        document_name: response.data.document_name,
        document_revision_id: response.data.document_revision_id,
        template_type: response.data.template_type,
        file_mime_type: response.data.file_mime_type,
        file_ext: response.data.file_ext,
        filename: response.data.filename,
        preview: response.data.preview,
        file_content: response.data.file_content
      };
    }
    
    return null;
  } catch (error) {
    console.error('Get PQ document failed:', error);
    return null;
  }
}

// Meeting Functions
export async function setMeetingForLead(
  session: string, 
  event: string, 
  email: string, 
  name: string,
  startTime: string,
  endTime: string,
  description: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      data: {
        event,
        payload: {
          email,
          name,
          scheduled_event: {
            start_time: startTime,
            end_time: endTime
          },
          questions_and_answers: [
            {
              answer: description
            }
          ]
        }
      }
    };
    
    const response = await axios.post(buildQueryURL('set_metting_for_lead', restData), {});
    
    return response.data === true;
  } catch (error) {
    console.error('Set meeting for lead failed:', error);
    return false;
  }
}

// Phone Verification Functions
export async function checkPhoneExists(
  session: string, 
  phoneMobile: string, 
  moduleName: string
): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        phone_mobile: phoneMobile,
        module_name: moduleName
      }
    };
    
    const response = await axios.get(buildQueryURL('check_phone_exist', restData));
    
    if (response.data) {
      return response.data.exists === true;
    }
    
    return false;
  } catch (error) {
    console.error('Check phone exists failed:', error);
    return false;
  }
}

// Broker Management Functions
export async function deleteBrokerLogo(session: string, id: string): Promise<boolean> {
  try {
    const restData = {
      session,
      params: {
        id
      }
    };
    
    const response = await axios.get(buildQueryURL('delete_broker_logo', restData));
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Delete broker logo failed:', error);
    return false;
  }
}

export async function createRecordForHubspot(session: string): Promise<string | null> {
  try {
    const restData = {
      session,
      params: {}
    };
    
    const response = await axios.get(buildQueryURL('create_record_for_hubspot', restData));
    
    if (response.data && response.data.id) {
      return response.data.id;
    }
    
    return null;
  } catch (error) {
    console.error('Create record for hubspot failed:', error);
    return null;
  }
}

export async function setBrokerProfileData(session: string, id: string, photo: string): Promise<boolean> {
  try {
    const data = {
      rest_data: {
        session,
        params: {
          id,
          photo
        }
      }
    };
    
    const response = await axios.post(buildQueryURL('set_broker_profile_data', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Set broker profile data failed:', error);
    return false;
  }
}

export async function getBrokerSettings(session: string, companyId: string): Promise<Record<string, any> | null> {
  try {
    const restData = {
      session,
      params: {
        company_id: companyId
      }
    };
    
    const response = await axios.get(buildQueryURL('get_broker_settings', restData));
    
    if (response.data && response.data.success && response.data.settings) {
      return response.data.settings;
    }
    
    return null;
  } catch (error) {
    console.error('Get broker settings failed:', error);
    return null;
  }
}

export async function sendTestEmail(
  session: string, 
  email: string, 
  smtpSettings: Record<string, any>
): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        email,
        smtp_settings: smtpSettings
      }
    };
    
    const response = await axios.post(buildQueryURL('send_test_email', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Send test email failed:', error);
    return false;
  }
}

export async function sendBrokerMails(session: string, contactId: string, companyId: string): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        contact_id: contactId,
        company_id: companyId
      }
    };
    
    const response = await axios.post(buildQueryURL('send_broker_mails', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Send broker mails failed:', error);
    return false;
  }
}

export async function isDuplicateEmail(
  session: string, 
  email: string, 
  module: string, 
  field?: string
): Promise<boolean> {
  try {
    const data = {
      session,
      params: {
        email,
        module,
        field
      }
    };
    
    const response = await axios.post(buildQueryURL('is_duplicate_email', {}), data);
    
    return response.data && response.data.success === true;
  } catch (error) {
    console.error('Is duplicate email failed:', error);
    return false;
  }
}

export async function fetchAndDisplayDocument(
  session: string, 
  documentId: string, 
  preview: string = "yes"
): Promise<Document | null> {
  try {
    const restData = {
      session,
      params: {
        document_id: documentId,
        preview
      }
    };
    
    const response = await axios.get(buildQueryURL('fetch_and_display_document', restData));
    
    if (response.data && response.data.success === "true") {
      return {
        document_name: response.data.document_name,
        document_revision_id: response.data.document_revision_id,
        template_type: response.data.template_type,
        file_mime_type: response.data.file_mime_type,
        file_ext: response.data.file_ext,
        filename: response.data.filename,
        preview: response.data.preview,
        file_content: response.data.file_content
      };
    }
    
    return null;
  } catch (error) {
    console.error('Fetch and display document failed:', error);
    return null;
  }
}