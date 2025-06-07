const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to view inventory items by classification (if already implemented)
router.get("/type/:classificationId", invController.buildByClassificationId);

// ✅ New route to view a specific vehicle's detail
router.get("/detail/:inv_id", invController.buildByInvId);

module.exports = router;
