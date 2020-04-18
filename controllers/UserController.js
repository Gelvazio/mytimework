const UserModel = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const config = dotenv.config();

module.exports = {

    async store(req, res) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                //return res.status(400).json({message: 'Usuário já está cadastrado com este email!', retorno: false});
            }

            const result = await UserModel.create(req.body);
            // Remove a senha de usuarios para não mostrar após o mesmo ser criado
            const { password, ...users } = result.toObject()

            const token = jwt.sign({user: users.id}, process.env.SECRET, { expiresIn: process.env.SECRET_TIME_EXPIRES });

            return res.status(200).json({ users, token });
        } catch (error){
            return res.status(400).json({ 'Error on create user!': error });
        }
    },

    async update(req, res) {
        try {
            const user = await UserModel.findOne({email: req.body.email});
            if (user) {
                const name = req.body.name;
                const password4 = req.body.password;
                const login = req.body.login;
                const email = req.body.email;
                const result = await UserModel.update({ email : req.body.email }, { $set: { name :req.body.name,
                                                                                            password : req.body.password,
                                                                                            login : req.body.login,
                                                                                            email : req.body.email }});

                const token = jwt.sign({user: users.id}, process.env.SECRET, {expiresIn: process.env.SECRET_TIME_EXPIRES});

                return res.status(200).json({ user, token });
            }

            return res.status(400).json({'mensagem': 'usuario não encontrado!'});
        } catch (error) {
            return res.status(400).json({'Error on create user!': error});
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

    async index(req, res) {
        const users = await UserModel.find();
        return res.status(200).json({users});
    },

    async authenticate(req, res) {
        const users = await UserModel.find();
        return res.status(200).json({ users });
    },

    async exclui(req, res) {
        const { login } = req.body;

        if(login) {
            const apagou = await UserModel.remove( { login })
            return res.status(200).json({'mensagem':'Usuario removido.'});
        } else {
            const apagou = await UserModel.remove({})
            return res.status(200).json({'mensagem': 'Todos os usuários removidos.'});
        }
        return res.status(200).json({users});
    },
};