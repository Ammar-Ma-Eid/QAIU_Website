const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const { supabase } = require('./src/lib/supabase');

async function testAuthStatus() {
    console.log('🧪 Testing Supabase Authentication Status...\n');
    
    // Test 1: Check current session
    console.log('1. Checking current session...');
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
        console.log('❌ Session check failed:', sessionError.message);
    } else {
        console.log('✅ Session check successful');
        console.log('   Has session:', !!sessionData.session);
        if (sessionData.session) {
            console.log('   User ID:', sessionData.session.user.id);
            console.log('   User email:', sessionData.session.user.email);
        }
    }

    // Test 2: Get user info
    console.log('\n2. Getting user information...');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
        console.log('❌ User info failed:', userError.message);
    } else {
        console.log('✅ User info successful');
        console.log('   User:', userData.user?.email);
        console.log('   Role:', userData.user?.role);
    }

    console.log('\n🎯 Authentication status test completed!');
}

testAuthStatus().catch(console.error);
