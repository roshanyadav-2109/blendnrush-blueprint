import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, email, password } = await req.json();

    if (action === 'login') {
      console.log('Login attempt for:', email);
      
      // Hash the password using the same method as database
      const hashedPassword = await hashPassword(password);
      
      // Query custom_users table
      const { data: user, error } = await supabase
        .from('custom_users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', hashedPassword)
        .single();

      if (error || !user) {
        console.log('Login failed for:', email, error);
        return new Response(
          JSON.stringify({ error: 'Invalid email or password' }), 
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.log('Login successful for:', email, 'Role:', user.role);
      
      // Return user data (without password hash)
      const { password_hash, ...userData } = user;
      return new Response(
        JSON.stringify({ user: userData }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (action === 'signup') {
      console.log('Signup attempt for:', email);
      
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('custom_users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        console.log('User already exists:', email);
        return new Response(
          JSON.stringify({ error: 'User already exists' }), 
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      
      const { data: newUser, error } = await supabase
        .from('custom_users')
        .insert({
          email,
          password_hash: hashedPassword,
          role: 'customer'
        })
        .select()
        .single();

      if (error) {
        console.log('Signup failed for:', email, error);
        return new Response(
          JSON.stringify({ error: 'Failed to create account' }), 
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.log('Signup successful for:', email);
      
      // Return user data (without password hash)
      const { password_hash, ...userData } = newUser;
      return new Response(
        JSON.stringify({ user: userData }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }), 
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Auth function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Simple password hashing function (matches database function)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt123');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}