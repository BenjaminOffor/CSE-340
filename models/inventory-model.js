const pool = require("../database/"); // adjust if your DB pool file path is different

async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Database query failed");
  }
}

module.exports = {
  getInventoryById,
};
