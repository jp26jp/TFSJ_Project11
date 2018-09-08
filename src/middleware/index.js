const auth = require("basic-auth"),
      User = require("../models/user")

function requiresLogin(req, res, next) {
    const credentials = auth(req)
    if (credentials === undefined) {
        let error = new Error("Missing credentials")
        error.status = 401
        next(error)
    }
    else {
        User.authenticate(credentials.name, credentials.pass, (error, user) => {
            if (error || !user) {
                let error = new Error("Wrong email or password")
                error.status = 401
                next(error)
            }
            else {
                req.session.userId = user._id
                res.status(201).location("/")
                next()
            }
        })
    }
}

module.exports.requiresLogin = requiresLogin