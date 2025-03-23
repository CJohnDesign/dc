import { CreditActionItem } from '../components/CreditActionCard';
import { CreditSummary } from '../components/CreditSummaryPanel';
import { Account } from '../components/AccountsTable';

// Sample data for Debbie Smith based on the JSON file
const debbieSmithData = {
  lead: {
    id: "e620e105-b444-a3b6-10f8-67d0664ee1d8",
    first_name: "DEBBIE",
    last_name: "SMITH",
    email1: "debbiesmith@mailiantor.com",
    status: "Warm Lead",
    lead_source: "",
    phone_work: "",
    phone_mobile: "",
    date_entered: "2025-03-11 16:35:12",
    description: "",
    primary_address_street: "300 TOWNE ST",
    primary_address_city: "WILLIAMSPORT",
    primary_address_state: "IN",
    primary_address_postalcode: "47993",
    ssn_c: "123007777",
    experian_fico_c: "538",
    equifax_fico_c: "0",
    transunion_fico_c: "0",
    upfront_fee_c: "",
    number_of_payments_c: ""
  },
  additionalInfo: {
    time_in_status: "5 Days",
    ssn: "*****7777",
    experian_fico: "538",
    equifax_fico: "0",
    transunion_fico: "0",
    total_assets_pfs: "0",
    total_liabilities_pfs: "0",
    net_worth_pfs: "0",
    total_income_pfs: "0",
    total_liabilities_and_net_worth_pfs: "0",
    total_contingent_liabilities_pfs: "0",
    pre_qualification: "Fail",
    pre_qualification_score: "37.5",
    go_high_level_status: "Not Synced With Go High Level",
    dc_pre_qualification_score: "37.5",
    cc_pre_qualification_approval_rate: "$2,625",
    credit_score: "538",
    open_tl: "8",
    total_tl_limit: "$18,032",
    highest_rev_limit: "$350",
    age_of_oldest_tl: "3y 3m",
    individual_credit_util: "93%",
    total_credit_util: "92%",
    inquiries: "1"
  }
};

// Helper function to get score rating based on score value
const getScoreRating = (score: number): 'Poor' | 'Fair' | 'Good' | 'Excellent' => {
  if (score < 580) return 'Poor';
  if (score < 670) return 'Fair';
  if (score < 740) return 'Good';
  return 'Excellent';
};

// Helper function to parse percentage string to number
const parsePercentage = (percentStr: string): number => {
  return parseInt(percentStr.replace('%', ''), 10);
};

// Helper function to parse currency string to number
const parseCurrency = (currencyStr: string): number => {
  return parseInt(currencyStr.replace('$', '').replace(',', ''), 10);
};

// Generate credit action items based on Debbie's data
export const getCreditActionItems = (): CreditActionItem[] => {
  const items: CreditActionItem[] = [];
  
  // Credit Utilization Action Item
  const utilizationPercentage = parsePercentage(debbieSmithData.additionalInfo.total_credit_util);
  if (utilizationPercentage > 30) {
    items.push({
      type: 'utilization',
      status: utilizationPercentage > 70 ? 'warning' : 'caution',
      metric: `${utilizationPercentage}%`,
      threshold: '< 30%',
      impact: 'High impact on credit score',
      actions: [
        {
          title: 'Reduce Credit Card Balances',
          description: 'Pay down your highest utilization accounts first for maximum impact.',
          steps: [
            'Identify cards with highest utilization rates',
            'Make larger payments to these accounts',
            'Consider balance transfer to a 0% APR card',
            'Avoid new charges on these accounts'
          ]
        },
        {
          title: 'Request Credit Limit Increases',
          description: 'Higher limits can improve your utilization ratio.',
          steps: [
            'Contact creditors with good payment history',
            'Request credit limit increases',
            'Avoid hard inquiries if possible',
            'Do not use the new available credit'
          ]
        }
      ]
    });
  }
  
  // Revolving Limit Action Item
  const highestRevLimit = parseCurrency(debbieSmithData.additionalInfo.highest_rev_limit);
  if (highestRevLimit < 1000) {
    items.push({
      type: 'revolving_limit',
      status: 'caution',
      metric: `$${highestRevLimit}`,
      threshold: '> $1,000',
      impact: 'Moderate impact on credit score',
      actions: [
        {
          title: 'Build Credit History',
          description: 'Establish a stronger credit profile to qualify for higher limits.',
          steps: [
            'Make all payments on time',
            'Keep utilization below 30%',
            'Apply for a secured credit card if needed',
            'Consider becoming an authorized user on a family member\'s card'
          ]
        },
        {
          title: 'Request Credit Limit Increases',
          description: 'Periodically request increases on existing accounts.',
          steps: [
            'Wait 6 months between requests',
            'Ensure on-time payment history',
            'Provide updated income information',
            'Start with your oldest accounts'
          ]
        }
      ]
    });
  }
  
  // Inquiries Action Item
  const inquiries = parseInt(debbieSmithData.additionalInfo.inquiries, 10);
  if (inquiries > 0) {
    items.push({
      type: 'inquiries',
      status: inquiries > 3 ? 'warning' : 'caution',
      metric: inquiries.toString(),
      threshold: '0-1 in 12 months',
      impact: 'Moderate impact on credit score',
      actions: [
        {
          title: 'Limit New Credit Applications',
          description: 'Too many inquiries can lower your score and signal risk to lenders.',
          steps: [
            'Avoid applying for new credit for the next 6 months',
            'Research pre-qualification options that use soft pulls',
            'Space out necessary applications by at least 3-6 months',
            'Focus on improving existing accounts'
          ]
        }
      ]
    });
  }
  
  return items;
};

