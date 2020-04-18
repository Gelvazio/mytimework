const mongoose = require('mongoose');
const crypto = require('crypto');

const Usuario = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    login:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique : true,
        lowercase:true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        select : true,
        set:value => crypto
                        .createHash('md5')
                        .update(value)
                        .digest('hex'),
    },
},
    {
        timestamp:false,
        toJSON:{virtuals:true,getters:true},
        toObject:{virtuals:true,getters:true},
    }
);

module.exports = mongoose.model('Usuario', Usuario);