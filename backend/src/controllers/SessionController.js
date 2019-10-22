const User = require('../models/User');

require('dotenv-safe');
var jwt = require('jsonwebtoken');

module.exports = {
    async store(req, res) {

        const { name, email, login, password } = req.body;
        
        let user = await User.findOne({ login });

        if (user){            
            return res.json({ message: 'Usuário já está cadastrado!', retorno: false });
        }

        user = await User.create({ login, name, email, login, password });

        return res.json({ user });
    },

    async authenticate(req, res){
        const { login } = req.headers;
        const { password } = req.headers;

        let user = await User.findOne({ login });

        if (!user){
            return res.json({ message: 'Login não cadastrado!', retorno: false });
        }

        if(password != user.password){
            return res.json({ message: 'Senha não confere!', retorno: false });            
        }

        return res.json({ token: "dados do token", user });
        
        //geração do token de acesso
        var token = jwt.sign(user, "node-auth", {
            expiresInMinutes: 1440 //o token irá expirar em 24 horas
        });

        //Aqui iremos retornar a informação do token via JSON:
        res.json({
            success: true,
            message: 'Token criado!!!',
            toke: token
        });


        return res.json({ message: 'Senha não confere!', retorno: false, variavel });

        //geração do token de acesso
        //auth ok
        const id = user.id; //esse id vem do banco de dados
        var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });


       
    }
};