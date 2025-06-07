/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expresslayout = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

/******************
 * View Engine and Template
 */
app.set("view engine", "ejs")
app.use(expresslayout)
app.set("layout", "layout/layout")
/* ***********************
 * Routes
 *************************/
app.use(static)

const errorRoute = require("./routes/errorRoute")
app.use("/error", errorRoute)


/**route to the index page of the application
 * app.get is used to get the request from the client and then send the response back by rendering the index.ejs file.
*/
app.get('/', (req,res)=> {
  res.render('index', {title: "Home"})
})
const inventoryRoute = require("./routes/inventoryRoute");
app.use("/inv", inventoryRoute);


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

// Error handler middleware (Task 2)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong on the server."
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).render("errors/error", {
    title: "Page Not Found",
    message: "Sorry, the page you are looking for does not exist."
  })
})

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
