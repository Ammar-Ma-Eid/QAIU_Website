// Test the auth check endpoint
const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

async function testAuthEndpoint() {
    console.log('🧪 Testing Auth Check Endpoint...\n');
    
    try {
        // Test the auth check endpoint
        console.log('1. Testing /api/auth/check endpoint...');
        const response = await fetch('http://localhost:9002/api/auth/check', {
            credentials: 'include' // Include cookies
        });

        const data = await response.json();
        
        console.log('   Status:', response.status);
        console.log('   Response:', JSON.stringify(data, null, 2));

        if (response.ok && data.authenticated) {
            console.log('✅ Auth endpoint working - User is authenticated');
        } else {
            console.log('❌ Auth endpoint working - User is NOT authenticated');
        }

    } catch (error) {
        console.log('❌ Failed to test auth endpoint:', error.message);
    }
}

testAuthEndpoint().catch(console.error);
