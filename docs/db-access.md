# DC CRM API Documentation

## Overview

This documentation provides steps to use the V4 API of SuiteCRM in DC CRM. Every API request requires a session ID, obtained through the Swagger API (LOGIN). The session ID is then passed in subsequent API calls for authentication.

## Getting Started

### Step 1: Obtain Session ID

To start using the API, you need to acquire a session ID by making a login API call.

**API Endpoint**
- Swagger API: [Swagger UI](https://your-suitecrm-instance/swagger)

**Authentication Details**
- Username: admin
- Password: QA6N6uBUyTHGg8g

**Steps to Authenticate**
1. Open the Swagger API link.
2. Navigate to the LOGIN API.
3. Enter the provided credentials (admin / QA6N6uBUyTHGg8g).
4. Submit the request.
5. On successful authentication, an ID (session ID) will be returned.

### Step 2: Use the Session ID in API Calls

Once the session ID is obtained, include it in all API requests to authenticate the session.

**Passing the Session ID**
- The session ID should be passed with each API request.
- Ensure that the session ID is included as required by the API specification.

## Available API Endpoints for PQ Portal

The following API endpoints are available for use in the PQ Portal:

1. `get_pq_document`
2. `request_two_factor_again`
3. `get_customer_data`
4. `customer_portal_twofa`
5. `set_password_customer_portal`
6. `change_password_customer_portal`
7. `customer_protal_signup`
8. `customer_portal_login`

## Accessing Data with Scripts

Below are examples of how to access data from the DC CRM API using different programming languages.

### JavaScript/TypeScript Example (Node.js)

```typescript
// src/utils/suitecrm-api.ts
import axios from 'axios';

// Base URL for the SuiteCRM API
const API_BASE_URL = 'https://your-suitecrm-instance/api/v4';

// Store the session ID
let sessionId: string | null = null;

/**
 * Login to SuiteCRM and get a session ID
 */
export async function login(): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: 'admin',
      password: 'QA6N6uBUyTHGg8g'
    });
    
    if (response.data && response.data.id) {
      sessionId = response.data.id;
      return sessionId;
    } else {
      throw new Error('Failed to get session ID');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Make an authenticated API call
 */
export async function apiCall<T>(endpoint: string, data: any = {}): Promise<T> {
  // If no session ID, login first
  if (!sessionId) {
    await login();
  }
  
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, {
      ...data,
      session_id: sessionId
    });
    
    return response.data;
  } catch (error) {
    // If session expired, try to login again and retry
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await login();
      return apiCall(endpoint, data);
    }
    
    console.error(`API call error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Example: Get customer data
 */
export async function getCustomerData(customerId: string) {
  return apiCall<any>('get_customer_data', { customer_id: customerId });
}

/**
 * Example: Get PQ document
 */
export async function getPQDocument(documentId: string) {
  return apiCall<any>('get_pq_document', { document_id: documentId });
}

/**
 * Example: Customer portal login
 */
export async function customerPortalLogin(email: string, password: string) {
  return apiCall<any>('customer_portal_login', { 
    email, 
    password 
  });
}
```

### Python Example

```python
# utils/suitecrm_api.py
import requests
import json

# Base URL for the SuiteCRM API
API_BASE_URL = 'https://your-suitecrm-instance/api/v4'

# Store the session ID
session_id = None

def login():
    """Login to SuiteCRM and get a session ID"""
    global session_id
    
    try:
        response = requests.post(f"{API_BASE_URL}/login", json={
            "username": "admin",
            "password": "QA6N6uBUyTHGg8g"
        })
        
        response.raise_for_status()
        data = response.json()
        
        if 'id' in data:
            session_id = data['id']
            return session_id
        else:
            raise Exception("Failed to get session ID")
    except Exception as e:
        print(f"Login error: {str(e)}")
        raise

def api_call(endpoint, data={}):
    """Make an authenticated API call"""
    global session_id
    
    # If no session ID, login first
    if not session_id:
        login()
    
    try:
        response = requests.post(f"{API_BASE_URL}/{endpoint}", json={
            **data,
            "session_id": session_id
        })
        
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        # If session expired, try to login again and retry
        if e.response.status_code == 401:
            login()
            return api_call(endpoint, data)
        
        print(f"API call error ({endpoint}): {str(e)}")
        raise
    except Exception as e:
        print(f"API call error ({endpoint}): {str(e)}")
        raise

def get_customer_data(customer_id):
    """Get customer data"""
    return api_call('get_customer_data', {'customer_id': customer_id})

def get_pq_document(document_id):
    """Get PQ document"""
    return api_call('get_pq_document', {'document_id': document_id})

def customer_portal_login(email, password):
    """Customer portal login"""
    return api_call('customer_portal_login', {
        'email': email,
        'password': password
    })
```

### Command Line Script Example (Node.js)

Here's a simple script to fetch and display data from the API:

```javascript
// scripts/fetch-customer-data.js
const { login, getCustomerData } = require('../src/utils/suitecrm-api');

// Customer ID to fetch
const customerId = process.argv[2];

if (!customerId) {
  console.error('Please provide a customer ID as an argument');
  process.exit(1);
}

async function main() {
  try {
    // Login to get session ID
    await login();
    
    // Fetch customer data
    const customerData = await getCustomerData(customerId);
    
    // Display the data
    console.log('Customer Data:');
    console.log(JSON.stringify(customerData, null, 2));
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
}

main();
```

To run this script:
```bash
node scripts/fetch-customer-data.js CUSTOMER_ID
```

## Best Practices

1. **Session Management**:
   - Store the session ID securely
   - Implement session expiration handling
   - Re-authenticate when session expires

2. **Error Handling**:
   - Implement proper error handling for API calls
   - Log errors for debugging
   - Provide meaningful error messages to users

3. **Rate Limiting**:
   - Avoid making too many requests in a short period
   - Implement exponential backoff for retries

4. **Security**:
   - Never expose credentials in client-side code
   - Use environment variables for sensitive information
   - Implement proper authentication in your application

5. **Data Validation**:
   - Validate input data before sending to the API
   - Validate response data before using it

## Troubleshooting

### Common Issues

1. **Authentication Failures**:
   - Verify credentials are correct
   - Check if the session ID is being passed correctly
   - Ensure the session hasn't expired

2. **API Endpoint Not Found**:
   - Verify the endpoint name is correct
   - Check if the API version is correct
   - Ensure the API is available and not under maintenance

3. **Data Format Issues**:
   - Ensure request data is in the correct format
   - Check if required fields are included
   - Verify data types match the API requirements

### Getting Help

If you encounter issues not covered in this documentation, please contact the DC CRM support team at support@dccrm.com or open a ticket in the support portal. 