const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 2019
const dbConfig = require('./config/DbConfig')
const cors = require('cors')
const { connect } = require('mongodb')
const bodyParser = require('body-parser')
const path = require('path')

mongoose.connect(dbConfig.mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("connect mongodb"))
    .catch(err => console.log(err))
    
app.use(cors())
app.use(bodyparser.json({
        extended: true,
        limit: '50mb' 
}))

app.use(bodyparser.urlencoded({
        extended: true,
        limit: '50mb' 
}))

app.use('/gambar', express.static(path.join(__dirname, 'gambar')))
app.use('/user', require('./routes/user'))
app.use('/barang', require('./routes/barang'))
app.use('/order', require('./routes/order'))

app.listen(port, function(){
    console.log('server berjalan di port '+port)
})