const mongoose = require("mongoose");

const Empresa = mongoose.model("Empresa");

module.exports = {

    async index(req, res) {
        const { pagina = 1 } = req.query;

        const empresa = await Empresa.paginate({}, { page: pagina, limit: 10 });

        return res.json(empresa);
    },
    async indexById(req, res) {

        const id = req.params.id;

        const empresa = await Empresa.findOne({ "_id": id });

        return res.json(empresa);
    },
    async create(req, res) {

        const empresa = await Empresa.create(req.body);

        return res.json(empresa);
    },
    async update(req, res) {
        let id = req.params.id;
        let body = req.body;

        const empresa = await Empresa.findByIdAndUpdate(id, body, { new: true });

        return res.json(empresa);
    },
    async delete(req, res) {
        let id = req.params.id;

        await Empresa.findByIdAndRemove(id);

        return res.json({ sucesso: true, message: "Apagado com sucesso!!!" })
    }
}