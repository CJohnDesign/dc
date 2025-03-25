'use client';

import { useState, useEffect } from 'react';
import useSuiteCRM from '@/hooks/use-suite-crm-hook';

interface CustomerDataDisplayProps {
  customerId?: string;
}

/**
 * Component that demonstrates how to use the SuiteCRM hook
 * to fetch and display customer data
 */
export default function CustomerDataDisplay({ customerId }: CustomerDataDisplayProps) {
  const [customerData, setCustomerData] = useState<any>(null);
  const [inputCustomerId, setInputCustomerId] = useState<string>(customerId || '');
  
  // Use the SuiteCRM hook
  const { 
    isLoggedIn, 
    isLoading, 
    error, 
    login, 
    getCustomerData 
  } = useSuiteCRM();

  // Fetch customer data when customerId changes or when logged in
  useEffect(() => {
    const fetchData = async () => {
      if (customerId && isLoggedIn) {
        const data = await getCustomerData(customerId);
        if (data) {
          setCustomerData(data);
        }
      }
    };

    fetchData();
  }, [customerId, isLoggedIn, getCustomerData]);

  // Handle login
  const handleLogin = async () => {
    await login();
  };

  // Handle customer data fetch
  const handleFetchData = async () => {
    if (inputCustomerId) {
      const data = await getCustomerData(inputCustomerId);
      if (data) {
        setCustomerData(data);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Customer Data</h2>
      
      {/* Login status */}
      <div className="mb-4">
        <p className="mb-2">
          Status: {isLoggedIn ? (
            <span className="text-green-600 font-semibold">Logged In</span>
          ) : (
            <span className="text-red-600 font-semibold">Not Logged In</span>
          )}
        </p>
        
        {!isLoggedIn && (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        )}
      </div>
      
      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
      
      {/* Customer ID input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Customer ID:</label>
        <div className="flex">
          <input
            type="text"
            value={inputCustomerId}
            onChange={(e) => setInputCustomerId(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter customer ID"
          />
          <button
            onClick={handleFetchData}
            disabled={isLoading || !inputCustomerId || !isLoggedIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
      </div>
      
      {/* Customer data display */}
      {customerData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <div className="bg-gray-50 p-4 rounded border">
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(customerData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 