import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routesAutores = express.Router();

routesAutores.get("/autores", AutorController.listarAutores, paginar);
routesAutores.get("/autores/:id", AutorController.listarAutorPorId);
routesAutores.post("/autores", AutorController.cadastrarAutores);
routesAutores.put("/autores/:id", AutorController.atualizarAutor);
routesAutores.delete("/autores/:id", AutorController.excluirAutor);

export default routesAutores;