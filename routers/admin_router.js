const express = require('express')
const Admin = require('../models/admin_schema')
const {auth, authRole} = require('../middlewares/admin_auth')
const sendWelcomeEmail  = require('../emails/accounts')
const router = new express.Router()

router.post('/admin/signup', async (req,res)=>{
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = admin.generateAuthtoken()
        if(admin.usertype==='user'){
            const admins = await Admin.find({usertype:'admin'})
            const adminsEmail = admins.map(adminEmail=>{
                return { email: adminEmail.email}
            })
            for(i=0; i<adminsEmail.length ; i++){
                sendWelcomeEmail(adminsEmail[i], admin.name, admin.email, admin.password)
            }
        }
        res.status(201).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/admin/login', async(req,res)=>{ 
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = admin.generateAuthtoken()
        if(!admin){
            res.status(404).send('email or password are not matching from  the database')
        }
        res.status(200).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/admin/read', auth, async(req,res)=>{
    const admin = req.admin
    try {
        res.status(200).send(admin)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/admin/update', auth, async(req,res)=>{

    const email = req.admin.email
    console.log(email)
    try {
        const admin1 = await Admin.updateOne({email},req.body, {new: true, runValidators: true })
        const admin2 = await Admin.find({email})
        res.status(200).send(admin2)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/admin/delete/:email', auth, authRole, async(req,res)=>{
    const email = req.params.email
    try {
        const admin1 = await Admin.deleteOne({email})
        if(!admin1){
            return res.status(404).send('admin is not found')
            }
        res.status(200).send(admin1)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router