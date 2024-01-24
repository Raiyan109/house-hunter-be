const express = require('express');
const { getAllUsers, signUp, signIn } = require('../controllers/userController');
const authGuard = require('../middleware/authGuard.js')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router