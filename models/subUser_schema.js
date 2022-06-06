const mongoose= require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const subUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

subUserSchema.statics.findByCredentials = async (email,password)=>{
    const subuser = await SubUser.findOne({email})
    if(!subuser){
        throw new Error('email is not existing in the database')
    }
    const isMatch = await bcrypt.compare(password, subuser.password)
    if(!isMatch){
        throw new Error('password is not matching')
    }
    return subuser
}

subUserSchema.methods.generateAuthtoken = async function(){
    const subuser = this
    const token = jwt.sign({_id: subuser._id.toString()},'thisisZenworkassignment')
    subuser.tokens = subuser.tokens.concat({token})
    await subuser.save()
    return token
}

subUserSchema.pre('save', async function (next) {
    const subuser = this

    if (subuser.isModified('password')) {
        subuser.password = await bcrypt.hash(subuser.password, 8)
    }

    next()
})

const SubUser= mongoose.model('SubUser', subUserSchema)
module.exports = SubUser