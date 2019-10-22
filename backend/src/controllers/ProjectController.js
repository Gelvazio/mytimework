const Project = require('../models/Project');

module.exports = {

    async store(req, res) {
        const { descricao, started_at, ended_at } = req.body;
        
        let project = await Project.findOne({ descricao });

        if (project){            
            return res.json({ message: 'Projeto já está cadastrado com este nome!', retorno: false });
        }

        project = await Project.create({ descricao, started_at, ended_at });

        return res.json({ project });
    },
};