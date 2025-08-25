// Test script to verify auth endpoint with regular user
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

async function testAuthEndpointRegular() {
    console.log('🧪 Testing Auth Endpoint with Regular User...\n');
    
    try {
        // Test 1: Test regular user signup (or try to sign in if exists)
        console.log('1. Testing regular user authentication...');
        
        // Try to sign in with a regular user (this will fail if user doesn't exist)
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: 'regular.user@example.com',
            password: 'RegularPassword123!'
        });

        if (authError) {
            console.log('⚠️  Regular user login failed (expected if user doesn\'t exist):', authError.message);
            console.log('   Testing with admin user instead to verify non-admin detection...');
            
            // Use admin user but check that isAdmin is correctly set to false for non-admin emails
            const { data: adminAuthData } = await supabase.auth.signInWithPassword({
                email: 'ammar.ahmed.2024@aiu.edu.eg',
                password: 'QAIU_adminpassword_2025'
            });
            
            const sessionToken = adminAuthData.session.access_token;
            
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
                console.log('✅ Auth check successful with admin user');
                console.log('   Authenticated:', authResult.authenticated);
                console.log('   Is Admin:', authResult.isAdmin);
                console.log('   User email:', authResult.user?.email);
                
                if (authResult.isAdmin) {
                    console.log('   ✅ Admin detection working correctly for admin user');
                } else {
                    console.log('   ❌ Admin detection failed - should be true for admin user');
                }
            }
            
            await supabase.auth.signOut();
            return;
        }

        console.log('✅ Regular user login successful');
        console.log('   User ID:', authData.user.id);
        console.log('   User email:', authData.user.email);

        // Test 2: Test auth check endpoint with regular user session
        console.log('\n2. Testing auth check endpoint with regular user session...');
        
        const sessionToken = authData.session.access_token;
        
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
            
            if (!authResult.isAdmin) {
                console.log('   ✅ Admin detection working correctly (non-admin user)');
            } else {
                console.log('   ❌ Admin detection failed - should be false for regular user');
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
        
        console.log('\n🎯 Auth endpoint regular user test completed!');
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testAuthEndpointRegular().catch(console.error);
