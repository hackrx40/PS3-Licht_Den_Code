const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.connect(process.env.MONGODB_URI,connectionParameters)
.then(() => {
    console.log("Connected to database")
})
.catch((error) => {
    console.log(error)
})

module.exports = connection