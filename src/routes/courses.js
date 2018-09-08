const express    = require("express"),
      router     = express.Router(),
      Course     = require("../models/course"),
      Review     = require("../models/review"),
      middleware = require("../middleware")

/**
 * GET
 * /api/courses
 * 200
 * Returns the Course "_id" and "title" properties
 */
router.get("/", (req, res, next) => {
    Course.find({}, "_id title", (error, courses) => {
        if (error) return next(error)
        res.status(200).json(courses)
    })
})

/**
 * POST
 * /api/courses
 * 201
 * Creates a course, sets the Location header, and returns no content
 */
router.post("/", middleware.requiresLogin, (req, res, next) => {
    // check to see that all required fields are full
    if (req.body.title && req.body.description) {
        Course.create(req.body, error => {
            if (error) next(error)
            res.status(201).location("/").send()
        })
    }
    
    // missing a required field
    else {
        let error = new Error("All fields required")
        error.status = 400
        next(error)
    }
    
})

/**
 * GET
 * /api/courses/:id
 * 200
 * Returns all Course properties and related documents for the provided course ID
 */
router.get("/:id", (req, res, next) => {
    Course.findById(req.params.id)
          .populate("user")
          .populate("review")
          .exec((error, course) => {
              if (error || !course) next(error)
              res.status(200).json(course)
          })
})

/**
 * PUT
 * /api/courses/:id
 * 204
 * Updates a course and returns no content
 */
router.put("/:id", middleware.requiresLogin, (req, res, next) => {
    Course.update({_id: req.params.id}, {$set: req.body}, error => {
        if (error) next(error)
        res.status(204).send()
    })
})

/**
 * POST
 * /api/courses/:id/reviews
 * 201
 * Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
 */
router.post("/:id/reviews", middleware.requiresLogin, (req, res, next) => {
    Course.findById(req.params.id)
          .exec((error, course) => {
              if (error) return next(error)
              course.reviews.push(new Review(req.body)._id)
              course.save((error, course) => {
                  if (error) next(error)
                  // sets the Location header to the related course
                  res.location(`/${course.id}`).status(201).send()
              })
          })
})

module.exports = router