const mongoose = require('mongoose');

const WebhookSchema = new mongoose.Schema({
    descricao:String,        
    url:String,             
    data:Date,
    body:String,           
    query:String,            
    headers:String            
});

module.exports = mongoose.model('Webhook', WebhookSchema);

/*
user_agent:String,           
    accept:String,           
    content_length:String,   
*/