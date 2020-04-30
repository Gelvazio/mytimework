const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const config = dotenv.config();

module.exports = {
    async authMidleware(req, res, next) {
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
        const { login, password } = req.body
        const user = await UserModel.find({login, password});
        const [espaco, token] = req.headers.authorization.split(' ')

        if (user.length > 0) {
            return res.status(200).json({user , token });
        }
        return res.status(401).json({'mensagem': 'Usuario não encontrado!', email});
    },

};