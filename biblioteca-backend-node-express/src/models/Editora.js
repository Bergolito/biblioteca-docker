import mongoose from "mongoose";

/*
{
  "_id": ObjectId(),
  "nome": "Nome da Editora"
}
*/
const editoraSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome da editora é obrigatório"]
    }
  }
);

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;