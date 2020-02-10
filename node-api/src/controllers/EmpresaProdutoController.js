const mongoose = require("mongoose");

const EmpresaProduct = mongoose.model("EmpresaProduto");
const Empresa = mongoose.model("Empresa");
const Product = mongoose.model("Product");

module.exports = {
    async index(req, res) {

        const ep = await EmpresaProduct.countDocuments();

        return res.json(ep);
    },
    async indexById(req, res) {

        const id = req.params.id;

        const ep = await EmpresaProduct.findOne({ "empresaId": id });

        return res.json(ep);
    },
    async create(req, res) {
        const id = req.params.id;
        const epExist = await EmpresaProduct.findOne({ "empresaId": id });
        let newObj;
        let ep;
        if (epExist == null) {
            newObj = { empresaId: id, ...req.body }
            ep = await EmpresaProduct.create(newObj);
        } else {
            let listaProdutos = [...epExist.listProducts, ...req.body.listProducts];
            newObj = {
                empresaId: id,
                listProducts: listaProdutos
            }
            ep = await EmpresaProduct.findOneAndUpdate({ "empresaId": id }, newObj, { new: true })
        }

        return res.json(ep);
    },
    async delete(req, res) {
        const id = req.params.id;
        await EmpresaProduct.findOneAndRemove({ "empresaId": id });

        return res.json({ sucesso: true });
    }
}