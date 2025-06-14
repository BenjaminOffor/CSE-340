const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

// Route to display vehicles by classification ID
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle details by inventory ID
router.get("/detail/:inv_id", invController.buildByInvId);

module.exports = router;
