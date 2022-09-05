const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    usertype: {
        type: String,
        lowercase: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

adminSchema.virtual('stores', {
    ref: 'Store',
    localField: '_id',
    foreignField: 'owner'
})

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })
    if (!admin) {
        throw new Error('email is not existing in the database')
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
        throw new Error('password is not matching')
    }
    return admin
}

adminSchema.methods.generateAuthtoken = async function () {
    const admin = this
    const token = jwt.sign({ _id: admin._id.toString() }, 'thisIsZenworkAssignment')
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()
    return token
}

adminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin