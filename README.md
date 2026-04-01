# Old Boy's Association Portal

Full-stack alumni platform for Holy Ghost College Owerri.

Project root is now the OldBoys repository root (not a nested alumni_portal folder).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Auth, PostgreSQL, Storage)

## Features Included

- Email/password authentication with pending approval workflow
- Role-based access control for admin and member routes
- Voting system with one-vote-per-user-per-position constraint
- Payments backend structure (Flutterwave-ready integration point)
- Admin-managed blog (create, edit, delete, publish)
- Image upload API with WebP optimization and thumbnail generation
- SEO support (Metadata API, sitemap, robots)
- Supabase SQL schema and RLS policies

## Quick Start

1. Install dependencies:
   npm install

2. Create environment variables from .env.example:
   copy .env.example .env.local

3. Fill in Supabase values in .env.local.

4. Apply SQL in Supabase SQL editor:
   supabase/schema.sql

5. Run dev server:
   npm run dev

## Route Overview

- Public:
  - /
  - /blog
  - /blog/[slug]
- Auth:
  - /login
  - /signup
- Member (approved only):
  - /dashboard
  - /voting
  - /payments
- Pending status page:
  - /pending
- Admin only:
  - /admin
  - /admin/approvals
  - /admin/elections
  - /admin/candidates
  - /admin/blog
  - /admin/payments

## Important Notes

- New signups are auto-created in public.users as pending via database trigger.
- Admin approval is required before dashboard, voting, and payments access.
- /api/upload requires an approved admin user and uploads to the media storage bucket.
