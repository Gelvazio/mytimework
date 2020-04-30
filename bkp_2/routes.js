const express = require('express');

const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

// Sessions - authenticate using JWT
routes.post('/sessions/authenticate', SessionController.authMidleware, SessionController.authenticate);

// Users
routes.post('/users/store', UserController.store);
routes.post('/users/login', UserController.login);
routes.delete('/users/deleteAll', UserController.deleteAll);
routes.get('/users', UserController.index);

// Projects
routes.post('/projects/store', ProjectController.store);
routes.get('/projects/index', ProjectController.index);

// Times
routes.post('/times/store', TimeController.store);
//routes.get('/times/index', TimeController.index);
//routes.get('/times/findAll', TimeController.findAll);



module.exports = routes;