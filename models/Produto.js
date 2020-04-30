const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    codigo: {
        type: integer,
        required: true,
        unique: true,
    },
    descricao:String,
    started_at:String,
    ended_at: String    
});

module.exports = mongoose.model('Project', ProjectSchema);