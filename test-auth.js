const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const { supabase } = require('./dist/supabase.js');

async function testSupabaseAuth() {
    console.log('🧪 Testing Supabase Authentication...\n');
    
    // Test 1: Try to sign in with the user you created
    console.log('1. Testing login with ammar.ahmed.2024@aiu.edu.eg...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'ammar.ahmed.2024@aiu.edu.eg',
        password: 'QAIU_adminpassword_2025' // Using the hardcoded password from the original login
    });

    if (error) {
        console.log('❌ Login failed:', error.message);
        console.log('   Make sure the user exists in Supabase with the correct password');
        return;
    }

    console.log('✅ Login successful!');
    console.log('   User:', data.user.email);
    console.log('   Session created:', !!data.session);

    // Test 2: Get current session
    console.log('\n2. Testing session retrieval...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
        console.log('❌ Session retrieval failed:', sessionError.message);
    } else {
        console.log('✅ Session retrieved successfully');
        console.log('   Authenticated:', !!sessionData.session);
    }

    // Test 3: Sign out
    console.log('\n3. Testing logout...');
    const { error: logoutError } = await supabase.auth.signOut();
    
    if (logoutError) {
        console.log('❌ Logout failed:', logoutError.message);
    } else {
        console.log('✅ Logout successful');
    }

    console.log('\n🎯 Authentication test completed!');
}

testSupabaseAuth().catch(console.error);
