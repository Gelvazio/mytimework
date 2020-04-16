module.exports = {

    async index(req, res) {
        return res.json({ inicio : 'TELA INICIAL DO SISTEMA', data:  new Date()})
    },

    async ping(req, res) {
        return res.json({ data: new Date()});
    },
};