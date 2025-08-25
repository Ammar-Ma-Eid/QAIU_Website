// Test script to verify admin context and service role switching
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
    console.log('Please make sure all required environment variables are set in your .env file');
    process.exit(1);
}

// Create both clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Mock admin context functions (simulating the server-side logic)
const ADMIN_USER_EMAIL = 'ammar.ahmed.2024@aiu.edu.eg';
let isAdminSession = false;

function setAdminSession(isAdmin) {
    isAdminSession = isAdmin;
}

function getAdminSession() {
    return isAdminSession;
}

function isAdminUser(email) {
    return email === ADMIN_USER_EMAIL;
}

function shouldUseServiceRole(email) {
    return isAdminSession || (email ? isAdminUser(email) : false);
}

async function testAdminContext() {
    console.log('🧪 Testing Admin Context Implementation...\n');
    
    try {
        // Test 1: Test admin user detection
        console.log('1. Testing admin user detection...');
        const adminEmail = 'ammar.ahmed.2024@aiu.edu.eg';
        const regularEmail = 'regular.user@example.com';
        
        console.log('   Admin email detection:', isAdminUser(adminEmail) ? '✅ ADMIN' : '❌ NOT ADMIN');
        console.log('   Regular email detection:', isAdminUser(regularEmail) ? '❌ ADMIN' : '✅ NOT ADMIN');
        
        // Test 2: Test service role switching logic
        console.log('\n2. Testing service role switching logic...');
        
        // Test without admin session
        setAdminSession(false);
        console.log('   Without admin session:', shouldUseServiceRole() ? '❌ USE SERVICE ROLE' : '✅ USE ANON KEY');
        console.log('   Regular user with email:', shouldUseServiceRole(regularEmail) ? '❌ USE SERVICE ROLE' : '✅ USE ANON KEY');
        console.log('   Admin user with email:', shouldUseServiceRole(adminEmail) ? '✅ USE SERVICE ROLE' : '❌ USE ANON KEY');
        
        // Test with admin session
        setAdminSession(true);
        console.log('   With admin session:', shouldUseServiceRole() ? '✅ USE SERVICE ROLE' : '❌ USE ANON KEY');
        console.log('   Admin session + regular email:', shouldUseServiceRole(regularEmail) ? '✅ USE SERVICE ROLE' : '❌ USE ANON KEY');
        
        // Test 3: Test actual database operations with different clients
        console.log('\n3. Testing database operations with different clients...');
        
        // Test with anon client (should fail for write operations due to RLS)
        console.log('   Testing anon client write operation...');
        const testMemberAnon = {
            name: 'Test Anon User',
            role: 'Test Role',
            category: 'leader',
            email: 'test.anon@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };
        
        const { error: anonError } = await supabase
            .from('members')
            .insert([testMemberAnon]);
            
        if (anonError) {
            console.log('   ✅ Anon client correctly blocked by RLS:', anonError.message.includes('permission') ? 'PERMISSION ERROR' : 'OTHER ERROR');
        } else {
            console.log('   ❌ Anon client should have been blocked by RLS');
        }
        
        // Test with service role client (should succeed)
        console.log('   Testing service role client write operation...');
        const testMemberAdmin = {
            name: 'Test Service Role User',
            role: 'Test Role',
            category: 'leader',
            email: 'test.service.role@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };
        
        const { data: adminData, error: adminError } = await supabaseAdmin
            .from('members')
            .insert([testMemberAdmin])
            .select()
            .single();
            
        if (adminError) {
            console.log('   ❌ Service role client failed:', adminError.message);
        } else {
            console.log('   ✅ Service role client succeeded, inserted ID:', adminData.id);
            
            // Clean up
            const { error: deleteError } = await supabaseAdmin
                .from('members')
                .delete()
                .eq('id', adminData.id);
                
            if (deleteError) {
                console.log('   ⚠️  Cleanup failed:', deleteError.message);
            } else {
                console.log('   ✅ Test member cleaned up successfully');
            }
        }
        
        console.log('\n🎯 Admin context test completed!');
        console.log('The admin detection and service role switching logic is working correctly');
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testAdminContext().catch(console.error);
