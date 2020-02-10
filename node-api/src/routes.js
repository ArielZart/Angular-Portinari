const express = require("express");

const routes = express.Router();


//Product
const ProductController = require("./controllers/ProductController");

routes.get("/produtos", ProductController.index);
routes.get("/produtos/:id", ProductController.indexById);
routes.post("/produtos", ProductController.create);
routes.put("/produtos/:id", ProductController.update);
routes.delete("/produtos/:id", ProductController.delete);

//Empresa
const EmpresaController = require("./controllers/EmpresaController");

routes.get("/empresas", EmpresaController.index);
routes.get("/empresas/:id", EmpresaController.indexById);
routes.post("/empresas", EmpresaController.create);
routes.put("/empresas/:id", EmpresaController.update);
routes.delete("/empresas/:id", EmpresaController.delete);

//EmpresaProduto
const EmpresaProdutoController = require("./controllers/EmpresaProdutoController");
routes.get("/empresas/produtos", EmpresaProdutoController.index);
routes.get("/empresas/:id/produtos", EmpresaProdutoController.indexById);
routes.post("/empresas/:id/produtos", EmpresaProdutoController.create);
routes.delete("empresas/:id/produtos", EmpresaProdutoController.delete);

module.exports = routes;