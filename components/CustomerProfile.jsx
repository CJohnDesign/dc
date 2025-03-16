import React, { useState } from 'react';
import { useCustomerData, useSuiteCRMAuth, useLeadSearch } from '../hooks/useCustomerData';

/**
 * Customer Profile component that displays customer data from the SuiteCRM API
 */
function CustomerProfile({ apiUrl = 'https://pq-crm-stage.avmdemo.com/service/v4_1/rest.php' }) {
  // Authentication state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  
  // Use the authentication hook
  const { sessionId, loading: authLoading, error: authError } = useSuiteCRMAuth(
    isAuthenticated ? username : '',
    isAuthenticated ? password : '',
    apiUrl
  );
  
  // Use the lead search hook
  const { leads, loading: searchLoading, error: searchError } = useLeadSearch(
    searchTerm,
    sessionId,
    apiUrl
  );
  
  // Use the customer data hook
  const { customerData, loading: dataLoading, error: dataError } = useCustomerData(
    selectedLeadId,
    sessionId,
    apiUrl
  );
  
  // Handle authentication form submission
  const handleAuthenticate = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // The search will be triggered by the useLeadSearch hook
  };
  
  // Handle selecting a lead
  const handleSelectLead = (leadId) => {
    setSelectedLeadId(leadId);
  };
  
  // Render the authentication form if not authenticated
  if (!isAuthenticated || !sessionId) {
    return (
      <div className="auth-container">
        <h2>SuiteCRM Authentication</h2>
        {authError && <div className="error">{authError.message}</div>}
        <form onSubmit={handleAuthenticate}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={authLoading}>
            {authLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }
  
  return (
    <div className="customer-profile-container">
      <h1>Customer Profile</h1>
      
      {/* Search Form */}
      <div className="search-container">
        <h2>Search for a Lead</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        
        {searchError && <div className="error">{searchError.message}</div>}
        
        {/* Search Results */}
        {leads.length > 0 ? (
          <div className="search-results">
            <h3>Search Results</h3>
            <ul>
              {leads.map((lead) => (
                <li key={lead.id}>
                  <button
                    onClick={() => handleSelectLead(lead.id)}
                    className={selectedLeadId === lead.id ? 'selected' : ''}
                  >
                    {lead.first_name} {lead.last_name} {lead.email1 ? `(${lead.email1})` : ''}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : searchTerm && !searchLoading ? (
          <div className="no-results">No leads found matching "{searchTerm}"</div>
        ) : null}
      </div>
      
      {/* Customer Data */}
      {selectedLeadId && (
        <div className="customer-data">
          <h2>Customer Data</h2>
          
          {dataLoading ? (
            <div className="loading">Loading customer data...</div>
          ) : dataError ? (
            <div className="error">
              <p>Error loading customer data: {dataError.message}</p>
              <p>Note: The get_customer_data endpoint may not be implemented in this environment.</p>
            </div>
          ) : customerData ? (
            <div className="customer-details">
              <h3>{customerData.lead.first_name} {customerData.lead.last_name}</h3>
              
              <div className="details-section">
                <h4>Contact Information</h4>
                <p><strong>Email:</strong> {customerData.lead.email}</p>
                <p><strong>Status:</strong> {customerData.lead.status}</p>
                <p><strong>Phone:</strong> {customerData.lead.phone_work}</p>
                <p><strong>Mobile:</strong> {customerData.lead.phone_mobile}</p>
                <p><strong>Address:</strong> {customerData.lead.primary_address_street}, {customerData.lead.primary_address_city}, {customerData.lead.primary_address_state} {customerData.lead.primary_address_postalcode}</p>
              </div>
              
              {customerData.documents && customerData.documents.length > 0 && (
                <div className="details-section">
                  <h4>Documents</h4>
                  <ul className="documents-list">
                    {customerData.documents.map((doc) => (
                      <li key={doc.id}>
                        {doc.name} - <span className={doc.status.toLowerCase()}>{doc.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {customerData.notes && customerData.notes.length > 0 && (
                <div className="details-section">
                  <h4>Notes</h4>
                  <ul className="notes-list">
                    {customerData.notes.map((note) => (
                      <li key={note.id}>
                        <h5>{note.subject}</h5>
                        <p>{note.description}</p>
                        <small>Created on {new Date(note.date_created).toLocaleDateString()} by {note.created_by}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="no-data">No customer data available</div>
          )}
          
          {/* Simulated Data (for development) */}
          <div className="simulated-data">
            <h3>Simulated Customer Data</h3>
            <p className="note">Note: This is simulated data for development purposes.</p>
            
            <div className="details-section">
              <h4>Contact Information</h4>
              <p><strong>Name:</strong> DEBBIE SMITH</p>
              <p><strong>Email:</strong> debbiesmith@mailiantor.com</p>
              <p><strong>Status:</strong> Warm Lead</p>
              <p><strong>Phone:</strong> 555-123-4567</p>
              <p><strong>Mobile:</strong> 555-987-6543</p>
              <p><strong>Address:</strong> 123 Main St, Anytown, CA 90210</p>
            </div>
            
            <div className="details-section">
              <h4>Documents</h4>
              <ul className="documents-list">
                <li>Business Plan.pdf - <span className="approved">Approved</span></li>
                <li>Financial Statement.pdf - <span className="under-review">Under Review</span></li>
              </ul>
            </div>
            
            <div className="details-section">
              <h4>Notes</h4>
              <ul className="notes-list">
                <li>
                  <h5>Initial Contact</h5>
                  <p>Spoke with DEBBIE about her business financing needs.</p>
                  <small>Created on 5/16/2023 by John Broker</small>
                </li>
                <li>
                  <h5>Follow-up Call</h5>
                  <p>Discussed loan options and requested additional documentation.</p>
                  <small>Created on 5/25/2023 by John Broker</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfile; 