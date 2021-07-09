const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const orderSchema = new Schema({
    username: {
        type: String
    },
    namabarang: {
        type: String
    },
    harga: {
        type: String
    },
    jumlah: {
        type: String
    },
    total: {
        type: String
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('order', orderSchema)