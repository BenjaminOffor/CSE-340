const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const { body } = require("express-validator");

// ===============================
// VIEW Routes
// ===============================

// Route: Display vehicles by classification ID
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route: Display vehicle details by inventory ID
router.get("/detail/:invId", invController.buildByInvId);

// Route: Show Add Classification form
router.get("/add-classification", invController.buildAddClassification);

// Route: Show Add Inventory form
router.get("/add-inventory", invController.buildAddInventory);

// ===============================
// POST (Action) Routes
// ===============================

// Handle Add Classification form submission
router.post(
  "/add-classification",
  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required.")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Classification must contain only letters and numbers."),
  invController.addClassification
);

// Handle Add Inventory form submission
router.post(
  "/add-inventory",
  [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Valid year is required."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path is required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path is required."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative integer."),
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
    body("classification_id")
      .isInt({ min: 1 })
      .withMessage("Classification selection is required."),
  ],
  invController.addInventory
);

// Export the router
module.exports = router;
