const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const barang = require('../controller/barang')
const { runInContext } = require('vm')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },

    destination: function (req, file, cb) {
        cb(null, './gambar')        
    }
})

var upload = multer({storage: storage}).single("gambar") 

router.post("/inputbarang", upload, (req, res) => {
    barang.inputdatabarang(req.body, req.file.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get('/databarang', (req,res) => {
    barang.getDataBarang()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/databarang/:kategori", (req, res) =>{
    barang.lihatdatabarang(req.params.kategori)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
  })

router.get('/databarang/:id', (req,res) => {
    barang.lihatdetailbarang(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete('/hapusbarang/:id', (req,res) => {
    barang.hapusbarang(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/ubah/:id', upload, (req,res) => {

    let filename;
    var changeImage = false
    if(req.file !== undefined) {
        filename = req.file.filename
        changeImage = true
      } else {
        filename = req.body.gambar
      }
      const data = Object.assign(req.body,{
        oldGambar: req.body.gambar,
        gambar: filename,
      })
    barang.updatebarang(req.params.id, data, changeImage)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})



module.exports = router 