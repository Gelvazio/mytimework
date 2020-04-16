const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');
const PrincipalController = require('./controllers/PrincipalController');
const WebhookController = require('./controllers/WebhookController');

const routes = express.Router();

//const config = require ('./utils/config.js');

const version = 1;//config.version;


// Principal
routes.get('/',PrincipalController.index);
routes.get('/ping', PrincipalController.ping);

// Sessions
routes.post('/sessions/store', SessionController.store);
routes.post('/sessions/v1/' + version + '/authenticate', SessionController.authenticate);
routes.get('/sessions/v1/findall', SessionController.findall);

// Projects
routes.post('/projects/store', ProjectController.store);
routes.get('/projects/index', ProjectController.index);
routes.get('/projects/findall', ProjectController.findall);

// Times
routes.post('/times/store', TimeController.store);
//routes.get('/times/index', TimeController.index);
//routes.get('/times/findAll', TimeController.findAll);

// WebHooks
//routes.get('/Webhooks/ping', WebhookController.ping);
routes.get('/Webhooks/index', WebhookController.index);
routes.post('/Webhooks/store', WebhookController.store);
routes.post('/Webhooks/excluiall', WebhookController.excluiall);
//routes.post('/Webhooks/storeResponseWebhook', WebhookController.storeResponseWebhook);

module.exports = routes;