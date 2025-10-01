-- Add mode_of_payment column to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS mode_of_payment TEXT;

-- Add constraint to validate payment methods
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_mode_of_payment_check;

ALTER TABLE public.orders
ADD CONSTRAINT orders_mode_of_payment_check CHECK (
  mode_of_payment = ANY (
    ARRAY[
      'Credit Card'::text,
      'Debit Card'::text,
      'UPI'::text,
      'Net Banking'::text,
      'Cash on Delivery'::text
    ]
  )
);