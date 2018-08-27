"use strict"

// load modules
const express  = require("express"),
      app      = express(),
      logger   = require("morgan"),
      mongoose = require("mongoose")

const courses = require("./routes/Courses"),
      reviews = require("./routes/Reviews"),
      users   = require("./routes/Users")

// set our port
app.set("port", process.env.PORT || 5000)

// morgan gives us http request logging
app.use(logger("dev"))

// connnect to mongoose
mongoose.connect("mongodb://localhost:27017/qa", {useNewUrlParser: true})
const db = mongoose.connection

// log connection status
db.on("error", error => console.error("connection error:", error))
db.once("open", () => console.log("db connection successful"))

// TODO add additional routes here
app.use("/api", courses)
app.use("/api", reviews)
app.use("/api", users)

// send a friendly greeting for the root route
app.get("/", (req, res) => {
    res.json({
                 message: "Welcome to the Course Review API"
             })
})

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
                             message: "Route Not Found"
                         })
})

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
                                           message: err.message,
                                           error  : {}
                                       })
})

// start listening on our port
const server = app.listen(app.get("port"), () => {
    console.log(`Express server is listening on port ${server.address().port}`)
})
