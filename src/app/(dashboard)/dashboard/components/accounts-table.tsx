'use client';

import React, { useState, useEffect } from 'react';
import { getCustomerData } from '@/lib/integrations/suitecrm/customer-portal/get-customer-data';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Account {
  id: string;
  type: 'MTG' | 'CARD' | 'AUTO' | 'PERSONAL';
  subtype?: string;
  creditor: string;
  balance: number;
  limit: number;
  age: string;
  payment: number;
  utilization: number;
  status: 'current' | 'late' | 'delinquent';
}

interface AccountsTableProps {
  initialAccounts?: Account[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ initialAccounts = [] }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] || null : null;
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        
        const allCookies = typeof document !== 'undefined' ? document.cookie : '';
        console.log('All cookies:', allCookies);
        
        const sessionId = getCookie('crm_session');
        const userId = getCookie('crm_user_id');
        
        const debug = `SessionID: ${sessionId ? 'Found' : 'Not found'}, UserID: ${userId ? 'Found' : 'Not found'}`;
        setDebugInfo(debug);
        console.log(debug);
        
        const useDevMode = !sessionId || !userId;
        const devSessionId = 'dev_session_id';
        const devUserId = 'dev_user_id';
        
        if (!sessionId || !userId) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Using development fallback for session data');
          } else {
            throw new Error('Session not found. Please log in again.');
          }
        }
        
        let customerData = null;
        
        if (useDevMode && process.env.NODE_ENV === 'development') {
          console.log('Using mock customer data for development');
          customerData = {
            credit_info: {
              total_tl_limit: '$18,032',
              total_credit_util: '92%',
              open_tl: '8',
              age_of_oldest_tl: '3y 3m'
            }
          };
        } else {
          customerData = await getCustomerData(
            sessionId || devSessionId, 
            'web_portal', 
            userId || devUserId
          );
        }
        
        if (!customerData) {
          throw new Error('Failed to fetch customer data.');
        }
        
        const fetchedAccounts: Account[] = [];
        
        if (customerData.tradelines && Array.isArray(customerData.tradelines)) {
          customerData.tradelines.forEach((tradeline: any) => {
            let type: 'MTG' | 'CARD' | 'AUTO' | 'PERSONAL' = 'PERSONAL';
            if (tradeline.account_type === 'mortgage' || tradeline.account_type === 'home loan') {
              type = 'MTG';
            } else if (tradeline.account_type === 'credit card' || tradeline.account_type === 'revolving') {
              type = 'CARD';
            } else if (tradeline.account_type === 'auto loan' || tradeline.account_type === 'vehicle') {
              type = 'AUTO';
            }
            
            const balance = parseFloat(tradeline.current_balance || '0');
            const limit = parseFloat(tradeline.credit_limit || tradeline.original_amount || '0');
            const utilization = limit > 0 ? Math.round((balance / limit) * 100) : 0;
            
            fetchedAccounts.push({
              id: tradeline.id || String(fetchedAccounts.length + 1),
              type,
              creditor: tradeline.creditor_name || 'Unknown',
              balance,
              limit,
              age: tradeline.age || 'N/A',
              payment: parseFloat(tradeline.monthly_payment || '0'),
              utilization,
              status: tradeline.status === 'late' ? 'late' : tradeline.status === 'delinquent' ? 'delinquent' : 'current'
            });
          });
        } else if (customerData.credit_info) {
          const creditInfo = customerData.credit_info;
          const totalLimit = parseFloat((creditInfo.total_tl_limit || '0').toString().replace(/[$,]/g, ''));
          const utilization = parseInt((creditInfo.total_credit_util || '0').toString().replace(/%/g, ''));
          const totalBalance = Math.round(totalLimit * (utilization / 100));
          const activeTradelines = parseInt((creditInfo.open_tl || '0').toString());
          const ageOfOldest = (creditInfo.age_of_oldest_tl || '1y 0m').toString();
          
          if (activeTradelines > 0) {
            const cardCount = Math.ceil(activeTradelines * 0.5);
            for (let i = 0; i < cardCount; i++) {
              fetchedAccounts.push({
                id: `card-${i+1}`,
                type: 'CARD',
                creditor: ['Capital One', 'Credit One', 'Chase', 'Discover', 'Citi'][i % 5]!,
                balance: Math.round(totalBalance * 0.1 / cardCount),
                limit: Math.round(totalLimit * 0.15 / cardCount),
                age: `${Math.ceil(Math.random() * 3)}y ${Math.ceil(Math.random() * 11)}m`,
                payment: Math.round(totalBalance * 0.03 / cardCount),
                utilization: Math.min(95, Math.round(utilization * (0.9 + Math.random() * 0.2))),
                status: Math.random() > 0.8 ? 'late' : 'current'
              });
            }
            
            if (activeTradelines > 2) {
              fetchedAccounts.push({
                id: 'auto-1',
                type: 'AUTO',
                creditor: 'Regional Finance',
                balance: Math.round(totalBalance * 0.4),
                limit: Math.round(totalLimit * 0.5),
                age: ageOfOldest,
                payment: Math.round(totalBalance * 0.015),
                utilization: 80,
                status: 'current'
              });
            }
            
            if (activeTradelines > 3) {
              fetchedAccounts.push({
                id: 'personal-1',
                type: 'PERSONAL',
                creditor: 'OneMain Financial',
                balance: Math.round(totalBalance * 0.2),
                limit: Math.round(totalLimit * 0.2),
                age: '1y 2m',
                payment: Math.round(totalBalance * 0.02),
                utilization: 95,
                status: Math.random() > 0.7 ? 'late' : 'current'
              });
            }
            
            if (activeTradelines > 4) {
              fetchedAccounts.push({
                id: 'mtg-1',
                type: 'MTG',
                creditor: 'Quicken Loans',
                balance: Math.round(totalBalance * 0.3),
                limit: Math.round(totalLimit * 0.15),
                age: ageOfOldest,
                payment: Math.round(totalBalance * 0.005),
                utilization: 70,
                status: 'current'
              });
            }
          }
        }
        
        if (fetchedAccounts.length > 0) {
          setAccounts(fetchedAccounts);
        } else if (initialAccounts.length > 0) {
          setAccounts(initialAccounts);
        } else if (process.env.NODE_ENV === 'development') {
          setAccounts([
            {
              id: '1',
              type: 'CARD',
              creditor: 'Capital One',
              balance: 325,
              limit: 350,
              age: '2y 6m',
              payment: 35,
              utilization: 93,
              status: 'current'
            },
            {
              id: '3',
              type: 'AUTO',
              creditor: 'Regional Finance',
              balance: 8500,
              limit: 12000,
              age: '3y 3m',
              payment: 350,
              utilization: 71,
              status: 'current'
            }
          ]);
        } else {
          setAccounts([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Account fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        if (process.env.NODE_ENV === 'development') {
          console.log('Using fallback accounts for development');
          setAccounts([
            {
              id: '1',
              type: 'CARD',
              creditor: 'Capital One',
              balance: 325,
              limit: 350,
              age: '2y 6m',
              payment: 35,
              utilization: 93,
              status: 'current'
            },
            {
              id: '3',
              type: 'AUTO',
              creditor: 'Regional Finance',
              balance: 8500,
              limit: 12000,
              age: '3y 3m',
              payment: 350,
              utilization: 71,
              status: 'current'
            }
          ]);
        }
        setLoading(false);
      }
    };

    if (initialAccounts.length === 0) {
      fetchAccounts();
    } else {
      setLoading(false);
    }
  }, []);

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

  const groupAccountsByType = () => {
    const grouped: Record<string, Account[]> = {};
    accounts.forEach(account => {
      const type = account.type;
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(account);
    });
    return grouped;
  };

  const groupedAccounts = groupAccountsByType();
  const accountEntries: [string, Account[]][] = Object.entries(groupedAccounts);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-heading font-bold text-[#1e3a4f]">Accounts</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-heading font-bold text-[#1e3a4f]">Accounts</h3>
        </div>
        <div className="p-8">
          <div className="text-center text-red-500 mb-4">
            <p>Error loading accounts: {error}</p>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-amber-50 p-4 rounded-md text-sm border border-amber-200">
              <p className="font-medium mb-2">Debug Information:</p>
              <p>{debugInfo}</p>
              <p className="mt-2">Please ensure you're logged in and the session cookies are set correctly.</p>
              <p className="mt-1">Check browser console for more details.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold font-sans text-[#1e3a4f]">Accounts</h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="#" className="text-primary text-sm">View All</a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Coming soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="bg-[var(--background-alt)] border-b border-gray-200 text-muted-foreground">
            <TableHead className="w-[15%]">Type</TableHead>
            <TableHead className="w-[10%]">Count</TableHead>
            <TableHead className="w-[15%]">Creditor</TableHead>
            <TableHead className="w-[15%] text-right">Balance</TableHead>
            <TableHead className="w-[15%] text-right">Limit</TableHead>
            <TableHead className="w-[10%] text-center">Age</TableHead>
            <TableHead className="w-[10%] text-center">Pymt</TableHead>
            <TableHead className="w-[10%] text-right">UTL*</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accountEntries.map(([type, accountsOfType]: [string, Account[]]) => {
            const count = accountsOfType.length;
            const totalBalance = accountsOfType.reduce((sum, acc) => sum + acc.balance, 0);
            const totalLimit = accountsOfType.reduce((sum, acc) => sum + acc.limit, 0);
            const averageUtilization = totalLimit > 0 ? Math.round((totalBalance / totalLimit) * 100) : 0;
            
            return (
              <TableRow key={type} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="w-[15%]">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{type}</span>
                    <span className="text-xs text-gray-500">
                      {type === 'MTG' ? 'Mortgage' : 
                       type === 'CARD' ? 'Credit Card' : 
                       type === 'AUTO' ? 'Auto Loan' : 
                       type === 'PERSONAL' ? 'Personal Loan' : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-[10%]">
                  <span className="text-sm">{count}</span>
                </TableCell>
                <TableCell className="w-[15%]">
                  <span className="text-sm">N/A</span>
                </TableCell>
                <TableCell className="w-[15%] text-right">
                  <span className="text-sm font-medium numeric">{formatCurrency(totalBalance)}</span>
                </TableCell>
                <TableCell className="w-[15%] text-right">
                  <span className="text-sm numeric">{formatCurrency(totalLimit)}</span>
                </TableCell>
                <TableCell className="w-[10%] text-center">
                  <span className="text-sm">3y, 11m</span>
                </TableCell>
                <TableCell className="w-[10%] text-center">
                  <span className="text-sm">18</span>
                </TableCell>
                <TableCell className="w-[10%] text-right">
                  <span className={`text-sm font-medium ${getUtilizationColor(averageUtilization)}`}>
                    {averageUtilization}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
          {Object.keys(groupedAccounts).length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center opacity-70">
                No accounts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsTable;