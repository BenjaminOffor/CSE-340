const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

// Controller: build classification page
const buildByClassificationId = async function (req, res, next) {
  try {
    const classificationId = parseInt(req.params.classificationId);
    if (isNaN(classificationId)) {
      return res.status(400).render("errors/error", {
        message: "Invalid classification ID.",
      });
    }

    const data = await invModel.getInventoryByClassificationId(classificationId);
    const classificationName = data.length > 0 ? data[0].classification_name : "Vehicles";
    const grid = await utilities.buildClassificationGrid(data);

    res.render("./inventory/classification", {
      title: `${classificationName} Vehicles`,
      nav: await utilities.getNav(),
      grid,
    });
  } catch (error) {
    console.error("Error in buildByClassificationId:", error);
    next(error);
  }
};

// Controller: build vehicle detail page
const buildByInvId = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);
    if (isNaN(invId)) {
      return res.status(400).render("errors/error", {
        message: "Invalid vehicle ID.",
      });
    }

    const result = await invModel.getInventoryById(invId);
    const vehicleData = Array.isArray(result) ? result[0] : result;

    if (!vehicleData || Object.keys(vehicleData).length === 0) {
      return res.status(404).render("errors/error", {
        message: "Vehicle not found.",
      });
    }

    let vehicleContent = "";
    try {
      vehicleContent = utilities.buildVehicleDetail(vehicleData);
    } catch (buildErr) {
      console.error("Error building vehicle content:", buildErr);
      return res.status(500).render("errors/error", {
        message: "Error rendering vehicle details.",
      });
    }

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav: await utilities.getNav(),
      vehicleContent,
    });
  } catch (error) {
    console.error("Error in buildByInvId:", error);
    next(error);
  }
};

module.exports = {
  buildByClassificationId,
  buildByInvId,
};
