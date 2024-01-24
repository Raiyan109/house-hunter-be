const express = require('express');

const authGuard = require('../middleware/authGuard.js');
const { createBooking, getBookingByUserId } = require('../controllers/bookingController.js');

const router = express.Router()


router.post('/create', authGuard, createBooking)
router.get('/user', authGuard, getBookingByUserId)


module.exports = router