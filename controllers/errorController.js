const triggerError = (req, res, next) => {
  try {
    // Intentionally throw an error
    throw new Error("This is an intentional 500 error.")
  } catch (err) {
    next(err) // Forward to error-handling middleware
  }
}

module.exports = { triggerError }
