## Changes Needed for Handoff


- We need to replace the sidebar in `dashboardlayout.tsx` with a ShadCn/sidebar in `src/components/ui/sidebar.tsx`. You can find the sidebar code from ln 34-117. You can keep the username hardcoded. 
- We need to add a few routes for the sidebar. Home will just be /dashboard. The other routes are `creditprofile` and `solutionscenter`
- Connect the front end to the CRM DC Stage using Swagger the documents are in `docs/swagger.yml`
- This requires getting a session token from the CRM DC Stage using the swagger docs. 
- We need to use a slider for the credit summary and credit utilization percentage. 
- We need to clean up the Accounts table. It will use shadcn table in `components/ui/table.tsx`. The data is in `data/accounts.json`
- 



Random UI Stuff
- Icons
- Congrats CTA img
- Credit Summary `slider.tsx`
- Your Credit Score
- Change fonts on the table


Questions: 
- where do the how to fix this buttons go? 
- 