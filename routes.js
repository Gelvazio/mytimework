const express = require('express');
const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');
const PrincipalController = require('./controllers/PrincipalController');
const WebhookController = require('./controllers/WebhookController');
const UserController = require('./controllers/UserController');
const jwt = require('jsonwebtoken');

const routes = express.Router();

// Principal
routes.get('/',PrincipalController.index);
routes.get('/ping', PrincipalController.ping);

// Sessions
routes.post('/sessions/store', SessionController.store);
routes.post('/sessions/v1/authenticate', SessionController.authenticate);
routes.get('/sessions/v1/findall', SessionController.findall);

// Projects
routes.post('/projects/store', ProjectController.store);
routes.get('/projects/index', ProjectController.index);

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

//Autentication using JWT
routes.post('/users/store', UserController.store);
routes.post('/users/login', UserController.login);
routes.post('/users', UserController.index);
routes.delete('/users', UserController.exclui);
routes.post('/users/update', UserController.update);

// autenticacao
const authMidleware = async (req, res, next) => {
    const [espaco, token] = req.headers.authorization.split(' ')

    try {
        const payload = await jwt.verify(token, process.env.SECRET);
        const user = await UserModel.findById(payload.user);

        return res.status(200).json({user});
    } catch (error) {
        res.status(401).json({'Erro': error.toString()});
    }
}

routes.get('/users/authenticate', authMidleware, UserController.authenticate);





module.exports = routes;