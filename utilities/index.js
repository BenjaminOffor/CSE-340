const getNav = require("./navigation"); // Adjust the path if necessary

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

function buildClassificationGrid(data) {
  let grid = '<ul id="inv-display">';
  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat().format(vehicle.inv_price)}</span>
        </div>
      </li>`;
  });
  grid += '</ul>';
  return grid;
}

module.exports = {
  getNav,
  buildClassificationGrid,
  buildVehicleDetail,
};