// Generate credit summary data based on Debbie's data
export const getCreditSummary = (): CreditSummary => {
  const score = parseInt(debbieSmithData.additionalInfo.credit_score, 10);
  const utilization = parsePercentage(debbieSmithData.additionalInfo.total_credit_util);
  const activeTradelines = parseInt(debbieSmithData.additionalInfo.open_tl, 10);
  
  // Count high utilization accounts (this is an estimate since we don't have individual account data)
  const highUtilizationEstimate = utilization > 80 ? Math.ceil(activeTradelines * 0.75) : 
                                 utilization > 50 ? Math.ceil(activeTradelines * 0.5) : 
                                 utilization > 30 ? Math.ceil(activeTradelines * 0.25) : 0;
  
  // Format today's date as Mar 28, 2024
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return {
    score,
    scoreRating: getScoreRating(score),
    utilization,
    activeTradelines,
    highUtilizationCount: highUtilizationEstimate,
    negativeItemsCount: 2, // Estimated based on poor credit score
    profileAge: debbieSmithData.additionalInfo.age_of_oldest_tl,
    inquiryCount: parseInt(debbieSmithData.additionalInfo.inquiries, 10),
    lastUpdated: formattedDate
  };
};

// Generate sample accounts data based on Debbie's profile
export const getAccounts = (): Account[] => {
  // Since we don't have detailed account information, we'll create sample accounts
  // that align with Debbie's overall credit profile
  
  const totalLimit = parseCurrency(debbieSmithData.additionalInfo.total_tl_limit);
  const utilization = parsePercentage(debbieSmithData.additionalInfo.total_credit_util);
  const totalBalance = Math.round(totalLimit * (utilization / 100));
  const activeTradelines = parseInt(debbieSmithData.additionalInfo.open_tl, 10);
  
  // Create sample accounts
  const accounts: Account[] = [
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
      id: '2',
      type: 'CARD',
      creditor: 'Credit One Bank',
      balance: 280,
      limit: 300,
      age: '1y 8m',
      payment: 25,
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
    },
    {
      id: '4',
      type: 'PERSONAL',
      creditor: 'OneMain Financial',
      balance: 3200,
      limit: 3500,
      age: '1y 2m',
      payment: 175,
      utilization: 91,
      status: 'late'
    },
    {
      id: '5',
      type: 'CARD',
      creditor: 'Merrick Bank',
      balance: 230,
      limit: 250,
      age: '10m',
      payment: 25,
      utilization: 92,
      status: 'current'
    },
    {
      id: '6',
      type: 'PERSONAL',
      creditor: 'Upstart',
      balance: 1450,
      limit: 1500,
      age: '8m',
      payment: 125,
      utilization: 97,
      status: 'current'
    },
    {
      id: '7',
      type: 'CARD',
      creditor: 'First Premier Bank',
      balance: 120,
      limit: 132,
      age: '1y 4m',
      payment: 15,
      utilization: 91,
      status: 'current'
    },
    {
      id: '8',
      type: 'AUTO',
      creditor: 'Santander',
      balance: 0,
      limit: 0,
      age: '2y 5m',
      payment: 0,
      utilization: 0,
      status: 'delinquent'
    }
  ];
  
  return accounts;
}; 