interface IAutor {
  _id: string;
  nome: string;
}

export default interface ILivro {
  id: number;
  _id: number;
  titulo: string;
  autor: string | IAutor;
  editora: string;
  numeroPaginas: number;
  imagemCapa?: string; // URL da imagem da capa do livro
}
