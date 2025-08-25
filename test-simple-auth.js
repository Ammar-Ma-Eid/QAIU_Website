// Simple test to check if environment variables are set
console.log('🧪 Checking Supabase environment variables...\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Not set');
console.log('Supabase Key:', supabaseKey ? '✅ Set' : '❌ Not set');

if (supabaseUrl && supabaseKey) {
    console.log('\n🎯 Environment variables are properly configured!');
    console.log('   URL length:', supabaseUrl.length);
    console.log('   Key length:', supabaseKey.length);
} else {
    console.log('\n❌ Please check your .env file and ensure both variables are set:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
}
