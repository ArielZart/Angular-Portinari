const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {

    async index(req, res) {
        const { pagina = 1 } = req.query;

        const products = await Product.paginate({}, { page: pagina, limit: 10 });

        return res.json(products);
    },

    async indexById(req, res) {
        const id = req.params.id;

        const produto = await Product.findOne({ "_id": id });

        return res.json(produto);
    },

    async create(req, res) {

        const produto = await Product.create(req.body);

        return res.json(produto);
    },

    async update(req, res) {
        let id = req.params.id;
        let body = req.body;

        const produto = await Product.findByIdAndUpdate(id, body, { new: true });

        return res.json(produto);
    },
    async delete(req, res) {
        let id = req.params.id;

        await Product.findByIdAndRemove(id);

        return res.json({ sucesso: true, message: "Apagado com sucesso!!!" })
    }
};