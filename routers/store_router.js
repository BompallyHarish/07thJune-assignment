const express = require('express')
const Store = require('../models/store_schema')
const router = new express.Router()

router.post('/store/entry', async (req,res)=>{
    const store = new Store(req.body)
    try {
        await store.save()
        res.status(201).send(store)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/store/read', async(req,res)=>{
    const store = req.body
    try {
        const store1 = await Store.find({Location: store.Location})
        res.status(200).send(store1)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/store/update/:name', async(req,res)=>{
    const store = req.body
    const name = req.params.name
    try {
        const store1 = await Store.updateOne({name},req.body, {new: true, runValidators: true })
        const store2 = await Store.find({name})
        res.status(200).send(store2)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/store/delete/:Location', async(req,res)=>{
    const Location = req.params.Location
    try {
        const Location1 = await Store.deleteOne({Location})
        if(!Location1){
            return res.status(404).send('Location is not found')
            }
        res.status(200).send(Location1)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router