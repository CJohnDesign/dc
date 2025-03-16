import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, Download, CreditCard, Home, Car, Briefcase } from 'lucide-react';

export interface Account {
  id: string;
  type: 'MTG' | 'CARD' | 'AUTO' | 'PERSONAL';
  creditor: string;
  balance: number;
  limit: number;
  age: string;
  payment: number;
  utilization: number;
  status: 'current' | 'late' | 'delinquent';
}

interface AccountsTableProps {
  accounts: Account[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts }) => {
  const [sortField, setSortField] = useState<keyof Account>('utilization');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const handleSort = (field: keyof Account) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MTG':
        return <Home size={16} className="text-blue-500" />;
      case 'CARD':
        return <CreditCard size={16} className="text-purple-500" />;
      case 'AUTO':
        return <Car size={16} className="text-green-500" />;
      case 'PERSONAL':
        return <Briefcase size={16} className="text-amber-500" />;
      default:
        return <CreditCard size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'text-green-500 bg-green-50';
      case 'late':
        return 'text-amber-500 bg-amber-50';
      case 'delinquent':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 80) return 'text-red-500';
    if (utilization > 50) return 'text-amber-500';
    if (utilization > 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sortedAccounts = [...accounts]
    .filter(account => !filter || account.type === filter)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-heading font-bold text-[#1e3a4f]">Credit Accounts</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => setFilter(null)}
            >
              <Filter size={14} />
              {filter ? `Filtering: ${filter}` : 'All Accounts'}
              <ChevronDown size={14} />
            </button>
            {/* Filter dropdown would go here */}
          </div>
          <button className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--background-alt)] text-sm border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('type')}
                >
                  Type
                  {sortField === 'type' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button 
                  className="flex items-center gap-1"
                  onClick={() => handleSort('creditor')}
                >
                  Creditor
                  {sortField === 'creditor' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  className="flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('balance')}
                >
                  Balance
                  {sortField === 'balance' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  className="flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('limit')}
                >
                  Limit
                  {sortField === 'limit' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <button 
                  className="flex items-center gap-1 ml-auto"
                  onClick={() => handleSort('utilization')}
                >
                  Utilization
                  {sortField === 'utilization' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-center font-medium">
                <button 
                  className="flex items-center gap-1 mx-auto"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-center font-medium">
                <span>Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAccounts.length > 0 ? (
              sortedAccounts.map((account) => (
                <React.Fragment key={account.id}>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(account.type)}
                        <span className="text-sm font-medium">{account.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{account.creditor}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium numeric">{formatCurrency(account.balance)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm numeric">{formatCurrency(account.limit)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-medium ${getUtilizationColor(account.utilization)}`}>
                        {account.utilization}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(account.status)}`}>
                          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setExpandedRow(expandedRow === account.id ? null : account.id)}
                          className="p-1 rounded-full hover:bg-gray-200"
                        >
                          {expandedRow === account.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === account.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="opacity-70">Account Age</p>
                            <p className="font-medium">{account.age}</p>
                          </div>
                          <div>
                            <p className="opacity-70">Monthly Payment</p>
                            <p className="font-medium numeric">{formatCurrency(account.payment)}</p>
                          </div>
                          <div>
                            <p className="opacity-70">Actions</p>
                            <div className="flex gap-2 mt-1">
                              <button className="text-xs px-2 py-1 bg-[#1e3a4f] text-white rounded-md">
                                View Details
                              </button>
                              <button className="text-xs px-2 py-1 border border-gray-200 rounded-md">
                                Payment History
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center opacity-70">
                  No accounts found. {filter && <button onClick={() => setFilter(null)} className="text-[#1e3a4f] hover:underline">Clear filter</button>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable; 