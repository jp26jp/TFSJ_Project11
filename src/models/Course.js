"use strict"

const mongoose = require("mongoose"),
      Schema   = mongoose.Schema,
      User     = require("./User")

const CourseSchema = new Schema({
                                    user           : {type: User},
                                    title          : {type: String, required: true},
                                    description    : {type: String, required: true},
                                    estimatedTime  : {type: String},
                                    materialsNeeded: {type: String},
                                    steps          : {type: String},
                                    reviews        : {type: String},
                                })

module.exports.Course = CourseSchema