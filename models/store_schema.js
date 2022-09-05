const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    Location: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true,
            trim: true

        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        available_quantity: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    }
})
const Store = mongoose.model('Store', storeSchema)
module.exports = Store