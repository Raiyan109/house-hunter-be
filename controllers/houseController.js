const authGuard = require('../middleware/authGuard.js')
const House = require('../models/houseModel.js')
const User = require('../models/userModel.js')
const { signIn } = require('./userController.js')



const getAllHouses = async (req, res) => {
    const search = req.query.search || ''
    const city = req.query.city || ''
    const bedrooms = req.query.bedrooms || ''
    const bathrooms = req.query.bathrooms || ''
    const size = req.query.size || ''
    const rent = req.query.rent || ''


    const query = {
        name: { $regex: search, $options: 'i' }
    }

    if (city !== '') {
        query.city = city
    }
    if (bedrooms !== '') {
        query.bedrooms = bedrooms
    }
    if (bathrooms !== '') {
        query.bathrooms = bathrooms
    }
    if (size !== '') {
        query.size = size
    }
    if (rent !== '') {
        query.rent = rent
    }
    const houses = await House.find(query)
    const totalHouses = await House.countDocuments()

    if (!houses) {
        return res.status(400).json({ msg: 'No House found' })
    }

    res.status(200).json({
        success: true,
        total: totalHouses,
        data: houses
    })
}


const createHouse = async (req, res) => {
    const { name, address, phone, city, bedrooms, bathrooms, size, image, available, rent, desc, addedBy } = req.body

    let existingUser;
    try {
        existingUser = await User.findById(addedBy)
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'No User found by this id' })
    }

    const house = await House.create({ name, address, phone, city, bedrooms, bathrooms, size, image, available, rent, desc, addedBy: req.userId })
    console.log(house._id);
    if (!house) {
        return res.status(400).json({ msg: 'No house can be created' })
    }

    await User.findByIdAndUpdate(req.userId, { $push: { houses: house._id } });

    res.status(200).json({
        success: true,
        data: house
    })
}


const getHouseByUserId = async (req, res) => {
    // const userId = req.params.id

    // let userHouses;

    try {
        const user = await User.findById(req.userId).populate('houses');
        console.log(req.userId, 'from get house by user');
        console.log(user, 'from get house by user');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            success: true,
            houses: user.houses
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

module.exports = { getASingleHouse, getAllHouses, createHouse, updateHouse, deleteHouse, getHouseByUserId }