const express= require('express')
const Product = require('../models/product_schema')
const router = new express.Router()

router.post('/product/entry', async(req,res)=>{
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/product/read', async(req,res)=>{
    const product = req.body
    try {
        const product1 = await Product.find({category:product.category})
        res.status(200).send(product1)
    } catch (error) {
        res.status(404).send(error)
    }
})
router.patch('/product/update/:name', async(req,res)=>{
    const product = req.body
    const name = req.params.name
    try {
        const product1 = await Product.updateOne({name },req.body, {new: true, runValidators: true })
        const product2 = await Product.find({name})
        res.status(200).send(product2)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/product/delete/:name', async(req,res)=>{
    const name = req.params.name
    try {
        const product1 = await Product.deleteOne({name})
        if(!product1){
            return res.status(404).send('product is not found')
            }
        res.status(200).send(product1)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router