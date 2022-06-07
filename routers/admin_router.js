const express = require('express')
const Admin = require('../models/admin_schema')
const admin_auth = require('../middlewares/admin_auth')
const router = new express.Router()

router.post('/admin/signup', async (req,res)=>{
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = admin.generateAuthtoken()
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

router.get('/admin/read', admin_auth, async(req,res)=>{
    const admin = req.admin
    try {
        res.status(200).send(admin)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/admin/update/:email', admin_auth, async(req,res)=>{
    const admin = req.body
    const email1 = req.params.email
    try {
        const admin1 = await Admin.updateOne({email: email1 },req.body, {new: true, runValidators: true })
        const admin2 = await Admin.find({email:email1})
        res.status(200).send(admin2)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/admin/delete/:email', admin_auth, async(req,res)=>{
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