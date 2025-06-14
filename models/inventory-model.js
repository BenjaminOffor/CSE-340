const pool = require("../database/");

async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    const vehicle = result.rows[0];

    if (vehicle) {
      // Ensure image path has leading slash
      if (vehicle.inv_image && !vehicle.inv_image.startsWith("/")) {
        vehicle.inv_image = "/" + vehicle.inv_image;
      }

      if (vehicle.inv_thumbnail && !vehicle.inv_thumbnail.startsWith("/")) {
        vehicle.inv_thumbnail = "/" + vehicle.inv_thumbnail;
      }
    }

    return vehicle;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

module.exports = {
  getInventoryById,
};
