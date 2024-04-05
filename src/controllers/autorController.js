import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find();

      req.resultado = listaAutores;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutores(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso.", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndUpdate(id, req.body);

      if (autorResultado !== null) {
        res.status(200).json({ message: "autor atualizado" });
      } else {
        next (new NaoEncontrado("Id do Autor nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "autor excluido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor nao localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;