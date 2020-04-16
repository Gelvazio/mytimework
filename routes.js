const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');
const PrincipalController = require('./controllers/PrincipalController');
const WebhookController = require('./controllers/WebhookController');

const routes = express.Router();

// Principal
routes.get('/',PrincipalController.index);

// Sessions
routes.post('/sessions/store', SessionController.store);
routes.post('/sessions/authenticate', SessionController.authenticate);
routes.get('/sessions/ping', SessionController.ping);

// Projects
routes.post('/projects/store', ProjectController.store);

// Times
routes.post('/times/store', TimeController.store);

// WebHooks
routes.get('/Webhooks/ping', WebhookController.ping);
routes.get('/Webhooks/index', WebhookController.index);
routes.post('/Webhooks/store', WebhookController.store);
routes.post('/Webhooks/excluiAll', WebhookController.excluiAll);
//routes.post('/Webhooks/storeResponseWebhook', WebhookController.storeResponseWebhook);

module.exports = routes;