const mongoose = require("mongoose")
      // User     = require("./user")

const ReviewSchema = new mongoose.Schema({
                                    // user: {type: User},
                                    postedOn: {type: Date, default: Date.now},
                                    rating : {type: Number, required: true, min: 1, max: 5},
                                    review : {type: String}
                              })

const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review