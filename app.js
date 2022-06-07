const express= require('express')
require('./db/mongoose')
const subUserRouter = require('./routers/subUser_router')
const adminRouter = require('./routers/admin_router')
const productRouter = require('./routers/product_router')
const storeRouter = require('./routers/store_router')
const app = express()

app.use(express.json())
app.use(subUserRouter)
app.use(adminRouter)
//app.use(productRouter)
app.use(storeRouter)

app.listen(8000,()=>{
    console.log('server listnening to port 8000')
})