const fs = require("fs");
const path = require("path");

// Path to the vehicle images folder
const vehicleImagesPath = path.join(__dirname, "public", "images", "vehicles");

// Read and list image files
fs.readdir(vehicleImagesPath, (err, files) => {
  if (err) {
    return console.error("❌ Error reading vehicle images:", err.message);
  }

  console.log("📸 Vehicle images found in /public/images/vehicles:");
  files.forEach(file => {
    console.log(" -", file);
  });
});
