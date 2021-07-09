const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username:{
        type: String
    },
    email:{
        type: String
    },
    notelp:{
        type: String
    },
    role:{
        type: String
    }, 
    password: {
        type: String 
    }

})

module.exports = mongoose.model('users', userSchema)