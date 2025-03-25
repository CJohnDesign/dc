# DC CRM API Documentation

## Overview
This documentation provides steps to use the V4 API of SuiteCRM in DC CRM. Every API request requires a session ID, obtained through the Swagger API (LOGIN). The session ID is then passed in subsequent API calls for authentication.

## Getting Started

### Step 1: Obtain Session ID
To start using the API, you need to acquire a session ID by making a login API call.

#### API Endpoint
Swagger API: Swagger UI

#### Authentication Details
- Username: admin
- Password: QA6N6uBUyTHGg8g

#### Steps to Authenticate
1. Open the Swagger API link.
2. Navigate to the LOGIN API.
3. Enter the provided credentials (admin / QA6N6uBUyTHGg8g).
4. Submit the request.
5. On successful authentication, an ID (session ID) will be returned.

### Step 2: Use the Session ID in API Calls
Once the session ID is obtained, include it in all API requests to authenticate the session.

#### Passing the Session ID
- The session ID should be passed with each API request.
- Ensure that the session ID is included as required by the API specification.

Following these steps, you can successfully authenticate and interact with the DC CRM API using SuiteCRM V4.

## API being used for PQ portal
- get_pq_document
- request_two_factor_again
- get_customer_data
- customer_portal_twofa
- set_password_customer_portal
- change_password_customer_portal
- customer_protal_signup
- customer_portal_login

## How to Use Swagger for API Access:
Swagger API Demo.webm
