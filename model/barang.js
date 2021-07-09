 const mongoose = require('mongoose')

const barangSchema = mongoose.Schema({

    kodebarang:{
        type: String
    },
    namabarang:{
        type: String
    },
    hargabarang:{
        type: String
    },
    kategori:{
        type: String
    },
    deskripsi:{
        type: String
    },
    gambar:{
        type: String
    }    

})

module.exports = mongoose.model('barang', barangSchema)