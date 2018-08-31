const mongoose = require("mongoose")
      // User     = require("./user")

const CourseSchema = new mongoose.Schema({
                                    // user           : {type: User},
                                    title          : {type: String, required: true},
                                    description    : {type: String, required: true},
                                    estimatedTime  : {type: String},
                                    materialsNeeded: {type: String},
                                    steps          : {type: String},
                                    reviews        : {type: String},
                                })

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course