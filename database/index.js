// Load environment variables (if using .env)
require('dotenv').config();

const { Pool } = require('pg');

// Set up the database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://your_user:your_password@localhost:5432/your_database',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Export the pool to be used in other files
module.exports = pool;
