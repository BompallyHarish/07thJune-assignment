const mongoose= require('mongoose')

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    Location:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    }
})
const Store= mongoose.model('Store', storeSchema)
module.exports = Store