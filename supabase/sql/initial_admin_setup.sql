-- =============================================================================
-- ColdChain 360 — Initial Administrator Account Provisioning Script
-- File: supabase/sql/initial_admin_setup.sql
-- =============================================================================
--
-- TARGET DATABASE: Supabase PostgreSQL Cloud
-- CONFIGURED PROJECT REFERENCE: ehrizksfqvnurqrecpel
-- EXPECTED HOST: db.ehrizksfqvnurqrecpel.supabase.co:5432/postgres
--
-- -----------------------------------------------------------------------------
-- PRE-EXECUTION INSTRUCTIONS & PROJECT VERIFICATION:
-- -----------------------------------------------------------------------------
-- 1. Verify you are logged into the Supabase Dashboard for the intended project:
--    - In your browser URL, confirm the project reference matches: "ehrizksfqvnurqrecpel"
--    - If you are targeting a different project environment (e.g., staging vs prod),
--      verify the schema before proceeding.
-- 2. Open the Supabase Dashboard -> SQL Editor -> New Query.
-- 3. Replace the placeholder '<REPLACE_WITH_STRONG_ADMIN_PASSWORD>' below with a
--    strong password (minimum 8 characters, at least 1 digit, at least 1 letter).
--    NEVER commit this file with a real password filled in.
-- 4. Review the SQL transaction below before clicking "Run".
--
-- -----------------------------------------------------------------------------
-- ARCHITECTURE & AUTHENTICATION CONTEXT:
-- -----------------------------------------------------------------------------
-- - This project uses FastAPI-managed JWT authentication on the "public.users" table.
-- - The FastAPI backend handles login at POST /api/v1/auth/login, verifies
--   passwords using passlib/bcrypt (rounds=12), and issues signed JWT access tokens.
-- - This project does NOT use Supabase Auth ("auth.users"). The application API
--   and UI authenticate solely via FastAPI JWT tokens verified against "public.users".
-- - A row inserted/updated in "public.users" with a valid bcrypt hash and role='admin'
--   creates a working administrator account for ColdChain 360 login.
-- - Password hashing in this script utilizes PostgreSQL's standard "pgcrypto"
--   extension via extensions.crypt(password, extensions.gen_salt('bf', 12)).
--   This produces standard Modular Crypt Format ($2a$12$...) bcrypt hashes that are
--   100% compatible with FastAPI's passlib password verification.
-- - Alternatively, the administrator can be provisioned via the project CLI:
--     $env:ADMIN_EMAIL="ops.lead@coldchain360.in"
--     $env:ADMIN_PASSWORD="<STRONG_PASSWORD>"
--     python backend/scripts/provision_admin.py
-- =============================================================================

BEGIN;

-- 1. Ensure the pgcrypto extension is active (installed in extensions schema by default in Supabase)
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 2. Provision or elevate the initial administrator account idempotently
DO $$
DECLARE
    -- Configure the target administrator identity:
    target_email CONSTANT TEXT := 'nirmalporeddiwar@gmail.com';
    admin_name CONSTANT TEXT := 'Nirmal';
    
    -- REPLACE THIS PLACEHOLDER BEFORE RUNNING:
    admin_password CONSTANT TEXT := 'Nirmal@342005april';
    
    computed_hash TEXT;
    existing_user_id INT;
    existing_user_role TEXT;
BEGIN
    -- Safety validation: Prevent executing with default placeholder or weak password
    IF admin_password = '<REPLACE_WITH_STRONG_ADMIN_PASSWORD>' THEN
        RAISE EXCEPTION 'SAFETY CHECK FAILED: You must replace <REPLACE_WITH_STRONG_ADMIN_PASSWORD> with your secure password before executing this script.';
    END IF;

    IF length(trim(admin_password)) < 8 THEN
        RAISE EXCEPTION 'SAFETY CHECK FAILED: Admin password must be at least 8 characters long.';
    END IF;

    -- Compute standard bcrypt hash with 12 cost rounds using pgcrypto
    computed_hash := extensions.crypt(admin_password, extensions.gen_salt('bf', 12));

    -- Check if target user already exists in public.users
    SELECT id, role INTO existing_user_id, existing_user_role
    FROM public.users
    WHERE lower(email) = lower(trim(target_email));

    IF existing_user_id IS NOT NULL THEN
        -- User exists: Ensure account is active and promoted to admin role
        UPDATE public.users
        SET 
            role = 'admin',
            hashed_password = computed_hash,
            full_name = COALESCE(full_name, admin_name),
            clearance_level = 'Chief Dispatcher · National Ops',
            organization = 'ColdChain 360 HQ',
            is_active = TRUE,
            updated_at = now()
        WHERE id = existing_user_id;

        RAISE NOTICE 'Administrator account for "%" (User ID: %) updated to admin role with new secure password.', target_email, existing_user_id;
    ELSE
        -- User does not exist: Insert new initial administrator account
        INSERT INTO public.users (
            email,
            hashed_password,
            role,
            full_name,
            clearance_level,
            organization,
            is_active,
            created_at,
            updated_at
        ) VALUES (
            lower(trim(target_email)),
            computed_hash,
            'admin',
            admin_name,
            'Chief Dispatcher · National Ops',
            'ColdChain 360 HQ',
            TRUE,
            now(),
            now()
        );

        RAISE NOTICE 'Initial administrator account for "%" provisioned successfully with admin role.', target_email;
    END IF;
END $$;

COMMIT;

-- =============================================================================
-- VERIFICATION QUERY (Read-Only)
-- Run immediately after the transaction to inspect the provisioned administrator.
-- Note: hashed_password prefix "$2" confirms valid standard bcrypt format.
-- =============================================================================
SELECT 
    id AS user_id,
    email,
    role,
    full_name,
    clearance_level,
    organization,
    is_active,
    created_at,
    updated_at,
    (hashed_password LIKE '$2%') AS has_valid_bcrypt_hash
FROM public.users
WHERE lower(email) = 'nirmalporeddiwar@gmail.com';
