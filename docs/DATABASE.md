# PRIVATECRAFT Database & Security Architecture

## Supabase PostgreSQL Integration
PRIVATECRAFT uses Supabase for database management, authentication, storage, and serverless edge functions.

## Table Schemas
1. `profiles`: Links to `auth.users`, tracks client names, contact info, and roles (`client` vs `admin`).
2. `aircraft`: Full inventory of fleet and sales aircraft with detailed specs, pricing, gallery images, and status.
3. `booking_requests`: Flight quote requests captured from the multi-step request form.
4. `contact_messages`: General inquiries submitted via the contact form.
5. `destinations`: Key flight corridors and airport hubs.

## Row Level Security (RLS)
- Public read access is granted to non-sensitive tables (`aircraft`, `destinations`).
- Public insert access is granted to form submission endpoints (`booking_requests`, `contact_messages`).
- Strict user-isolation policies ensure clients can only view their own flight quotes and profiles.
