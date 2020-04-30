const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const config = dotenv.config();

module.exports = {

    async store(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });
            if (user) {
                return res.status(400).json({message: 'Usuário já está cadastrado com este login!', retorno: false});
            }

            const result = await UserModel.create(req.body);

            // Remove a senha de usuarios para não mostrar após o mesmo ser criado
            const { password, ...users } = result.toObject()

            const token = jwt.sign({user: users.id}, process.env.SECRET, { expiresIn: 86400});
            return res.status(200).json({ users, token });
        } catch (error){
            return res.status(400).json({ 'Error on create user!': error });
        }
    },

    async login(req, res) {
        const [ hashType, hash ]  = req.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':');

        const user = await UserModel.findOne({ email });
        if(user){
            const token = jwt.sign({user: user.id}, process.env.SECRET, {expiresIn: process.env.SECRET_TIME_EXPIRES});

            return res.status(200).json({user , token });
        }

        return res.status(401).json({'mensagem':'Usuario não encontrado!'});
    },

    async delete(req, res) {
        const { login } = req.body;

        if(login) {
            const user = await UserModel.findOne({ login });
            if (user) {
                const apagou = await UserModel.remove( { login })
                return res.status(200).json({'mensagem':'Usuário removido.' + login });
            }
            return res.status(401).json({'mensagem':'Usuário não encontrado com este login:' + login});
        }
        return res.status(401).json({'mensagem': 'Informe um login!'});
    },
    async deleteAll(req, res) {
        const apagou = await UserModel.remove()
        return res.status(200).json({'message': 'Todos usuários apagados'});
    },

    async index(req, res) {
        const users = await UserModel.find();

        return res.json({users});
    },
};