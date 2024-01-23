const express = require('express');
const { getAllHouses, createHouse, getASingleHouse, updateHouse, deleteHouse } = require('../controllers/houseController');


const router = express.Router()

router.get('/', getAllHouses)
router.post('/create', createHouse)
router.get('/:id', getASingleHouse)
router.put('/update/:id', updateHouse)
router.delete('/delete/:id', deleteHouse)

module.exports = router