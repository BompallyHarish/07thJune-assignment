const express = require('express')
const SubUser = require('../models/subUser_schema')
const router = new express.Router()

router.post('/subuser/signup', async (req,res)=>{
    const subuser = new SubUser(req.body)
    try {
        await subuser.save()
        const token = subuser.generateAuthtoken()
        res.status(201).send(subuser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/subuser/login', async(req,res)=>{ 
    try {
        const subuser = await SubUser.findByCredentials(req.body.email, req.body.password)
        const token = subuser.generateAuthtoken()
        if(!subuser){
            res.status(404).send('email or password are not matching from  the database')
        }
        res.status(200).send(subuser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/subuser/read', async(req,res)=>{
    const subuser = req.body
    try {
        const user =  await SubUser.find({email: subuser.email})
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/subuser/update/:email', async(req,res)=>{
    const subuser = req.body
    const email1 = req.params.email
    try {
        const user = await SubUser.updateOne({email: email1 },req.body, {new: true, runValidators: true })
        const user1 = await SubUser.find({email:email1})
        res.status(200).send(user1)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/subuser/delete/:email', async(req,res)=>{
    const email = req.params.email
    try {
        const user = await SubUser.deleteOne({email})
        if(!user){
            return res.status(404).send('Subuser is not found')
            }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})





module.exports = router