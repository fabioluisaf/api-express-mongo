import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routesLivros = express.Router();

routesLivros.get("/livros", LivroController.listarLivros, paginar);
routesLivros.get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar);
routesLivros.get("/livros/:id", LivroController.listarLivroPorId);
routesLivros.post("/livros", LivroController.cadastrarLivros);
routesLivros.put("/livros/:id", LivroController.atualizarLivro);
routesLivros.delete("/livros/:id", LivroController.excluirLivro);

export default routesLivros;