const jwt = require('jsonwebtoken')
const Admin = require('../models/admin_schema')

const authRole= async (req,res,next) =>{
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token, 'thisIsZenworkAssignment')
    const admin = await Admin.findOne({_id:decoded._id, 'tokens.token': token})
    //console.log(admin)
    if(!admin){
        throw new Error()
    }

    req.token = token
    req.admin = admin

      if (req.admin.usertype !== 'admin') {
        res.status(401)
        return res.send('Not allowed')
      }
  
      next()
    
  }
  module.exports = authRole
