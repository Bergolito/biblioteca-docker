import NaoEncontrado from "../erros/NaoEncontrado.js";
import { editoras } from "../models/index.js";

class EditoraController {

  static listarEditorasPaginado = async (req, res, next) => {
    try {
      const buscaEditoras = editoras.find();

      req.resultado = buscaEditoras;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarEditorasCompleto = async (req, res, next) => {
    try {

      const editoraResultado = await editoras.find().exec();

      if (editoraResultado !== null) {
        res.status(200).send(editoraResultado);
      } else {
        next(new NaoEncontrado("Id da editora não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static listarEditoraPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await editoras.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarEditora = async (req, res, next) => {
    try {

      let editora = new editoras(req.body);
      const editoraResultado = await editora.save();
      res.status(201).send(editoraResultado.toJSON());

    } catch (erro) {
      next(erro);
    }
  };

  static atualizarEditora = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const editoraResultado = await editoras.findByIdAndUpdate(id, {$set: req.body});

      if (editoraResultado !== null) {
        res.status(200).send({message: "Editora atualizada com sucesso"});
      } else {
        next(new NaoEncontrado("Id da editoria não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirEditora = async (req, res, next) => {
    try {
      const id = req.params.id;

      const editoriaResultado = await editoras.findByIdAndDelete(id);

      if (editoriaResultado !== null) {
        res.status(200).send({message: "Editora removida com sucesso"});
      } else {
        next(new NaoEncontrado("Id da editora não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarEditoraPorFiltro = async (req, res, next) => {
    console.log('listarEditoraPorFiltro => ', req.query);
    try {
      const busca = await processaBusca(req.query);
      console.log('busca => ', busca);
      
      if (busca !== null) {
        const editorasResultado = editoras.find(busca);
        req.resultado = editorasResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };

}

async function processaBusca(parametros) {
  console.log('params => ', parametros);

  const { nome } = parametros;

  let busca = {};

  if (nome) busca.nome = { $regex: nome, $options: "i" };

  return busca;
}

export default EditoraController;