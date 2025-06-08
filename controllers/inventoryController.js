const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const buildByInvId = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id);
    const vehicleData = await invModel.getInventoryById(invId);

    if (!vehicleData) {
      return res.status(404).render("errors/error", {
        message: "Vehicle not found",
      });
    }

    const vehicleContent = utilities.buildVehicleDetail(vehicleData);

    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      vehicleContent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  buildByInvId,
};
