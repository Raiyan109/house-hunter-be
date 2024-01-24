const express = require('express');

const authGuard = require('../middleware/authGuard.js');
const { createBooking, getBookingByUserId, deleteBooking, updateBooking } = require('../controllers/bookingController.js');

const router = express.Router()


router.delete('/delete/:id', deleteBooking)
router.delete('/update/:id', updateBooking)
router.post('/create', authGuard, createBooking)
router.get('/user', authGuard, getBookingByUserId)


module.exports = router