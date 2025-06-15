const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

/* ===============================
   View Vehicles by Classification
================================== */
const buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);

  let className;
  if (data.length > 0) {
    className = data[0].classification_name;
  } else {
    className = "No Vehicles Found";
  }

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
  });
};

/* ===============================
   POST: Add Classification Logic
================================== */
const addClassification = async function (req, res) {
  const { classification_name } = req.body;

  try {
    await invModel.addClassification(classification_name);
    res.redirect("/inv");
  } catch (error) {
    console.error("Classification insert failed:", error);
    const nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Classification insert failed. Try again." }],
    });
  }
};

/* ===============================
   GET: Add Inventory Form
================================== */
const buildAddInventory = async function (req, res) {
  try {
    const data = await invModel.getClassifications();
    const nav = await utilities.getNav();

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: data.rows,
      errors: null,
    });
  } catch (error) {
    console.error("Error loading classifications:", error);
    const nav = await utilities.getNav();

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: [],
      errors: [{ msg: "Failed to load classifications." }],
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
    inv_description,
    inv_image,
    inv_thumbnail,
    classification_id,
  } = req.body;

  try {
    await invModel.addInventoryItem({
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      classification_id,
    });

    res.redirect("/inv");
  } catch (error) {
    console.error("Inventory insert failed:", error);
    const data = await invModel.getClassifications();
    const nav = await utilities.getNav();

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classifications: data.rows,
      errors: [{ msg: "Inventory insert failed. Try again." }],
    });
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
};
