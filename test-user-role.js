// Simple test to check user role in Supabase
const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

// Create a simple Supabase client for testing
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Supabase environment variables not set');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUserRole() {
    console.log('🧪 Testing Supabase User Role...\n');
    
    try {
        // Try to sign in with the user
        console.log('1. Attempting to sign in...');
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'ammar.ahmed.2024@aiu.edu.eg',
            password: 'QAIU_adminpassword_2025'
        });

        if (error) {
            console.log('❌ Login failed:', error.message);
            return;
        }

        console.log('✅ Login successful');
        console.log('   User ID:', data.user.id);
        console.log('   User email:', data.user.email);
        console.log('   User role:', data.user.role);

        // Check session
        console.log('\n2. Checking session...');
        const { data: sessionData } = await supabase.auth.getSession();
        console.log('   Session exists:', !!sessionData.session);

        // Try a simple query to test permissions
        console.log('\n3. Testing database access...');
        const { data: members, error: queryError } = await supabase
            .from('members')
            .select('count');

        if (queryError) {
            console.log('❌ Query failed:', queryError.message);
        } else {
            console.log('✅ Query successful');
            console.log('   Members count:', members);
        }

    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testUserRole().catch(console.error);
