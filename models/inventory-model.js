const pool = require("../database/");

async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const result = await pool.query(sql, [inv_id]);
    const vehicle = result.rows[0];

    if (vehicle) {
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

async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE classification_id = $1";
    const result = await pool.query(sql, [classification_id]);
    return result.rows;
  } catch (error) {
    throw new Error("Database query failed");
  }
}

async function getClassifications() {
    const sql = "SELECT * FROM classification ORDER BY classification_name";
    const result = await pool.query(sql);
    return result.rows; // ✅ return only the rows array
  } 
  


async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    throw new Error("Failed to add classification");
  }
}

async function addInventoryItem({
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  classification_id
}) {
  try {
    const sql = `
      INSERT INTO inventory 
      (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      classification_id,
    ];
    return await pool.query(sql, values);
  } catch (error) {
    throw new Error("Failed to add inventory item");
  }
}


module.exports = {
  getInventoryById,
  getInventoryByClassificationId,
  getClassifications,
  addClassification,
  addInventoryItem
};
