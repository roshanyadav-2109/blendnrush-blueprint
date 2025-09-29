-- Create a migration to add admin users and test accounts
-- First, create a function to hash passwords (simple for demo purposes)
CREATE OR REPLACE FUNCTION hash_password(password text)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  -- For demo purposes, we're using a simple hash. In production, use proper bcrypt
  RETURN encode(digest(password || 'salt123', 'sha256'), 'hex');
END;
$$;

-- Insert test accounts
INSERT INTO public.custom_users (email, password_hash)
VALUES 
  ('admin@blendnrush.com', hash_password('admin123')),
  ('customer@test.com', hash_password('customer123'))
ON CONFLICT (email) DO NOTHING;

-- Add a role column to distinguish between admin and customer
ALTER TABLE public.custom_users 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer';

-- Update the admin user
UPDATE public.custom_users 
SET role = 'admin' 
WHERE email = 'admin@blendnrush.com';

-- Create a function to check if user is admin using custom_users table
CREATE OR REPLACE FUNCTION public.is_custom_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT role = 'admin' FROM public.custom_users WHERE email = user_email),
    false
  );
$$;