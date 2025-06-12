/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const path = require("path");               // <-- Added
const env = require("dotenv").config();
const app = express();

// Removed this because it looks like a routes file, not static middleware
// const static = require("./routes/static");

/******************
 * View Engine and Template
 */
app.set("view engine", "ejs");
app.use(expresslayout);
app.set("layout", "layout/layout");

/* ***********************
 * Static Middleware
 *************************/
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

/* ***********************
 * Routes
 *************************/
// Use your static routes if you have any (optional)
// app.use(static);

const errorRoute = require("./routes/errorRoute");
app.use("/error", errorRoute);

/** Route to the index page of the application */
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute);

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000;   // Added default port fallback
const host = process.env.HOST || "localhost";

/* ***********************
 * Error handler middleware (Task 2)
 *************************/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong on the server.",
  });
});

/* ***********************
 * 404 handler
 *************************/
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
  });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
