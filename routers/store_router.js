const express = require('express')
const Store = require('../models/store_schema')
const auth = require('../middlewares/admin_auth')
const router = new express.Router()

router.post('/store/entry', auth, async (req,res)=>{
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
// products update is pending
router.patch('/store/update', auth, async(req,res)=>{
    const store = req.body
    const name = req.body.name

    try {
        const store1 = await Store.updateOne({name},{$set:{ available_quantity:req.body.available_quantity}}, {new: true, runValidators: true })
        console.log(req.body.available_quantity)
        console.log(store1)
        const store2 = await Store.find({'products.name':req.body.products.name})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.patch('/store/insertproduct/:name',auth, async(req,res)=>{
    const store =req.body
    try {
        const store1 = await Store.updateOne({name},{$push: req.body})
        const store2 = await Store.find({name})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete By Id
router.delete('/store/delete/:id', auth, async(req,res)=>{
    const _id = req.params.id
    try {
        const Location1 = await Store.deleteOne({_id, name: req.admin.name})
        if(!Location1){
            return res.status(404).send('Location is not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete by All
router.delete('/store/delete', auth, async(req,res)=>{
    try {
        const Location1 = await Store.deleteMany({name: req.admin.name})
        if(!Location1){
            return res.status(404).send('Location is not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router