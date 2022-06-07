const express = require('express')
const Store = require('../models/store_schema')
const auth = require('../middlewares/admin_auth')
const authRole = require('../middlewares/admin_auth')
const router = new express.Router()

router.post('/store/entry', auth, authRole, async (req,res)=>{
    const store = new Store({
        ...req.body,
        owner : req.admin._id
    })
    try {
        await store.save()
        res.status(201).send(store)
    } catch (error) {
        res.status(400).send(error)
    }
})

//read by Id
router.get('/store/read/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try {
        const store1 = await Store.find({_id, name: req.admin.name})
        res.status(200).send(store1)
    } catch (error) {
        res.status(404).send(error)
    }
})

// read All
router.get('/store/read', auth, async(req,res)=>{
    try {
        const store1 = await Store.find({ name: req.admin.name})
        res.status(200).send(store1)
    } catch (error) {
        res.status(404).send(error)
    }
})

// updating product details  by using Id
router.patch('/store/:id',auth, async(req,res)=>{
    const _id= req.params.id
    const store =req.body
    try {
        const store1 = await Store.updateOne({_id},req.body,{new: true, runValidators: true })
        const store2 = await Store.find({_id})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete By Id
router.delete('/store/delete/:id', auth, authRole, async(req,res)=>{
    const _id = req.params.id
    try {
        const Location1 = await Store.deleteOne({_id})
        if(!Location1){
            return res.status(404).send('Location is not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete by All
router.delete('/store/delete', auth, authRole, async(req,res)=>{

    try {
        const product1 = await Store.deleteMany({})
        if(!product1){
            return res.status(404).send('product  not found')
            }
        res.status(200).send(product1)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router