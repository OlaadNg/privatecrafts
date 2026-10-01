-- ============================================================
-- PRIVATECRAFT — Assign Admin Role
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- STEP 1: Upsert the profile row and set role = 'admin'
-- This creates the profile if it doesn't exist yet, or updates
-- the existing one to grant admin access.
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'c3ed70fb-b089-4549-b07b-3effd95cd1fb',
  (SELECT email FROM auth.users WHERE id = 'c3ed70fb-b089-4549-b07b-3effd95cd1fb'),
  (SELECT COALESCE(raw_user_meta_data->>'full_name', email) FROM auth.users WHERE id = 'c3ed70fb-b089-4549-b07b-3effd95cd1fb'),
  'admin'
)
ON CONFLICT (id) DO UPDATE
  SET role = 'admin',
      updated_at = NOW();

-- STEP 2: Set role in Supabase Auth app_metadata
-- This makes user.app_metadata.role === 'admin' available
-- in the browser immediately after the next sign-in.
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE id = 'c3ed70fb-b089-4549-b07b-3effd95cd1fb';

-- STEP 3: Verify the changes
SELECT
  u.id,
  u.email,
  u.raw_app_meta_data->>'role'  AS app_meta_role,
  p.role                        AS profile_role,
  p.updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE u.id = 'c3ed70fb-b089-4549-b07b-3effd95cd1fb';
