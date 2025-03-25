# Deliver Capital

A Next.js application designed to help small businesses qualify for loans by underwriting, structuring, and optimizing financial profiles for improved bank approvals.

## Application Overview

Deliver Capital is a comprehensive financial optimization platform for small businesses seeking funding. The application consists of:

- **Homepage with Onboarding Flow**: A professional landing page that guides visitors through the company's story, core processes, and client journey.
- **Business Assessment Tool**: A multi-step form that collects business information to provide tailored funding recommendations.
- **Credit Dashboard**: A secure portal where clients can view their credit profile, action items, and recommended funding programs.

## Core Features

### Homepage Flow
The homepage (`src/app/page.tsx`) follows a structured narrative flow:
- **Navigation**: Main site navigation with links to key sections
- **Hero Section**: Primary call-to-action to begin the assessment process
- **Our Story**: Company background and mission
- **Core Process**: Explanation of how the service works
- **Client Journey**: Step-by-step explanation of what clients can expect
- **CTA Section**: Final conversion opportunity to start the assessment

### Assessment Flow
The business assessment (`src/components/assessment/AssessmentFlow.tsx`) is a 5-step process:
1. **Business Information**: Basic company details and industry information
2. **Financial Details**: Revenue, debt, and profitability metrics
3. **Credit Information**: Credit history and potential flags
4. **Funding Needs**: Amount, purpose, and timeline for funding
5. **Review & Submit**: Final verification before submission

### Dashboard
The client dashboard (`src/app/fund/dashboard/page.tsx`) provides:
- **Credit Overview**: Summary of current credit standing
- **Action Items**: Recommended steps to improve credit profile
- **Credit Accounts**: List of current credit accounts and their status
- **Program Offers**: Personalized funding programs for which the client may qualify

## Technical Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: TailwindCSS 4
- **UI Components**: Radix UI for accessible interface elements
- **Data Visualization**: D3.js for credit profile charts and graphs

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

- `/src/app`: Next.js app router pages and layouts
- `/src/components`: Reusable UI components
- `/src/data`: Static data and mock API responses
- `/src/hooks`: Custom React hooks
- `/src/utils`: Helper functions and utilities
- `/docs`: Project documentation, PRDs, and backlog

## Deployment

The application is configured for deployment on Vercel, with separate environments for development, staging, and production.
