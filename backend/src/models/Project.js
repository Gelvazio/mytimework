const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: Number,
    descricao:String,        
    started_at:String,        
    ended_at: String
});

module.exports = mongoose.model('Project', ProjectSchema);