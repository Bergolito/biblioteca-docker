CREATE TABLE autor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE editora (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE idioma_livro (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE imagem_livro (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL
);

CREATE TABLE livro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    autor_id INT NOT NULL REFERENCES autor(id),
    editora_id INT REFERENCES editora(id),
    idioma_id INT REFERENCES idioma_livro(id),
    imagem_id INT REFERENCES imagem_livro(id),
    edicao VARCHAR(50),
    ano INT,
    numeroPaginas INT,
    isbn VARCHAR(20)
);