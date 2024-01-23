const House = require('../models/houseModel.js')
const User = require('../models/userModel.js')
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
    const houses = await House.find(query).populate('addedBy')
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

    const house = await House.create({ name, address, phone, city, bedrooms, bathrooms, size, image, available, rent, desc, addedBy, userId: User._id })

    if (!house) {
        return res.status(400).json({ msg: 'No house can be created' })
    }

    res.status(200).json({
        success: true,
        data: house
    })
}
const getASingleHouse = async (req, res) => {

}
const updateHouse = async (req, res) => {

}
const deleteHouse = async (req, res) => {
    res.status(200).json({ msg: 'all deleted' })
}

module.exports = { getASingleHouse, getAllHouses, createHouse, updateHouse, deleteHouse }