const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const invValidate = require("../utilities/inventory-validation");

/* ================================================
 * Route: Inventory by classification (e.g. /inv/type/1)
 * ================================================ */
router.get("/type/:classificationId", invController.buildByClassificationId);

/* ================================================
 * Route: Inventory detail page (e.g. /inv/detail/3)
 * ================================================ */
router.get("/detail/:invId", invController.buildByInvId);

/* ================================================
 * Route: Display Add Classification Form
 * ================================================ */
router.get("/add-classification", invController.buildAddClassification);

/* ================================================
 * Route: Process Add Classification Form Submission
 * ================================================ */
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
);

/* ================================================
 * Route: Display Add Inventory Form
 * ================================================ */
router.get("/add-inventory", invController.buildAddInventory);

/* ================================================
 * Route: Process Add Inventory Form Submission
 * ================================================ */
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
);

module.exports = router;
