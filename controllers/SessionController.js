const User = require('../models/User');

module.exports = {

    async ping(req, res) {
        return res.json({ data: new Date()});
    },

    async store(req, res) {
        var name = req.query.name;
        var email = req.query.email;
        var login = req.query.login;
        var password = req.query.senha;
		
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
    }
};