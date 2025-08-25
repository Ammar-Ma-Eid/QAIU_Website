const { config } = require('dotenv');
const path = require('path');

// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

// Now run the test
require('./test-crud-commonjs.js');
