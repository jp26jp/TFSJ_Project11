const express = require("express"),
      router  = express.Router(),
      Course = require("../models/course")

// - GET /api/courses 200 - Returns the Course "_id" and "title" properties
router.get("/courses", (req, res, next) => {
    console.log("Hello")
})

// - POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
router.post("/courses", (req, res, next) => {

})

// - GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID
router.get("/course/:courseId", (req, res, next) => {

})

// - PUT /api/courses/:courseId 204 - Updates a course and returns no content
router.put("/courses/:courseId", (req, res, next) => {

})

// - POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post("/courses/:courseId/reviews", (req, res, next) => {

})

module.exports = router