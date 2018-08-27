"use strict"

const mongoose = require("mongoose"),
      Schema   = mongoose.Schema

const UserSchema = new Schema({
                                  fullName    : {type: String, required: true},
                                  emailAddress: {type: String, required: true},
                                  password    : {type: String, required: true}
                              })

module.exports.User = UserSchema