const jwt = require('jsonwebtoken')
const Admin = require('../models/admin_schema')

const auth = async (req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'thisIsZenworkAssignment')
        const admin = await Admin.findOne({_id:decoded._id, 'tokens.token': token})
        //console.log(admin)
        if(!admin){
            throw new Error()
        }
    
        req.token = token
        req.admin = admin
        next()
    } catch (error) {
        res.status(401).send({error: 'please Aunthenticate'})
    }
}

module.exports = auth