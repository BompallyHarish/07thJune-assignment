const express = require('express')
const Admin = require('../models/admin_schema')
const router = new express.Router()

router.post('/admin/signup', async (req,res)=>{
    console.log(req.body)
    const admin = new Admin(req.body)
    try {
        await admin.save()
        res.status(201).send(admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/admin/read', async(req,res)=>{
    const admin = req.body
    try {
        const admin1= await Admin.find({name: admin.name})
        res.status(200).send(admin1)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/admin/update/:email', async(req,res)=>{
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

router.delete('/admin/delete/:email', async(req,res)=>{
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