const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files properly
const publicPath = path.join(__dirname, "../public"); // correct relative path

router.use(express.static(publicPath)); // Main static folder
router.use("/css", express.static(path.join(publicPath, "css")));
router.use("/js", express.static(path.join(publicPath, "js")));
router.use("/images", express.static(path.join(publicPath, "images")));

// Optional: Route to test error handling
router.get("/trigger-error", (req, res, next) => {
  try {
    throw new Error("Intentional server error");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
