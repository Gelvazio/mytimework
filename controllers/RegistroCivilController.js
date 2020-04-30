const Project = require('../models/Project');

module.exports = {

    async store(req, res) {
        const { descricao, started_at, ended_at } = req.body;
        
        let project = await Project.findOne({ descricao });

        if (project){            
            return res.status(400).json({ message: 'Projeto já está cadastrado com este nome!', retorno: false });
        }

        project = await Project.create({ descricao, started_at, ended_at });

        return res.status(200).json({ project });
    },
    
    async index (req, res) {
        const projects = await Project.find();

        return res.json( { projects });
    },
    
    async listaUsuarios (req, res) {

        let url = 'https://registrocivil.org.br:8443/api/usuarios/usuario/144';

        const dados = await fetch(url, { method: 'GET',
                                         headers: {'Content-Type':'application/json',
                                                  'apikey':'7CojClx9l62Mz6SJcEHFWZfK2NtSHXgI',
                                                  'Authorization':`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ3MjFjZTRiZjEwNDRlM2RmNTQzY2E3NTI0MDk4MjUyNTQ4ZTI4NWYyOGNlZGE3NGY4NGUwMTgzOTVkYTRmY2FkNDMzY2NhOTk0MGEwN2JjIn0.eyJhdWQiOiIzIiwianRpIjoiNDcyMWNlNGJmMTA0NGUzZGY1NDNjYTc1MjQwOTgyNTI1NDhlMjg1ZjI4Y2VkYTc0Zjg0ZTAxODM5NWRhNGZjYWQ0MzNjY2E5OTQwYTA3YmMiLCJpYXQiOjE1ODgxMjQ2NzAsIm5iZiI6MTU4ODEyNDY3MCwiZXhwIjoxNjE5NjYwNjcwLCJzdWIiOiIxNDQ1NzAiLCJzY29wZXMiOltdfQ.HCy_-ta071UwEMaPf-3_DVpGXm9dPKPIt7eNSDKYIUsG993TvYFha1JRg70ZvTY-nk5y7iY6X-9itQdw-w6A7hUGjQYnIaEe9uS7adoUkudHlIwN-uwEwC_bGckYd2Hd9TN2uFgPyQWpzulIucnderwBp9XgtgfUscxPOvsrPccZyUdnMauH8vKtXvQjZziVCJ63yq2rWvBLi2QrG3ZFS55XzGs2rg0IflVkA5tdph4WW1IBLkJ6536FQBjJszov1Vuof9WLjRa9AmxmX54Sqi6XEUFTcdtMsiEpTmIySUzYKRENgeOQSbh4to-tyNLMtMwXN-AJqY9-ewFGGLplBkkXtGstFdyTVlQ5GLFdeyjWNiLgBM7e6uITEzKIoxh2MgXA-utkGU3R3INlmR5EKH9PqNNGc0f4etCceL_FKR6mrxc0rxBzBsNszCW3JxpOI__xyneppR4zWo34IPTBYGFJRdqMJ5p4n9O73nr6-fidNkoI4aLIy-HsuVGUw09AK_qxEB3MAElQfkp2VMZ_ksj-RE42t7kQ_n9r6vPTwMwNTIlRzgeHAT6WhaVN4YH2ShFLcddyoSyUIbFtWHN_Mg3NJyvvBSaKnibYiyViglgFY3vZba4AkPgX5RW5XpiHbE1D0wAsSTF-HhxYyYO97JKNH6tUiRfiqFoKMUS_5R8`
                                    }, 
                                        body: ''
                                    })
                                    .then(response => response.json())


        return dados;
        //return res.json( { projects });
    },
};