import mongoose from "mongoose";
import { autor, autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { 
    type: mongoose.Schema.Types.String, 
    required: [true, "O titulo do livro e obrigatorio"] 
  },
  editora: { 
    type: mongoose.Schema.Types.String,
    required: [true, "A editora e obrigatoria"]
  },
  preco: { type: mongoose.Schema.Types.Number },
  paginas: { 
    type: mongoose.Schema.Types.Number,
    // min: [10, "O numero de paginas deve estar entre 10 e 50000, valor fornecido: {VALUE}"], // O {VALUE} eh trocado pelo valor fornecido pelo usuario
    // max: [50000, "O numero de paginas deve estar entre 10 e 50000, valor fornecido: {VALUE}"]
    validate: {
      validator: (valor) => { return valor >= 10 && valor <= 50000; },
      message: "O numero de paginas deve estar entre 10 e 50000. Valor fornecido: {VALUE}"
    }
  },
  autor: { 
    type: autorSchema,
    required: [true, "O(a) autor(a) e obrigatorio"],
    validate: {
      validator: validaAutor,
      message: "Id do autor nao encontrada"
    }
  }
}, { versionKey: false });

async function validaAutor(maybeAutor) {
  const id = maybeAutor._id;
  const autorEncontrado = await autor.findById(id);

  if (autorEncontrado !== null) {
    return true;
  } else {
    return false;
  }
}

const livro = mongoose.model("livros", livroSchema);

export default livro;