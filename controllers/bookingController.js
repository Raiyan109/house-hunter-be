const Booking = require('../models/bookingModel.js')
const User = require('../models/userModel.js')



const getAllBookings = async (req, res) => {

}


const createBooking = async (req, res) => {
    const { name, email, bookedBy, bookingsList } = req.body

    let existingUser;
    try {
        existingUser = await User.findById(bookedBy)
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'No User found by this id' })
    }



    const booking = await Booking.create({ name, email, bookedBy: req.userId, bookingsList })

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
const updateBooking = async (req, res) => {
    try {
        const id = req.params.id
        const { name, status } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({
                msg: `No task with id :${id}`
            });

        const task = await Task.findByIdAndUpdate(id, {
            name,
            status
        })

        if (!task) {
            return res.status(400).json({ msg: 'No Task can be updated' })
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Updated',
            data: task
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
}
const deleteBooking = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        // if (!mongoose.Types.ObjectId.isValid(id))
        //     return res.status(404).json({
        //         msg: `No booking with id :${id}`
        //     });
        const booking = await Booking.findByIdAndDelete(id)

        if (!booking) {
            return res.status(400).json({ msg: 'No booking can be deleted' })
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Deleted'
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong' })
    }
}

module.exports = { createBooking, getBookingByUserId, deleteBooking, updateBooking }