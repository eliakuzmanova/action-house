
const validator = require('validator')
const authService = require("../services/authService")
const errorUtils = require("../utils/errorUtils")

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
    const {email,firstName, lastName, password, repeatPassword } = req.body


    try {

        if(!email) {
            throw Error("Email is required")
        }
        if(!firstName) {
            throw Error("First name is required")
        }
        if(!lastName) {
            throw Error("Last name is required")
        }
        if(!password) {
            throw Error("Password is required")
        }
        if(password.length < 5){
            throw Error("Too short password")
        }
        if(!repeatPassword) {
            throw Error("Confirm password is required")
        }
        const validPass = validator.isStrongPassword(password)
        if (!validPass) {
            throw Error("Not enough strong password")
        }

        if (password !== repeatPassword) {
            throw Error("Passwords missmatch")
        }

        await authService.register(email,firstName, lastName, password)

        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
     return errorUtils.errorResponse(res, "auth/register", err, 404);
    };


}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body
    //TODO ERORR HANDLIN
    try {
        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
        return errorUtils.errorResponse(res, "auth/login", err, 404);;
    }
}


exports.getLogout = (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
}