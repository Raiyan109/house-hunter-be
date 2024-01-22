const User = require('../models/userModel.js')

const getAllUsers = async (req, res) => {
    res.send('get')
}
const signUp = async (req, res) => {
    res.send('signup')
}
const signIn = async (req, res) => {
    res.send('signin')
}
const updateUser = async (req, res) => {

}

module.exports = { getAllUsers, signIn, signUp }