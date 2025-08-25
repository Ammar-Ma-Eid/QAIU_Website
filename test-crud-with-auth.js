// Test CRUD operations with authenticated user
const { config } = require('dotenv');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Supabase environment variables not set');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCRUDWithAuth() {
    console.log('🧪 Testing CRUD Operations with Authenticated User...\n');
    
    try {
        // First, authenticate the user
        console.log('1. Authenticating user...');
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: 'ammar.ahmed.2024@aiu.edu.eg',
            password: 'QAIU_adminpassword_2025'
        });

        if (authError) {
            console.log('❌ Authentication failed:', authError.message);
            return;
        }

        console.log('✅ Authentication successful');
        console.log('   User ID:', authData.user.id);
        console.log('   User role:', authData.user.role);

        // Test member creation
        console.log('\n2. Testing member creation...');
        const newMember = {
            name: 'Test Member',
            role: 'Test Role',
            category: 'leader',
            imageUrl: 'https://example.com/test.jpg',
            email: 'test.member@example.com',
            linkedinUrl: 'https://linkedin.com/in/test'
        };

        const { data: memberData, error: memberError } = await supabase
            .from('members')
            .insert([newMember])
            .select()
            .single();

        if (memberError) {
            console.log('❌ Member creation failed:', memberError.message);
            console.log('   Error code:', memberError.code);
        } else {
            console.log('✅ Member created successfully:', memberData);
            
            // Test member update
            console.log('\n3. Testing member update...');
            const { data: updatedMember, error: updateError } = await supabase
                .from('members')
                .update({ role: 'Senior Test Role' })
                .eq('id', memberData.id)
                .select()
                .single();

            if (updateError) {
                console.log('❌ Member update failed:', updateError.message);
            } else {
                console.log('✅ Member updated successfully:', updatedMember);
            }

            // Test member deletion
            console.log('\n4. Testing member deletion...');
            const { error: deleteError } = await supabase
                .from('members')
                .delete()
                .eq('id', memberData.id);

            if (deleteError) {
                console.log('❌ Member deletion failed:', deleteError.message);
            } else {
                console.log('✅ Member deleted successfully');
            }
        }

        // Test reading members
        console.log('\n5. Testing member reading...');
        const { data: members, error: readError } = await supabase
            .from('members')
            .select('*')
            .order('name');

        if (readError) {
            console.log('❌ Member reading failed:', readError.message);
        } else {
            console.log('✅ Members read successfully:', members.length, 'members found');
        }

    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

testCRUDWithAuth().catch(console.error);
