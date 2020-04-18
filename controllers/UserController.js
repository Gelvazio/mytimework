const UserModel = require('../models/Usuario');

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

            return res.status(200).json({ users });
        } catch (error){
            return res.status(400).json({ 'Error on create user!': error });
        }
    },

    async login(req, res) {
        const login  = req.body.login;
        const password  = req.body.password;

        const user = await UserModel.findOne ({ login : login });
        if (user) {
            const user_password = user.password;
            if(password != user_password){
                //return res.status(200).json({'mensagem': 'Senha inválida!', 'senha': password, 'senha_servidor':user_password});
            }
            return res.status(200).json({'mensagem': 'senha válida!'});
        } else {
            return res.status(200).json({'mensagem': 'usuario não encontrado!'});
        }
    },

    async index(req, res) {
        const users = await UserModel.find();
        return res.status(200).json({users});
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