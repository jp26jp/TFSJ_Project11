"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sortAnswers = (a, b) => {
    if (a.votes === b.votes) {
        return b.updatedAt - a.updatedAt
    }
    return b.votes - a.votes
}

const AnswerSchema = new Schema({
                                    text     : String,
                                    createdAt: {type: Date, default: Date.now},
                                    updatedAt: {type: Date, default: Date.now},
                                    votes    : {type: Number, default: 0}
                                })

AnswerSchema.method("update", function (updates, cb) {
    Object.assign(this, updates, {updatedAt: new Date()})
    this.parent().save(cb)
})

AnswerSchema.method("vote", function (vote, cb) {
    if (vote === "up") this.votes++
    else this.votes--
    this.parent().save(cb)
})

const QuestionSchema = new Schema({
                                      text     : String,
                                      createdAt: {type: Date, default: Date.now},
                                      answers  : [AnswerSchema]
                                  })

QuestionSchema.pre("save", function (next) {
    this.answers.sort(sortAnswers)
    next()
})

module.exports.Question = mongoose.model("Question", QuestionSchema)