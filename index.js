const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const userRoutes = require('./routes/user.js');
const houseRoutes = require('./routes/house.js')
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/houses', houseRoutes)

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
