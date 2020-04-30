const express = require('express');

const SessionController = require('./controllers/SessionController');
const ProjectController = require('./controllers/ProjectController');
const TimeController = require('./controllers/TimeController');
const UserController = require('./controllers/UserController');
const RegistroCivilController = require('./controllers/RegistroCivilController');
const ProdutoController = require('./controllers/ProdutoController');
const PessoaController = require('./controllers/PessoaController');

const routes = express.Router();

routes.get('/', function index(req, res){
    return res.json({ inicio : 'TELA INICIAL DO SISTEMA', data:  new Date()})
});

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

// Registro Civil
routes.get('/registro/usuarios', RegistroCivilController.listaUsuarios);

// Produto
routes.post('/produto/store', ProdutoController.store);
routes.get('/produto/index', ProdutoController.index);
routes.post('/produto/remove', ProdutoController.remove);

// Pessoa
routes.post('/pessoa/store',  PessoaController.store);
routes.get('/ pessoa/index',  PessoaController.index);
routes.post('/pessoa/remove', PessoaController.remove);

module.exports = routes;