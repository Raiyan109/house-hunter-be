const express = require('express');
const { getAllHouses, createHouse, getASingleHouse, updateHouse, deleteHouse, getHouseByUserId } = require('../controllers/houseController');
const authGuard = require('../middleware/authGuard.js')

const router = express.Router()

router.get('/user', authGuard, getHouseByUserId)
router.get('/', getAllHouses)
router.post('/create', authGuard, createHouse)
router.get('/:id', getASingleHouse)
router.put('/update/:id', updateHouse)
router.delete('/delete', deleteHouse)

module.exports = router