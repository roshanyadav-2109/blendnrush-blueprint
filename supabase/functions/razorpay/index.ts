import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_KEY_ID = 'rzp_live_RNKpL8rSqMnVCt';
const RAZORPAY_KEY_SECRET = Deno.env.get('rzp_live_RNKpL8rSqMnVCt');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, orderId, amount, currency = 'INR', receipt } = await req.json();

    if (action === 'create-order') {
      console.log('Creating Razorpay order for amount:', amount);
      
      // Create Razorpay order
      const orderData = {
        amount: amount * 100, // Convert to paisa
        currency: currency,
        receipt: receipt || `order_${Date.now()}`,
      };

      const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
      
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const order = await response.json();
      
      if (!response.ok) {
        console.log('Razorpay order creation failed:', order);
        throw new Error(`Razorpay API error: ${order.error?.description || 'Unknown error'}`);
      }

      console.log('Razorpay order created successfully:', order.id);
      
      return new Response(
        JSON.stringify({ 
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: RAZORPAY_KEY_ID
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (action === 'verify-payment') {
      console.log('Verifying payment for order:', orderId);
      
      const { paymentId, signature } = await req.json();
      
      // Verify signature
      const crypto = await import('node:crypto');
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET!)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (expectedSignature === signature) {
        console.log('Payment verification successful');
        return new Response(
          JSON.stringify({ success: true, verified: true }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      } else {
        console.log('Payment verification failed');
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid signature' }), 
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }), 
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Razorpay function error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});