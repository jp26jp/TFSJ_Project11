const express    = require("express"),
      router     = express.Router(),
      User       = require("../models/user"),
      middleware = require("../middleware")

// - GET /api/users 200 - Returns the currently authenticated user
router.get("/users", middleware.requiresLogin, (req, res, next) => {

})

// - POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post("/users", (req, res, next) => {
    
    // check to see that all required fields are full
    if (req.body.fullName && req.body.emailAddress && req.body.password) {
        
        // create use object
        const userData = {
            fullName    : req.body.fullName,
            emailAddress: req.body.emailAddress,
            password    : req.body.password
        }
        
        // try to save new user
        User.create(userData, error => {
            if (error) {
                next(error)
            }
            else res.status(201).location("/").send()
        })
    }
    
    // didn't include all required fields
    else {
        let error = new Error("All fields required")
        error.status = 400
        next(error)
    }
})

module.exports = router