const express    = require("express"),
      app        = express(),
      routes     = require("./routes/questions"),
      jsonParser = require("body-parser").json,
      logger     = require("morgan")

app.use(logger("dev"))
app.use(jsonParser())

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/qa", {useNewUrlParser: true})
const db = mongoose.connection

db.on("error", error => console.error("connection error:", error))
db.once("open", () => console.log("db connection successful"))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE")
        return res.status(200).json({})
    }
    next()
})

// grabs all routes that start with "/questions"
app.use("/questions", routes)

app.use((req, res, next) => {
    let error = new Error("Not Found")
    error.status = 404
    next(error)
})

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({error: {message: err.message}})
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log("Express server is listening on port", port))