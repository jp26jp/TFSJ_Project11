"use strict"

const express = require("express"),
      router  = express.Router(),
      Users = require("../models/").User

// - GET /api/users 200 - Returns the currently authenticated user
router.get("/users", (req, res, next) => {

})

// - POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post("/users", (req, res, next) => {

})