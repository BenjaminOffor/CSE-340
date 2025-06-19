const getNav = require("./navigation"); // Adjust the path if necessary

// Format prices nicely
function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

// ✅ Sanitize image paths to prevent broken links
function sanitizeImagePath(imagePath) {
  if (!imagePath) return "";

  // Normalize slashes (Windows compatibility)
  imagePath = imagePath.replace(/\\/g, "/");

  // Fix common errors like 'imagesvehicles/...' => 'images/vehicles/...'
  imagePath = imagePath.replace(/imagesvehicles/, "images/vehicles");

  // Collapse multiple slashes (e.g., 'images//vehicles')
  imagePath = imagePath.replace(/images\/+vehicles/, "images/vehicles");

  // Ensure it starts with a leading slash
  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath;
  }

  return imagePath;
}

// Build individual vehicle detail view
function buildVehicleDetail(vehicle) {
  const formattedPrice = formatPrice(vehicle.inv_price);
  const formattedMiles = new Intl.NumberFormat("en-US").format(vehicle.inv_miles);
  const imagePath = sanitizeImagePath(vehicle.inv_image);

  return `
    <section class="vehicle-detail">
      <img src="${imagePath}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
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

// Build the classification grid of vehicles
function buildClassificationGrid(data) {
  let grid = '<ul id="inv-display">';
  data.forEach(vehicle => {
    const formattedPrice = formatPrice(vehicle.inv_price);
    const imagePath = sanitizeImagePath(vehicle.inv_thumbnail);

    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${imagePath}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>${formattedPrice}</span>
        </div>
      </li>`;
  });
  grid += '</ul>';
  return grid;
}

module.exports = {
  getNav,
  buildClassificationGrid,
  buildVehicleDetail
};
