const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")

// Trigger a server error intentionally
router.get("/", errorController.triggerError)

module.exports = router
