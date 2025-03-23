# Technical Context

## Technologies Used
- **Frontend Framework**: Next.js 15.2.3 with App Router
- **UI Component Library**: ShadCN UI / Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Server Components with minimal client components
- **Package Manager**: pnpm
- **Database**: Drizzle ORM for potential database integration
- **Authentication**: Custom middleware using SuiteCRM

## Font Setup
- **Body Text**: Rethink Sans (Google Fonts)
- **Headings**: Merriweather (Google Fonts)
- **Fonts Configuration**: Defined in `src/lib/fonts.ts` and applied via Tailwind

## Color System
- **Primary Color**: #6271EB (indigo/purple) defined in Tailwind config
- **Secondary Colors**: Standard Tailwind palette (slate, gray, etc.)
- **Direct Usage**: Colors applied via Tailwind classes rather than CSS variables

## Development Setup
- Running the development server: `pnpm dev`
- Fonts are loaded via Next.js Font optimization
- App follows a mobile-first responsive design approach

## Technical Constraints
- Integration with SuiteCRM through Swagger API (docs in `docs/swagger.yml`)
- Session token required for authentication with CRM
- Browser compatibility requirements for modern browsers

## Dependencies
- Key UI components from ShadCN
- Chart visualizations for financial data
- Server components for data fetching where possible
- Client components only when necessary for interactivity 