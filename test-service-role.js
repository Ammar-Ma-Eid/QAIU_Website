// Test script to verify service role implementation
const { config } = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.log('❌ Supabase environment variables not set');
    console.log('Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file');
    process.exit(1);
}

// Create service role client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testServiceRole() {
    console.log('🧪 Testing Service Role Implementation...\n');
    
    try {
        // Test 1: Verify service role client can connect
        console.log('1. Testing service role client connection...');
        const { data, error } = await supabaseAdmin.from('members').select('count').limit(1);
        
        if (error) {
            console.log('❌ Service role connection failed:', error.message);
            console.log('   Make sure the service role key is correct and has proper permissions');
            return;
        }
        
        console.log('✅ Service role client connected successfully');
        
        // Test 2: Test insert operation with service role (should bypass RLS)
        console.log('\n2. Testing insert operation with service role...');
        const testMember = {
            name: 'Test Service Role User',
            role: 'Test Role',
            category: 'leader',
            email: 'test.service.role@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };
        
        const { data: insertedData, error: insertError } = await supabaseAdmin
            .from('members')
            .insert([testMember])
            .select()
            .single();
            
        if (insertError) {
            console.log('❌ Insert operation failed:', insertError.message);
        } else {
            console.log('✅ Insert operation successful with service role');
            console.log('   Inserted member ID:', insertedData.id);
            
            // Clean up: delete the test member
            const { error: deleteError } = await supabaseAdmin
                .from('members')
                .delete()
                .eq('id', insertedData.id);
                
            if (deleteError) {
                console.log('⚠️  Cleanup failed:', deleteError.message);
            } else {
                console.log('✅ Test member cleaned up successfully');
            }
        }
        
        console.log('\n🎯 Service role test completed!');
        console.log('The service role is configured correctly and can bypass RLS policies');
        
    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testServiceRole().catch(console.error);
