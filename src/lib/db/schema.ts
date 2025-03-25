// Schema for leads management and business funding applications

import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
    decimal,
    boolean,
    json,
    uuid,
  } from 'drizzle-orm/pg-core';
  import { relations } from 'drizzle-orm';
  
  // Leads table (for client information)
  export const leads = pgTable('leads', {
    id: uuid('id').primaryKey(),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    email: varchar('email', { length: 255 }),
    status: varchar('status', { length: 50 }),
    leadSource: varchar('lead_source', { length: 100 }),
    phoneWork: varchar('phone_work', { length: 50 }),
    phoneMobile: varchar('phone_mobile', { length: 50 }),
    dateEntered: timestamp('date_entered').notNull().defaultNow(),
    description: text('description'),
    primaryAddressStreet: varchar('primary_address_street', { length: 255 }),
    primaryAddressCity: varchar('primary_address_city', { length: 100 }),
    primaryAddressState: varchar('primary_address_state', { length: 50 }),
    primaryAddressPostalcode: varchar('primary_address_postalcode', { length: 20 }),
    ssnLastFour: varchar('ssn_last_four', { length: 4 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Lead notes
  export const notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    leadId: uuid('lead_id').notNull().references(() => leads.id),
    content: text('content').notNull(),
    createdBy: varchar('created_by', { length: 100 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Lead documents
  export const documents = pgTable('documents', {
    id: serial('id').primaryKey(),
    leadId: uuid('lead_id').notNull().references(() => leads.id),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 100 }),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Credit and additional information for leads
  export const leadAdditionalInfo = pgTable('lead_additional_info', {
    id: serial('id').primaryKey(),
    leadId: uuid('lead_id').notNull().references(() => leads.id),
    timeInStatus: varchar('time_in_status', { length: 50 }),
    ssn: varchar('ssn', { length: 11 }),
    experianFico: varchar('experian_fico', { length: 10 }),
    equifaxFico: varchar('equifax_fico', { length: 10 }),
    transunionFico: varchar('transunion_fico', { length: 10 }),
    totalAssetsPfs: decimal('total_assets_pfs', { precision: 15, scale: 2 }),
    totalLiabilitiesPfs: decimal('total_liabilities_pfs', { precision: 15, scale: 2 }),
    netWorthPfs: decimal('net_worth_pfs', { precision: 15, scale: 2 }),
    totalIncomePfs: decimal('total_income_pfs', { precision: 15, scale: 2 }),
    totalLiabilitiesAndNetWorthPfs: decimal('total_liabilities_and_net_worth_pfs', { precision: 15, scale: 2 }),
    totalContingentLiabilitiesPfs: decimal('total_contingent_liabilities_pfs', { precision: 15, scale: 2 }),
    preQualification: varchar('pre_qualification', { length: 50 }),
    preQualificationScore: decimal('pre_qualification_score', { precision: 5, scale: 2 }),
    goHighLevelStatus: varchar('go_high_level_status', { length: 100 }),
    dcPreQualificationScore: decimal('dc_pre_qualification_score', { precision: 5, scale: 2 }),
    ccPreQualificationApprovalRate: varchar('cc_pre_qualification_approval_rate', { length: 50 }),
    creditScore: varchar('credit_score', { length: 10 }),
    openTl: varchar('open_tl', { length: 10 }),
    totalTlLimit: varchar('total_tl_limit', { length: 50 }),
    highestRevLimit: varchar('highest_rev_limit', { length: 50 }),
    ageOfOldestTl: varchar('age_of_oldest_tl', { length: 20 }),
    individualCreditUtil: varchar('individual_credit_util', { length: 10 }),
    totalCreditUtil: varchar('total_credit_util', { length: 10 }),
    inquiries: varchar('inquiries', { length: 10 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Form definitions (funding application steps)
  export const formSteps = pgTable('form_steps', {
    id: serial('id').primaryKey(),
    stepId: varchar('step_id', { length: 50 }).notNull(),
    title: varchar('title', { length: 100 }).notNull(),
    displayOrder: integer('display_order').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Form fields within steps
  export const formFields = pgTable('form_fields', {
    id: serial('id').primaryKey(),
    stepId: integer('step_id').notNull().references(() => formSteps.id),
    name: varchar('name', { length: 50 }).notNull(),
    label: varchar('label', { length: 100 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    required: boolean('required').default(false),
    options: json('options'),
    displayOrder: integer('display_order').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Assessment submissions (completed forms)
  export const assessments = pgTable('assessments', {
    id: serial('id').primaryKey(),
    assessmentId: varchar('assessment_id', { length: 50 }).notNull(),
    leadId: uuid('lead_id').references(() => leads.id),
    businessName: varchar('business_name', { length: 255 }),
    businessType: varchar('business_type', { length: 50 }),
    industry: varchar('industry', { length: 100 }),
    yearsInBusiness: varchar('years_in_business', { length: 10 }),
    numberOfEmployees: varchar('number_of_employees', { length: 10 }),
    businessAddress: varchar('business_address', { length: 255 }),
    businessCity: varchar('business_city', { length: 100 }),
    businessState: varchar('business_state', { length: 50 }),
    businessZip: varchar('business_zip', { length: 20 }),
    annualRevenue: varchar('annual_revenue', { length: 50 }),
    monthlyRevenue: varchar('monthly_revenue', { length: 50 }),
    currentDebt: varchar('current_debt', { length: 50 }),
    profitMargin: varchar('profit_margin', { length: 20 }),
    creditScore: varchar('credit_score', { length: 50 }),
    bankruptcies: varchar('bankruptcies', { length: 10 }),
    taxLiens: varchar('tax_liens', { length: 10 }),
    judgments: varchar('judgments', { length: 10 }),
    fundingAmount: varchar('funding_amount', { length: 50 }),
    fundingPurpose: varchar('funding_purpose', { length: 100 }),
    timeframe: varchar('timeframe', { length: 50 }),
    preferredTerms: varchar('preferred_terms', { length: 100 }),
    ownerName: varchar('owner_name', { length: 100 }),
    ownerEmail: varchar('owner_email', { length: 255 }),
    ownerPhone: varchar('owner_phone', { length: 50 }),
    bestTimeToContact: varchar('best_time_to_contact', { length: 50 }),
    submittedAt: timestamp('submitted_at').notNull().defaultNow(),
    status: varchar('status', { length: 50 }).default('Pending'),
    approvedAmount: varchar('approved_amount', { length: 50 }),
    interestRate: varchar('interest_rate', { length: 20 }),
    term: varchar('term', { length: 50 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Users table for authentication and portal access
  export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    twoFactorEnabled: boolean('two_factor_enabled').default(false),
    twoFactorSecret: varchar('two_factor_secret', { length: 255 }),
    lastLogin: timestamp('last_login'),
    status: varchar('status', { length: 50 }).default('active'),
    role: varchar('role', { length: 50 }).default('customer'),
    suiteUserId: varchar('suite_user_id', { length: 100 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // User sessions for maintaining login state
  export const userSessions = pgTable('user_sessions', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    token: varchar('token', { length: 255 }).notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  });
  
  // Password reset tokens
  export const passwordResetTokens = pgTable('password_reset_tokens', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    token: varchar('token', { length: 255 }).notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    used: boolean('used').default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  });
  
  // Add leadId to users table to link users to leads
  export const usersToLeads = pgTable('users_to_leads', {
    id: serial('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    leadId: uuid('lead_id').notNull().references(() => leads.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  });
  
  // Relations definitions
  export const leadsRelations = relations(leads, ({ one, many }) => ({
    notes: many(notes),
    documents: many(documents),
    additionalInfo: one(leadAdditionalInfo),
    assessments: many(assessments),
    userConnections: many(usersToLeads),
  }));
  
  export const notesRelations = relations(notes, ({ one }) => ({
    lead: one(leads, {
      fields: [notes.leadId],
      references: [leads.id],
    }),
  }));
  
  export const documentsRelations = relations(documents, ({ one }) => ({
    lead: one(leads, {
      fields: [documents.leadId],
      references: [leads.id],
    }),
  }));
  
  export const leadAdditionalInfoRelations = relations(leadAdditionalInfo, ({ one }) => ({
    lead: one(leads, {
      fields: [leadAdditionalInfo.leadId],
      references: [leads.id],
    }),
  }));
  
  export const formStepsRelations = relations(formSteps, ({ many }) => ({
    fields: many(formFields),
  }));
  
  export const formFieldsRelations = relations(formFields, ({ one }) => ({
    step: one(formSteps, {
      fields: [formFields.stepId],
      references: [formSteps.id],
    }),
  }));
  
  export const assessmentsRelations = relations(assessments, ({ one }) => ({
    lead: one(leads, {
      fields: [assessments.leadId],
      references: [leads.id],
    }),
  }));
  
  // Add user relations
  export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(userSessions),
    passwordResetTokens: many(passwordResetTokens),
    leadConnections: many(usersToLeads),
  }));
  
  export const userSessionsRelations = relations(userSessions, ({ one }) => ({
    user: one(users, {
      fields: [userSessions.userId],
      references: [users.id],
    }),
  }));
  
  export const passwordResetTokensRelations = relations(passwordResetTokens, ({ one }) => ({
    user: one(users, {
      fields: [passwordResetTokens.userId],
      references: [users.id],
    }),
  }));
  
  export const usersToLeadsRelations = relations(usersToLeads, ({ one }) => ({
    user: one(users, {
      fields: [usersToLeads.userId],
      references: [users.id],
    }),
    lead: one(leads, {
      fields: [usersToLeads.leadId],
      references: [leads.id],
    }),
  }));
  
  // Type definitions
  export type Lead = typeof leads.$inferSelect;
  export type NewLead = typeof leads.$inferInsert;
  export type Note = typeof notes.$inferSelect;
  export type NewNote = typeof notes.$inferInsert;
  export type Document = typeof documents.$inferSelect;
  export type NewDocument = typeof documents.$inferInsert;
  export type LeadAdditionalInfo = typeof leadAdditionalInfo.$inferSelect;
  export type NewLeadAdditionalInfo = typeof leadAdditionalInfo.$inferInsert;
  export type FormStep = typeof formSteps.$inferSelect;
  export type NewFormStep = typeof formSteps.$inferInsert;
  export type FormField = typeof formFields.$inferSelect;
  export type NewFormField = typeof formFields.$inferInsert;
  export type Assessment = typeof assessments.$inferSelect;
  export type NewAssessment = typeof assessments.$inferInsert;
  export type User = typeof users.$inferSelect;
  export type NewUser = typeof users.$inferInsert;
  export type UserSession = typeof userSessions.$inferSelect;
  export type NewUserSession = typeof userSessions.$inferInsert;
  export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
  export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
  export type UserToLead = typeof usersToLeads.$inferSelect;
  export type NewUserToLead = typeof usersToLeads.$inferInsert;
  
  // Lead with related data
  export type LeadWithRelatedData = Lead & {
    notes: Note[];
    documents: Document[];
    additionalInfo: LeadAdditionalInfo;
    assessments: Assessment[];
  };
  
  // Form step with fields
  export type FormStepWithFields = FormStep & {
    fields: FormField[];
  };
  
  // User with related data
  export type UserWithRelatedData = User & {
    sessions?: UserSession[];
    passwordResetTokens?: PasswordResetToken[];
    leads?: Lead[];
  };