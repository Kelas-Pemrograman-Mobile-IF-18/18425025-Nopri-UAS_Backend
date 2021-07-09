const userModel = require('../model/user')
const response = require('../config/response')
const bcrypt = require('bcrypt')
const { Promise } = require('mongoose')

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({username: data.username})
          .then(user => {
            if(user){
                resolve(response.commonErrorMsg('Username Sudah Terdaftar!!'))
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {
                    if(err){
                        reject(response.commonErrorMsg)
                    } else {
                        data.password = hash
                        userModel.create(data)
                        .then(()=> resolve(response.commonSuccessMsg('Berhasil registrasi')))
                        .catch(()=> reject(response.commonErrorMsg('Maaf Registrasi Gagal :( ')))
                    }
                })
            }
        }).catch(()=> reject(response.commonError))
    })

exports.login = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({
            username : data.username
        }).then(user => {
            if(user){
                if(bcrypt.compareSync(data.password, user.password)){
                    resolve(response.commonResult(user))
                } else {
                    resolve(response.commonErrorMsg('Password salah silahkan masukkan ulang password'))
                }
            } else {
                reject(response.commonErrorMsg('Username tidak ditemukan'))
            }
        })
    })