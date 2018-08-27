"use strict"

const express  = require("express"),
      router   = express.Router(),
      Question = require("../models").Question

router.param("qID", (req, res, next, id) => {
    Question.findById(id, (error, doc) => {
        if (error) return next(error)
        if (!doc) {
            error = new Error("Not Found")
            error.status = 404
            return next(error)
        }
        req.question = doc
        return next()
    })
})

router.param("aID", (req, res, next, id) => {
    req.answer = req.question.answers.id(id)
    if (!req.answer) {
        let error = new Error("Not Found")
        error.status = 404
        return next(error)
    }
    next()
})

// GET /questions
router.get("/", (req, res, next) => {
    Question.find({})
            .sort({createdAt: -1})
            .exec((error, questions) => {
                if (error) return next(error)
                res.json(questions)
            })
})

// POST /questions
router.post("/", (req, res, next) => {
    const question = new Question(req.body)
    question.save((error, question) => {
        if (error) return next(error)
        res.status(201)
        res.json(question)
    })
})

// GET /questions/:id
router.get("/:qID", (req, res, next) => {
    res.json(req.question)
})

// POST /questions/:qID/answers
router.post("/:qID/answers", (req, res, next) => {
    req.question.answers.push(req.body)
    req.question.save((error, question) => {
        if (error) return next(error)
        res.status(201)
        res.json(question)
    })
})

// PUT /questions/:id/answers/:id
router.put("/:qID/answers/:aID", (req, res, next) => {
    req.answer.update(req.body, (error, result) => {
        if (error) return next(error)
        res.json(result)
    })
})

// DELETE /questions/:id/answers/:id
router.delete("/:qID/answers/:aID", (req, res, next) => {
    req.answer.remove(error => {
        if (error) return next(error)
        req.question.save((error, question) => {
            if (error) return next(error)
            res.json(question)
        })
    })
})

// POST /questions/:id/answers/:id/vote-up
// POST /questions/:id/answers/:id/vote-down
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        let error = new Error("Not Found")
        error.status = 404
        next(error)
    }
    else {
        req.vote = req.params.dir
        next()
    }
}, (req, res, next) => {
    req.answer.vote(req.vote, (error, question) => {
        if (error) return next(error)
        res.json(question)
    })
})

module.exports = router