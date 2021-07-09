
const barang = require('../model/barang')
const response = require('../config/response')
const mongoose = require('mongoose')
const fs = require('fs')
const ObjectId = mongoose.Types.ObjectId


exports.inputdatabarang = (data, gambar) =>
    new Promise(async(resolve, reject ) => {

        const barangBaru = new barang({
            kodebarang: data.kodebarang,
            namabarang: data.namabarang,
            hargabarang: data.hargabarang,
            kategori: data.kategori,
            deskripsi: data.deskripsi,
            gambar: gambar
        })

        barang.findOne({kodebarang: data.kodebarang})
        .then(barang => {
            if (barang) {
                reject(response.commonErrorMsg('Maaf kode barang telah digunakan'))
            } else {
                barangBaru.save()
            .then(r=>{
                resolve(response.commonSuccessMsg('Berhasil menginput data'))
            }).catch(err=>{
                reject(response.commonErrorMsg('Gagal menginput data'))
            })
            }
        }).catch(err =>{
            console.log(err)
            reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server'))
        })
        
    })

exports.lihatdatabarang = (kategori) =>
new Promise(async(resolve, reject) => {
    barang.find({kategori: kategori})
            .then(result => {
                resolve(response.commonResult(result))
            }).catch(()=> {
                reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server'))   
            })
})

exports.getDataBarang = () =>
    new Promise((resolve, reject) => {
      barang.find({})
      .then(data => resolve(response.commonResult(data)))
      .catch(err => reject(response.commonError))
    })

exports.updatebarang = (id, data, changeImage) => 
new Promise(async(resolve, reject) =>{
    barang.findOne({
        _id: ObjectId(id)
        }).then((hapus) => {
        if (changeImage) {
          fs.unlinkSync(`./gambar/${hapus.gambar}`)  
        } 
        barang.updateOne(
            {_id: ObjectId(id)},data)
        .then(barang => {
            resolve(response.commonSuccessMsg('Berhasil mengubah data'))
        }).catch(err=>{
            console.log()
            reject(response.commonErrorMsg('Gagal mengubah data'))
        })
    })
})

exports.lihatdetailbarang = (kodebarang) =>
new Promise(async(resolve, reject) => {
    barang.findOne({kodebarang: kodebarang})
            .then(result => {
                resolve(response.commonResult(result))
            }).catch(()=> {
                reject(response.commonErrorMsg('Maaf terjadi kesalahan pada server'))   
            })
})

exports.hapusbarang = (_id) => 
new Promise(async (resolve, reject) =>{
    barang.findOne({
        _id: ObjectId(_id)
      }).then((hapus) => {
        fs.unlinkSync(`./gambar/${hapus.gambar}`)
        barang.remove({_id: ObjectId(_id)})
        .then(()=>{
            resolve(response.commonSuccessMsg('Berhasil menghapus data'))
        }).catch(() => {
            reject(response.commonErrorMsg('Gagal menghapus data'))
        })    
    })
})