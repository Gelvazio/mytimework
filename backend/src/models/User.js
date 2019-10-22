const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    name:String,        
    email: String,
    login: String,
    password: String,
});

module.exports = mongoose.model('User', UserSchema);