const authGuard = require('../middleware/authGuard.js')
const Booking = require('../models/bookingModel.js')
const User = require('../models/userModel.js')



const getAllBookings = async (req, res) => {

}


const createBooking = async (req, res) => {
    const { name, email, bookedBy } = req.body

    let existingUser;
    try {
        existingUser = await User.findById(bookedBy)
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'No User found by this id' })
    }

    const booking = await Booking.create({ name, email, bookedBy: req.userId })
    console.log(req.userId);
    console.log(booking);
    if (!booking) {
        return res.status(400).json({ msg: 'No booking can be created' })
    }

    await User.findByIdAndUpdate(req.userId, { $push: { bookings: booking._id } });

    res.status(200).json({
        success: true,
        data: booking
    })
}


const getBookingByUserId = async (req, res) => {
    // const userId = req.params.id

    // let userHouses;

    try {
        const user = await User.findById(req.userId).populate('bookings');
        console.log(req.userId, 'from get booking by user');
        console.log(user, 'from get booking by user');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            success: true,
            bookings: user.bookings
        });

    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
}

const getASingleHouse = async (req, res) => {

}
const updateHouse = async (req, res) => {

}
const deleteHouse = async (req, res) => {
    res.status(200).json({ msg: 'all deleted' })
}

module.exports = { createBooking, getBookingByUserId }