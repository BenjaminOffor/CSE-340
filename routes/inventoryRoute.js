const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController"); // ✅ updated

// ✅ Route to view a specific vehicle's detail
router.get("/detail/:inv_id", invController.buildByInvId);

module.exports = router;
