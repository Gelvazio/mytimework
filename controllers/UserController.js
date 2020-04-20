const UserModel = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const config = dotenv.config();

module.exports = {

    async store(req, res) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({message: 'Usuário já está cadastrado com este email!', retorno: false});
            }

            const result = await UserModel.create(req.body);
            // Remove a senha de usuarios para não mostrar após o mesmo ser criado
            const { password, ...users } = result.toObject()

            // const token = jwt.sign({user: users.id}, process.env.SECRET, { expiresIn: process.env.SECRET_TIME_EXPIRES });
            const token = jwt.sign({user: users.id}, process.env.SECRET, { expiresIn: 86400 });

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

    async listall(req, res) {
        const users = await UserModel.find();
        return res.status(200).json({ users });
    },

    // autenticacao
    async authMidleware (req, res, next) {
        const [espaco, token] = req.headers.authorization.split(' ')

        try {
            const payload = await jwt.verify(token, process.env.SECRET);
            const user = await UserModel.findById(payload.user);
            if (!user) {
                return res.status(401).json({'mensagem': 'Token inválido!'});
            }

            next();
        } catch (error) {
            res.status(401).json({'Error on authMidleware()': error.toString()});
        }
    },

    async authenticate(req, res) {
        const { email } = req.body
        const user = await UserModel.find({ email });

        if(user.length > 0){
            return res.status(200).json({ user });
        }
        return res.status(401).json({ 'mensagem': 'Usuario não encontrado!', email });
    },

    async exclui(req, res) {
        const { email } = req.body;

        if(email) {
            const user = await UserModel.findOne({email});
            if (user) {
                const apagou = await UserModel.remove( { email })
                return res.status(200).json({'mensagem':'Usuário removido.' + email});
            }
            return res.status(401).json({'mensagem':'Usuário não encontrado com este email:' + email});
        }
        return res.status(401).json({'mensagem': 'Informe um email!'});
    },
};