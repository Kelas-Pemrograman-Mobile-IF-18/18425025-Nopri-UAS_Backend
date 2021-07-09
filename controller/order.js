const orderModel = require('../model/order')
const mongoose = require('mongoose')
const response = require('../config/response')
const ObjectId = mongoose.Types.ObjectId

exports.input = (data) =>
new Promise((resolve, reject) =>{
    orderModel.create(data)
        .then(() => resolve(response.commonSuccessMsg('Berhasil Memesan Barang')))
        .catch(() => reject(response.commonErrorMsg('Maaf Registrasi Gagal')))
})

exports.getAllOrder = () =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "dataUser"
        }
      }
    ])
    .then((data) => {
      console.log(data)
      resolve(response.commonResult(data))
    })
    .catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal mendapatkan Data Transaksi'))
    })
  })

  exports.getOrderByUser = (username) =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $match: {
          username: username
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "username",
          foreignField: "username",
          as: "dataUser"
        }
      }
    ]).then((data) => {
      resolve(response.commonResult(data))
    }).catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal mendapatkan Data Transaksi'))
    })
  })

  exports.EditOrder = (id, data) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: ObjectId(id)
    }, {
      status: data.status
    })
    .then(() => resolve(response.commonSuccessMsg('Berhasil Merubah Data')))
    .catch((err) =>{
      console.log(err)
      reject(response.commonErrorMsg('Gagal Merubah Data'))
    })
  })
