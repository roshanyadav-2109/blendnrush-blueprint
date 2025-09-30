-- Allow anonymous users to create orders
DROP POLICY IF EXISTS "Customers can create their own orders" ON public.orders;

CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Update the view policy to work for both authenticated and anonymous
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.orders;

CREATE POLICY "Customers can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.email() = customer_email);