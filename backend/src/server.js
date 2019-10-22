const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-dfpzp.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333);
console.log(`App Backend started on port 3333`)