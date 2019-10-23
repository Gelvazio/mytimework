const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');

const routes = express.Router();

routes.post('/sessions/store', SessionController.store);
routes.post('/sessions/authenticate', SessionController.authenticate);

routes.post('/projects/store', ProjectController.store);
routes.post('/times/store', TimeController.store);

module.exports = routes;