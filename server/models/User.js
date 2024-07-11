const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: String,
    email: { type:String,
        unique:true
    },
    password: String,
    type: String,
    imageData: {
        type:String,
        default: 'https://freesvg.org/img/abstract-user-flat-4.png'
    }
});
const UserModel = mongoose.model('User', User);
module.exports = UserModel;