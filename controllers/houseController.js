const House = require('../models/houseModel.js')

const getAllHouses = async (req, res) => {
    const houses = await House.find()

    if (!houses) {
        return res.status(400).json({ msg: 'No House found' })
    }

    res.status(200).json({
        success: true,
        data: houses
    })
}
const createHouse = async (req, res) => {
    const { name, address, phone, city, bedrooms, bathrooms, size, image, available, rent, desc } = req.body

    const house = await House.create({ name, address, phone, city, bedrooms, bathrooms, size, image, available, rent, desc })

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

}

module.exports = { getASingleHouse, getAllHouses, createHouse, updateHouse, deleteHouse }