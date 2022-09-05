const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin_router')
const storeRouter = require('./routers/store_router')
const app = express()

app.use(express.json())
app.use(adminRouter)
app.use(storeRouter)

app.listen(8000, () => {
    console.log('server listnening to port 8000')
})