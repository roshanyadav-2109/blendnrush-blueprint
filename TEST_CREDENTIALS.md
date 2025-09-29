# BlendNRush - Test Credentials & Features

## Test Accounts

### Admin Account
- **Email**: `admin@blendnrush.com`
- **Password**: `admin123`
- **Access**: Full admin dashboard with order management capabilities

### Customer Account  
- **Email**: `customer@test.com`
- **Password**: `customer123`
- **Access**: Customer dashboard with personal order history

## Features Implemented

### 1. Footer on All Pages ✅
- Footer component appears on all pages (Home, Product, Auth, Policy pages)
- Consistent branding and links across the application

### 2. Custom Authentication System ✅
- Uses `custom_users` table instead of Supabase Auth
- Custom edge function at `/auth` handles login/signup
- Session management via localStorage
- Role-based access control (admin/customer)

### 3. Admin Dashboard ✅
- **Stats Section**: Total Orders & Total Revenue
- **Full Orders Table**: All customer orders with editable status
- **Order Management**: Update order status via dropdown
- **Search, Sort, Pagination**: Full table functionality

### 4. Customer Dashboard ✅
- **Personal Orders Only**: Filtered by customer email
- **Read-Only Status**: Order status display only (not editable)
- **Order History**: Complete order details and tracking

### 5. Razorpay Integration ✅
- **Key ID**: `rzp_live_RNKpL8rSqMnVCt` (configured)
- **Key Secret**: Stored securely in edge function environment
- **Edge Function**: `/razorpay` handles payment creation and verification
- **Ready for Integration**: Payment flow ready to be integrated in components

## Edge Functions

### `/auth` Function
- Handles login/signup with custom_users table
- Password hashing with SHA-256
- Returns user data with role information

### `/razorpay` Function  
- Creates Razorpay orders
- Verifies payment signatures
- Secure API key management

## Database Schema

### `custom_users` Table
- `id` (bigint, primary key)
- `email` (text, unique)
- `password_hash` (text) 
- `role` (text, default: 'customer')
- `created_at` (timestamp)

### `orders` Table
- Complete order management with RLS policies
- Customer email-based access control
- Admin-only status updates

## Usage Instructions

1. **Navigate to `/auth`** to see the login page
2. **Use test credentials** provided above
3. **Admin users** see all orders and can update status
4. **Customers** see only their own orders (read-only)
5. **Footer links** work on all pages for policies
6. **Razorpay** ready for payment integration when needed

## Security Features

- Row Level Security (RLS) policies on all tables
- Secure password hashing
- Role-based access control  
- Protected edge functions
- Input validation and error handling