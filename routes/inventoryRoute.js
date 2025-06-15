const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");

// Route to display vehicles by classification ID
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to display vehicle details by inventory ID
router.get("/detail/:invId", invController.buildByInvId);

// GET: Show Add Classification form
router.get("/add-classification", invController.buildAddClassification);

// POST: Handle Add Classification form submission
router.post("/add-classification", invController.addClassification);

// GET: Show Add Inventory form
router.get("/add-inventory", invController.buildAddInventory);

// POST: Handle Add Inventory form submission
router.post("/add-inventory", invController.addInventory);

module.exports = router;
