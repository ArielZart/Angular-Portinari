const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");


const EmpresaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        default: ""
    },
    endereco: {
        type: String
    },
    numeroEndereco: {
        type: String,
        default: ""
    },
    bairro: {
        type: String,
        default: ""
    },

    cidade: {
        type: String,
        default: ""
    },

    pais: {
        type: String,
        default: ""
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    alterAt: {
        type: Date,
        default: Date.now
    }
});

EmpresaSchema.plugin(mongoosePaginate);

mongoose.model("Empresa", EmpresaSchema);