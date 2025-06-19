const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const { validationResult } = require("express-validator");

/* ===============================
   Helper: Sanitize Image Paths
================================== */
function sanitizeImagePath(path) {
  if (!path) return '';
  path = path.replace(/(\/?vehicles\/)+/, 'vehicles/');
  return path.startsWith('/') ? path : '/' + path;
}

/* ===============================
   View Vehicles by Classification
================================== */
const buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  let data = await invModel.getInventoryByClassificationId(classification_id);

  // ✅ Sanitize image paths
  data = data.map(vehicle => {
    vehicle.inv_image = sanitizeImagePath(vehicle.inv_image);
    return vehicle;
  });

  const grid = await utilities.buildClassificationGrid(data);
  const className = data.length > 0 ? data[0].classification_name : "No Vehicles Found";
  const nav = await utilities.getNav();

  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ===============================
   View Individual Vehicle Detail
================================== */
const buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId;
  const data = await invModel.getInventoryById(inv_id);
  const detail = await utilities.buildDetailView(data);

  const nav = await utilities.getNav();
  const pageTitle = data ? `${data.inv_make} ${data.inv_model}` : "Vehicle Not Found";

  res.render("./inventory/detail", {
    title: pageTitle,
    nav,
    detail,
  });
};

/* ===============================
   GET: Add Classification Form
================================== */
const buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    message: null,
  });
};

/* ===============================
   POST: Add Classification Logic
================================== */
const addClassification = async function (req, res) {
  const { classification_name } = req.body;
  const nav = await utilities.getNav();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
      message: null,
    });
  }

  try {
    await invModel.addClassification(classification_name);
    req.flash("notice", `${classification_name} classification added successfully.`);
    res.redirect("/inv");
  } catch (error) {
    console.error("Classification insert failed:", error);
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Classification insert failed. Try again." }],
      message: null,
    });
  }
};

/* ===============================
   GET: Add Inventory Form
================================== */
const buildAddInventory = async function (req, res) {
  try {
    const classificationData = await invModel.getClassifications();
    const nav = await utilities.getNav();

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: classificationData.rows || [],
      errors: null,
      message: null,
    });
  } catch (error) {
    console.error("Error loading classifications:", error);
    const nav = await utilities.getNav();

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: [],
      errors: [{ msg: "Failed to load classifications." }],
      message: null,
    });
  }
};

/* ===============================
   POST: Add Inventory Logic
================================== */
const addInventory = async function (req, res) {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  const nav = await utilities.getNav();
  const classificationData = await invModel.getClassifications();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: classificationData.rows || [],
      errors: errors.array(),
      message: null,
      ...req.body,
    });
  }

  try {
    await invModel.addInventory({
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });

    req.flash("notice", `${inv_make} ${inv_model} added successfully.`);
    res.redirect("/inv");
  } catch (error) {
    console.error("Inventory insert failed:", error);
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: classificationData.rows || [],
      errors: [{ msg: "Inventory insert failed. Try again." }],
      message: null,
      ...req.body,
    });
  }
};

/* ===============================
   GET: Featured Vehicles (API)
================================== */
const getFeatured = async function (req, res) {
  try {
    let featured = await invModel.getFeaturedVehicles();

    // ✅ Sanitize image paths
    featured = featured.map(vehicle => {
      vehicle.inv_image = sanitizeImagePath(vehicle.inv_image);
      return vehicle;
    });

    res.json(featured);
  } catch (error) {
    console.error("Error fetching featured vehicles:", error);
    res.status(500).json({ error: "Failed to load featured vehicles." });
  }
};

/* ===============================
   EXPORTS
================================== */
module.exports = {
  buildByClassificationId,
  buildByInvId,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  getFeatured,
};
