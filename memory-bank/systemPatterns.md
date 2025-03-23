# System Patterns

## Architecture Overview
- **Next.js App Router**: Page-based routing with app directory structure
- **Server Components**: Used for data fetching and initial rendering
- **Client Components**: Used selectively for interactivity with the `"use client"` directive

## Key Technical Decisions
- **Font Strategy**: Using Google Fonts (Rethink Sans for body, Merriweather for headings) for consistent typography
- **Color System**: Primary color (#6271EB) defined in Tailwind config with direct class usage
- **Component Organization**: UI components in `src/components/ui`, page-specific components in `src/components`
- **Authentication Flow**: Custom middleware for authentication using SuiteCRM
- **API Integration**: Structured integration methods in the `integrations` folder

## Design Patterns
- **Utility-first CSS**: Using Tailwind for styling with consistent design tokens
- **Component Composition**: Building complex UI from smaller, reusable components
- **Server/Client Split**: Minimizing client-side JavaScript for better performance
- **TypeScript Interfaces**: Used for type safety throughout the application
- **Color Consistency**: Direct Tailwind classes for all color applications

## Component Relationships
- **Layout Hierarchy**: Global layout → Dashboard layout → Page content
- **UI Component Library**: ShadCN UI components extended with custom styling
- **Data Flow**: Server components fetch data and pass to client components when needed
- **Responsive Design**: Mobile-first approach with tailwind breakpoints 