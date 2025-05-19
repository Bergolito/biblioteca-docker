import mongoose from "mongoose";

/*
{
  "_id": ObjectId(),
  "titulo": "Nome do Livro",
  "subtitulo": "Subtítulo do Livro",
  "autor_id": ObjectId(), // obrigatório
  "editora_id": ObjectId(), // opcional
  "idioma_id": ObjectId(), // opcional
  "imagem_id": ObjectId(), // opcional
  "edicao": "1ª",
  "ano": 2020,
  "numeroPaginas": 300,
  "isbn": "978-3-16-148410-0"
}
*/
const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    },
    subtitulo: {
      type: String,
      required: [false, "O subtítulo do livro não é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"]
    },
    // editora: {
    //   type: String,
    //   required: [true, "A editora é obrigatória"],
    //   enum: {
    //     values: ["Casa do código", "Alura","Cristiano Arcoverde Publicacoes"],
    //     message: "A editora {VALUE} não é um valor permitido."
    //   }
    // },
    editora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "editoras",
      required: [true, "A editora é obrigatória"]
    },    
    edicao: {
      type: Number,
      required: [false, "A edição não é obrigatória"],
    },
    ano: {
      type: Number,
      required: [false, "O ano de publicação não é obrigatório"],
    },
    isbn: {
      type: String,
      required: [false, "O ISBN não é obrigatório"],
      validate: {
        validator: (valor) => {
          return valor.length === 13;
        },
        message: "O ISBN deve conter 13 caracteres. Valor fornecido: {VALUE}"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;