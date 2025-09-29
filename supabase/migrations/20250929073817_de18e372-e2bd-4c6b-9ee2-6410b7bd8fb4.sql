-- Fix security issues by adding proper search_path to functions

-- Fix hash_password function
CREATE OR REPLACE FUNCTION hash_password(password text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- For demo purposes, we're using a simple hash. In production, use proper bcrypt
  RETURN encode(digest(password || 'salt123', 'sha256'), 'hex');
END;
$$;

-- Fix is_custom_admin function  
CREATE OR REPLACE FUNCTION public.is_custom_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role = 'admin' FROM public.custom_users WHERE email = user_email),
    false
  );
$$;

-- Fix the existing is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(
      (auth.jwt() ->> 'role'::text) = 'admin'::text,
      false
    )
$$;