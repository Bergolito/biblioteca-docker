import mongoose from "mongoose";

/*
  nome: string
  sobrenome: string
  nacionalidade: string
  imagem?: string
*/
const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;