const mongoose = require("mongoose"),
      bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
                                  fullName    : {type: String, required: true},
                                  emailAddress: {type: String, required: true, unique: true},
                                  password    : {type: String, required: true}
                              })


UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email: email})
        .exec(function(error, user) {
            if (error) {
                return callback(error)
            } else if (!user) {
                const error = new Error("User not found!")
                error.status = 401
                return callback(error)
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result) {
                    return callback(null, user)
                } else {
                    return callback()
                }
            })
        })
}

// hash password before saving it to the db
UserSchema.pre("save", function(next) {
    const user = this
    bcrypt.hash(user.password, 10, function(error, hash) {
        if (error) {
            return next(error)
        }
        user.password = hash
        next()
    })
})

const User = mongoose.model("User", UserSchema)
module.exports = User