// Coleção: autor
{
  "_id": ObjectId(),
  "nome": "Nome do Autor"
}

// Coleção: editora
{
  "_id": ObjectId(),
  "nome": "Nome da Editora"
}

// Coleção: idioma_livro
{
  "_id": ObjectId(),
  "nome": "Português"
}

// Coleção: imagem_livro
{
  "_id": ObjectId(),
  "url": "https://exemplo.com/imagem.jpg"
}

// Coleção: livro
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