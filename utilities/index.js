function buildVehicleDetail(vehicle) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(vehicle.inv_price);

  const formattedMiles = new Intl.NumberFormat("en-US").format(vehicle.inv_miles);

  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Mileage:</strong> ${formattedMiles} miles</p>
      </div>
    </section>
  `;
}

module.exports = {
  buildVehicleDetail
};
