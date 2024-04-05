import { livro, autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {

  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if(livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivros(req, res, next) {
    const novoLivro = req.body;
    
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      let livroCompleto;

      if (novoLivro.autor && !autorEncontrado) {
        const autorNaoEncontrado = { _id: novoLivro.autor, nome: "Nao Encontrado"};
        livroCompleto = { ...novoLivro, autor: autorNaoEncontrado};
      } else {
        livroCompleto = autorEncontrado ? { ...novoLivro, autor: { ...autorEncontrado._doc }} : { ...novoLivro};
      }

      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);
      
      if(livroResultado !== null) {
        res.status(200).json({ message: "livro atualizado" });
      } else {
        next(new NaoEncontrado("Id do livro nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);

      if(livroEncontrado !== null) {
        res.status(200).json({ message: "livro excluido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro nao localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const objBusca = await montaObjBusca(req.query);
      const livrosPorFiltro = livro.find(objBusca);

      req.resultado = livrosPorFiltro;
      
      next();
    } catch (erro) {
      next(erro);
    }
  }
}

async function montaObjBusca(params) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = params;
  const objBusca = {};

  if (editora) objBusca.editora = editora;
  if (titulo) objBusca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas) objBusca.paginas = { $gte: minPaginas};
  if (maxPaginas) objBusca.paginas = { ...objBusca.paginas, $lte: maxPaginas};
  if (nomeAutor) {
    const nomeAutorRegex = { $regex: nomeAutor, $options: "i" }; 
    objBusca.autor = await autor.findOne({ nome: nomeAutorRegex});
  }

  return objBusca;
}

export default LivroController;