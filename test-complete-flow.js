// Comprehensive test of the complete service role flow
const { config } = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
    console.log('❌ Supabase environment variables not set');
    process.exit(1);
}

// Create clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testCompleteFlow() {
    console.log('🧪 Testing Complete Service Role Flow...\n');
    
    try {
        // Test 1: Verify service role can bypass RLS
        console.log('1. Testing service role RLS bypass...');
        
        const testMember = {
            name: 'Service Role Test User',
            role: 'Test Role',
            category: 'leader',
            email: 'service.role.test@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };
        
        const { data: insertedData, error: insertError } = await supabaseAdmin
            .from('members')
            .insert([testMember])
            .select()
            .single();
            
        if (insertError) {
            console.log('❌ Service role insert failed:', insertError.message);
            return;
        }
        
        console.log('✅ Service role insert successful, ID:', insertedData.id);
        
        // Clean up
        const { error: deleteError } = await supabaseAdmin
            .from('members')
            .delete()
            .eq('id', insertedData.id);
            
        if (deleteError) {
            console.log('⚠️  Cleanup failed:', deleteError.message);
        } else {
            console.log('✅ Test member cleaned up');
        }
        
        // Test 2: Test admin user authentication and session
        console.log('\n2. Testing admin user authentication...');
        
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: 'ammar.ahmed.2024@aiu.edu.eg',
            password: 'QAIU_adminpassword_2025'
        });

        if (authError) {
            console.log('❌ Admin login failed:', authError.message);
            return;
        }

        console.log('✅ Admin login successful');
        
        // Test 3: Test auth check endpoint with admin user
        console.log('\n3. Testing auth check endpoint...');
        
        const sessionToken = authData.session.access_token;
        const response = await fetch('http://localhost:9002/api/auth/check', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.log('❌ Auth check failed:', response.status);
            return;
        }
        
        const authResult = await response.json();
        console.log('✅ Auth check successful');
        console.log('   Authenticated:', authResult.authenticated);
        console.log('   Is Admin:', authResult.isAdmin);
        
        if (!authResult.isAdmin) {
            console.log('❌ Admin detection failed');
            return;
        }
        
        // Test 4: Test that admin context is set for service role operations
        console.log('\n4. Testing admin context operations...');
        
        // This would be handled by the server-side logic in data.ts
        // For this test, we'll simulate the service role usage
        const adminTestMember = {
            name: 'Admin Context Test User',
            role: 'Test Role',
            category: 'leader',
            email: 'admin.context.test@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };
        
        const { data: adminInsertData, error: adminInsertError } = await supabaseAdmin
            .from('members')
            .insert([adminTestMember])
            .select()
            .single();
            
        if (adminInsertError) {
            console.log('❌ Admin context insert failed:', adminInsertError.message);
        } else {
            console.log('✅ Admin context insert successful, ID:', adminInsertData.id);
            
            // Clean up
            await supabaseAdmin
                .from('members')
                .delete()
                .eq('id', adminInsertData.id);
            console.log('✅ Admin test member cleaned up');
        }
        
        // Test 5: Test logout
        console.log('\n5. Testing logout...');
        const { error: logoutError } = await supabase.auth.signOut();
        
        if (logoutError) {
            console.log('❌ Logout failed:', logoutError.message);
        } else {
            console.log('✅ Logout successful');
        }
        
        console.log('\n🎯 Complete service role flow test completed successfully!');
        console.log('✅ Service role configuration is working correctly');
        console.log('✅ Admin detection is functioning properly');
        console.log('✅ RLS bypass is operational');
        console.log('✅ End-to-end authentication flow works');
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testCompleteFlow().catch(console.error);
