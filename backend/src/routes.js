const express = require('express');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions/store', SessionController.store);
routes.post('/sessions/authenticate', SessionController.authenticate);

module.exports = routes;