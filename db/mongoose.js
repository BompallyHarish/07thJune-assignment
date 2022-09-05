const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27018/zenwork', { useUnifiedTopology: true }).then(() => {
    console.log('connected to Zenwork database')
}).catch((error) => {
    console.log(error)
})