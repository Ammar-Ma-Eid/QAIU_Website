const { createClient } = require('@supabase/supabase-js');

// Test the service role key connection
async function testServiceRole() {
    console.log('Testing Supabase Service Role connection...');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('Supabase URL:', supabaseUrl);
    console.log('Service Role Key:', serviceRoleKey); // Log the service role key
    
    if (!supabaseUrl || !serviceRoleKey) {
        console.error('Missing environment variables');
        process.exit(1);
    }
    
    try {
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
        
        // Test a simple query to verify connection
        const { data, error } = await supabaseAdmin
            .from('members')
            .select('count')
            .limit(1);
            
        if (error) {
            console.error('Service role connection failed:', error.message);
            console.error('Error details:', error);
        } else {
            console.log('Service role connection successful!');
            console.log('Response:', data);
        }
    } catch (error) {
        console.error('Unexpected error:', error.message);
    }
}

testServiceRole();
