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

/**route to the index page of the application
 * app.get is used to get the request from the client and then send the response back by rendering the index.ejs file.
*/
app.get('/', (req,res)=> {
  res.render('index', {title: "Home"})
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
