const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const buildByInvId = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);
    const vehicleData = await invModel.getInventoryById(invId);

    if (!vehicleData) {
      const err = new Error("Vehicle not found");
      err.status = 404;
      throw err;
    }

    const htmlContent = utilities.buildVehicleDetail(vehicleData);

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      vehicleContent: htmlContent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buildByInvId,
  // buildByClassificationId // You may already have this
};
