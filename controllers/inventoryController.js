const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities/"); // assuming index.js
const buildVehicleDetail = utilities.buildVehicleDetail;

async function buildByInventoryId(req, res, next) {
  try {
    const invId = req.params.invId;
    const vehicle = await inventoryModel.getVehicleById(invId);
    
    if (!vehicle) {
      return res.status(404).render("error", { message: "Vehicle not found" });
    }

    const detailView = buildVehicleDetail(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      detailView,
    });
  } catch (error) {
    next(error); // Pass errors to middleware
  }
}

module.exports = {
  buildByInventoryId,
};
