const { Pool } = require("pg");
require("dotenv").config();

let pool;

// Use different SSL settings based on environment
if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// ✅ Export this one object for both environments
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      if (process.env.NODE_ENV === "development") {
        console.log("Executed query:", text);
      }
      return res;
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },
};
