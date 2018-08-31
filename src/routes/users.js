const express = require("express"),
      router  = express.Router(),
      User    = require("../models/user")

// - GET /api/users 200 - Returns the currently authenticated user
router.get("/users", (req, res, next) => {
    res.json({sup: "bitch"})
})

// - POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
router.post("/users", (req, res, next) => {
    
    if (req.body.fullName && req.body.emailAddress && req.body.password) {
        
        const userData = {
            fullname    : req.body.fullName,
            emailAddress: req.body.emailAddress,
            password    : req.body.password
        }
        
        User.create(userData, (error, user) => {
            if (error) {
                return next(error)
            }
            else {
                return res.location("/")
            }
        })
        
        // const user = new User(req.body) // {"fullName": "John Perry", "emailAddress": "john@j-26.com", "password": "terrible1234"}
        //
        // User.authenticate(user.emailAddress, user.password, (error, user) => {
        //     if (error || !user) {
        //         let error = new Error("Wrong email or password")
        //         error.status = 401
        //         return next(error)
        //     }
        //     else {
        //         req.session.userId = user._id
        //         return res.redirect("/")
        //     }
        // })
    }
    
    // didn't include all required fields
    else {
        let error = new Error("All fields required")
        error.status = 400
        return next(error)
    }
})

module.exports = router