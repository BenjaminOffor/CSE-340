/*******************************************
 * Primary server file for the CSE-340 App
 *******************************************/

/* ========================
 * Required Dependencies
 ==========================*/
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config(); // Load .env variables early
const app = express();

/* ========================
 * Middleware
 ==========================*/
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Parse JSON
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

/* ========================
 * View Engine & Layout
 ==========================*/
app.set("view engine", "ejs");
app.use(expresslayout);
app.set("layout", "layouts/layout"); // default layout

/* ========================
 * Route Files
 ==========================*/
const inventoryRoute = require("./routes/inventoryRoute");
const errorRoute = require("./routes/errorRoute");

// Main routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.use("/inv", inventoryRoute);
app.use("/error", errorRoute);

/* ========================
 * 404 Handler
 ==========================*/
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist.",
  });
});

/* ========================
 * General Error Handler
 ==========================*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong on the server.",
  });
});

/* ========================
 * Server Startup
 ==========================*/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});
