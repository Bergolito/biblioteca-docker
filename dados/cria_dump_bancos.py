import csv
import json

# Caminhos dos arquivos
csv_path = 'dados/biblioteca_bergson_livros.csv'
mysql_dump = 'dados/dump_biblioteca_mysql.sql'
postgres_dump = 'dados/dump_biblioteca_postgres.sql'
mongodb_dump = 'dados/dump_biblioteca_mongodb.json'

# Função para tratar valores nulos
def sql_value(val):
    return f"'{val.replace('\'', '\'\'')}'" if val else "NULL"

# Dicionários para evitar duplicidade
autores = {}
editoras = {}
idiomas = {}
imagens = {}

livros = []

with open(csv_path, encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    autor_id = 1
    editora_id = 1
    idioma_id = 1
    imagem_id = 1
    livro_id = 1

    for row in reader:
        # Autor
        nome_autor = row.get('autor', '').strip()
        if nome_autor and nome_autor not in autores:
            autores[nome_autor] = autor_id
            autor_id += 1

        # Editora
        nome_editora = row.get('editora', '').strip()
        if nome_editora and nome_editora not in editoras:
            editoras[nome_editora] = editora_id
            editora_id += 1

        # Idioma
        nome_idioma = row.get('idioma', '').strip()
        if nome_idioma and nome_idioma not in idiomas:
            idiomas[nome_idioma] = idioma_id
            idioma_id += 1

        # Imagem
        url_imagem = row.get('imagem', '').strip()
        if url_imagem and url_imagem not in imagens:
            imagens[url_imagem] = imagem_id
            imagem_id += 1

        # Livro
        livros.append({
            'id': livro_id,
            'titulo': row.get('titulo', '').strip(),
            'subtitulo': row.get('subtitulo', '').strip(),
            'autor_id': autores.get(nome_autor),
            'editora_id': editoras.get(nome_editora) if nome_editora else None,
            'idioma_id': idiomas.get(nome_idioma) if nome_idioma else None,
            'imagem_id': imagens.get(url_imagem) if url_imagem else None,
            'edicao': row.get('edicao', '').strip(),
            'ano': row.get('ano', '').strip(),
            'numeroPaginas': row.get('numeroPaginas', '').strip(),
            'isbn': row.get('isbn', '').strip()
        })
        livro_id += 1

# Gerar dump MySQL
with open(mysql_dump, 'w', encoding='utf-8') as f:
    for nome, id_ in autores.items():
        f.write(f"INSERT INTO autor (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for nome, id_ in editoras.items():
        f.write(f"INSERT INTO editora (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for nome, id_ in idiomas.items():
        f.write(f"INSERT INTO idioma_livro (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for url, id_ in imagens.items():
        f.write(f"INSERT INTO imagem_livro (id, url) VALUES ({id_}, {sql_value(url)});\n")
    for livro in livros:
        f.write(
            f"INSERT INTO livro (id, titulo, subtitulo, autor_id, editora_id, idioma_id, imagem_id, edicao, ano, numeroPaginas, isbn) VALUES ("
            f"{livro['id']}, {sql_value(livro['titulo'])}, {sql_value(livro['subtitulo'])}, {livro['autor_id']}, "
            f"{livro['editora_id'] if livro['editora_id'] else 'NULL'}, "
            f"{livro['idioma_id'] if livro['idioma_id'] else 'NULL'}, "
            f"{livro['imagem_id'] if livro['imagem_id'] else 'NULL'}, "
            f"{sql_value(livro['edicao'])}, {livro['ano'] if livro['ano'] else 'NULL'}, "
            f"{livro['numeroPaginas'] if livro['numeroPaginas'] else 'NULL'}, {sql_value(livro['isbn'])}"
            ");\n"
        )

# Gerar dump PostgreSQL
with open(postgres_dump, 'w', encoding='utf-8') as f:
    for nome, id_ in autores.items():
        f.write(f"INSERT INTO autor (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for nome, id_ in editoras.items():
        f.write(f"INSERT INTO editora (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for nome, id_ in idiomas.items():
        f.write(f"INSERT INTO idioma_livro (id, nome) VALUES ({id_}, {sql_value(nome)});\n")
    for url, id_ in imagens.items():
        f.write(f"INSERT INTO imagem_livro (id, url) VALUES ({id_}, {sql_value(url)});\n")
    for livro in livros:
        f.write(
            f"INSERT INTO livro (id, titulo, subtitulo, autor_id, editora_id, idioma_id, imagem_id, edicao, ano, numeroPaginas, isbn) VALUES ("
            f"{livro['id']}, {sql_value(livro['titulo'])}, {sql_value(livro['subtitulo'])}, {livro['autor_id']}, "
            f"{livro['editora_id'] if livro['editora_id'] else 'NULL'}, "
            f"{livro['idioma_id'] if livro['idioma_id'] else 'NULL'}, "
            f"{livro['imagem_id'] if livro['imagem_id'] else 'NULL'}, "
            f"{sql_value(livro['edicao'])}, {livro['ano'] if livro['ano'] else 'NULL'}, "
            f"{livro['numeroPaginas'] if livro['numeroPaginas'] else 'NULL'}, {sql_value(livro['isbn'])}"
            ");\n"
        )

# Gerar dump MongoDB
with open(mongodb_dump, 'w', encoding='utf-8') as f:
    # Autores
    for nome, id_ in autores.items():
        f.write(json.dumps({"_id": id_, "nome": nome}, ensure_ascii=False) + '\n')
    # Editoras
    for nome, id_ in editoras.items():
        f.write(json.dumps({"_id": id_, "nome": nome}, ensure_ascii=False) + '\n')
    # Idiomas
    for nome, id_ in idiomas.items():
        f.write(json.dumps({"_id": id_, "nome": nome}, ensure_ascii=False) + '\n')
    # Imagens
    for url, id_ in imagens.items():
        f.write(json.dumps({"_id": id_, "url": url}, ensure_ascii=False) + '\n')
    # Livros
    for livro in livros:
        doc = {
            "_id": livro['id'],
            "titulo": livro['titulo'],
            "subtitulo": livro['subtitulo'],
            "autor_id": livro['autor_id'],
            "editora_id": livro['editora_id'],
            "idioma_id": livro['idioma_id'],
            "imagem_id": livro['imagem_id'],
            "edicao": livro['edicao'],
            "ano": int(livro['ano']) if livro['ano'] else None,
            "numeroPaginas": int(livro['numeroPaginas']) if livro['numeroPaginas'] else None,
            "isbn": livro['isbn']
        }
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')

print("Dumps gerados em dados/")