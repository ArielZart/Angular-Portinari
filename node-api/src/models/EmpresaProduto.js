const mongoose = require("mongoose");

const objTypeId = {
    idProduto: String,
    title: String,
    description: String
};

const EmpresaProductSchema = new mongoose.Schema({
    empresaId: {
        type: String
    },
    listProducts: [objTypeId],
    createAt: {
        type: Date,
        default: Date.now
    },
    alterAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("EmpresaProduto", EmpresaProductSchema);