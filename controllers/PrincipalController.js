module.exports = {

    async index(req, res) {
        return res.json({ inicio : 'TELA INICIAL DO SISTEMA', data:  new Date()})
    }
};