const mongoose        = require("mongoose"),
      bcrypt          = require("bcrypt")

const UserSchema = new mongoose.Schema({
                                           fullName    : {type: String},
                                           emailAddress: {type: String, required: true, unique: true},
                                           password    : {type: String, required: true}
                                       })
    

UserSchema.statics.authenticate = (emailAddress, password, callback) => {
    User.findOne({emailAddress: emailAddress})
        .exec((error, user) => {
            if (error) {
                return callback(error)
            }
            else if (!user) {
                const error = new Error("User not found!")
                error.status = 401
                return callback(error)
            }
            bcrypt.compare(password, user.password, (error, result) => {
                // `result` will return true OR false
                if (result) {
                    console.log("user found and authenticated")
                    return callback(null, user)
                }
                else {
                    return callback(error)
                }
            })
        })
}

// hash password before saving it to the db
UserSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            return next(error)
        }
        user.password = hash
        next()
    })
})

const User = mongoose.model("User", UserSchema)
module.exports = User