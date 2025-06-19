// public/js/featured.js

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("featured");

  if (!container) return;

  try {
    const response = await fetch("/inv/featured");
    const vehicles = await response.json();

    if (!Array.isArray(vehicles)) throw new Error("Invalid data format");

    container.innerHTML = vehicles
      .slice(0, 4) // Show only top 4 featured vehicles
      .map(
        (v) => `
      <div class="vehicle">
        <img src="${v.inv_image}" alt="${v.inv_make} ${v.inv_model}">
        <h3>${v.inv_make} ${v.inv_model}</h3>
        <p>$${v.inv_price.toLocaleString()}</p>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error("Failed to load featured vehicles:", err);
    container.innerHTML = "<p>Unable to load featured vehicles at this time.</p>";
  }
});
