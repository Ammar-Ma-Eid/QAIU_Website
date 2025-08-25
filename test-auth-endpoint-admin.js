// Test script to verify auth endpoint admin detection
const { config } = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.log('❌ Supabase environment variables not set');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuthEndpointAdmin() {
    console.log('🧪 Testing Auth Endpoint Admin Detection...\n');
    
    try {
        // Test 1: Test admin user login
        console.log('1. Testing admin user login...');
        
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: 'ammar.ahmed.2024@aiu.edu.eg',
            password: 'QAIU_adminpassword_2025'
        });

        if (authError) {
            console.log('❌ Admin login failed:', authError.message);
            console.log('   Make sure the admin user exists in Supabase with the correct password');
            return;
        }

        console.log('✅ Admin login successful');
        console.log('   User ID:', authData.user.id);
        console.log('   User email:', authData.user.email);
        console.log('   Session created:', !!authData.session);

        // Test 2: Test auth check endpoint with admin session
        console.log('\n2. Testing auth check endpoint with admin session...');
        
        // Get the session token for the API call
        const sessionToken = authData.session.access_token;
        
        // Make API call to auth check endpoint
        const response = await fetch('http://localhost:9002/api/auth/check', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const authResult = await response.json();
            console.log('✅ Auth check successful');
            console.log('   Authenticated:', authResult.authenticated);
            console.log('   Is Admin:', authResult.isAdmin);
            console.log('   User email:', authResult.user?.email);
            
            if (authResult.isAdmin) {
                console.log('   ✅ Admin detection working correctly');
            } else {
                console.log('   ❌ Admin detection failed - should be true for admin user');
            }
        } else {
            console.log('❌ Auth check failed:', response.status, response.statusText);
        }
        
        // Test 3: Test logout
        console.log('\n3. Testing logout...');
        const { error: logoutError } = await supabase.auth.signOut();
        
        if (logoutError) {
            console.log('❌ Logout failed:', logoutError.message);
        } else {
            console.log('✅ Logout successful');
        }
        
        console.log('\n🎯 Auth endpoint admin test completed!');
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testAuthEndpointAdmin().catch(console.error);
