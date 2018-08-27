"use strict"

const mongoose = require("mongoose"),
      Schema   = mongoose.Schema,
      User     = require("./User")

const ReviewSchema = new Schema({
                                    user: {type: User},
                                    postedOn: {type: Date, default: Date.now},
                                    rating : {type: Number, required: true, min: 1, max: 5},
                                    review : {type: String}
                              })

module.exports.Review = ReviewSchema