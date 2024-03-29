const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'Could not get user'
            })
        }

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(404).json({
            msg: 'Some thing went wrong'
        })
    }
}
const signUp = async (req, res) => {
    const { name, email, phone, password, role } = req.body

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    try {
        const user = await User.create({ name, email, phone, password: hashedPassword, role })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Could not create user'
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            msg: 'Some thing went wrong'
        })
    }
}
const signIn = async (req, res) => {
    const { email, password, _id } = req.body

    let existingUser;

    try {
        existingUser = await User.findOne({ email })
        console.log(existingUser._id.toString(), 'from signin 59');
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    if (!existingUser) {
        return res.status(404).json({ msg: 'Could not found user by this email' })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ msg: 'Incorrect Password' })
    }

    if (isPasswordCorrect) {

        const token = jwt.sign({
            userId: existingUser._id.toString()

        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({
            access_token: token,
            message: "Login success",
            user: existingUser
        })
    }
    else {
        res.status(401).json({
            error: "Authentication failed!"
        });
    }

    // return res.status(200).json({
    //     user: existingUser,

    // })
}
const updateUser = async (req, res) => {

}

module.exports = { getAllUsers, signIn, signUp }