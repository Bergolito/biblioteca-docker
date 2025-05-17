import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import ILivro from "../../../interfaces/ILivro"

interface IAutor {
    _id: string;
    nome: string;
}

// Estendendo a interface ILivro para incluir o autor como objeto
interface ILivroCompleto extends Omit<ILivro, 'autor'> {
    autor: IAutor | string;
}

const FormularioLivro = () => {

    const parametros = useParams()
    const [autores, setAutores] = useState<IAutor[]>([])

    const API_URL = process.env.REACT_APP_API_URL
    console.log('API_URL => ',API_URL)

    useEffect(() => {
        http.get<IAutor[]>(API_URL+'/autores')
            .then(resposta => {
                setAutores(resposta.data)
            })
    }, [])

    useEffect(() => {
        if (parametros.id) {
            http.get<ILivroCompleto>(API_URL+`/livros/${parametros.id}`)
                .then(resposta => {
                    setTitulo(resposta.data.titulo)
                    
                    // Verifica se autor é um objeto ou string
                    if (typeof resposta.data.autor === 'object' && resposta.data.autor !== null) {
                        setAutor(resposta.data.autor._id)
                    } else {
                        setAutor(resposta.data.autor as string)
                    }
                    
                    setEditora(resposta.data.editora)
                    setNumeroPaginas(''+resposta.data.numeroPaginas)
                })
        }
    }, [parametros])

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        console.log('Submit => ',parametros);

        if (parametros.id) {
            http.put(API_URL+`/livros/${parametros.id}/`, {
                titulo: titulo,
                autor: autor,
                editora: editora,
            })
            .then(() => {
                alert("Livro atualizado com sucesso!")
            })
        } else {
            http.post(API_URL+'/livros', {
                titulo: titulo,
                autor: autor,
                editora: editora,
                numeroPaginas: numeroPaginas,
            })
            .then(() => {
                alert("Livro cadastrado com sucesso!")
            })
        }

    }

    // "Casa do código", "Alura","Cristiano Arcoverde Publicacoes"
    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Livros</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={titulo}
                    onChange={evento => setTitulo(evento.target.value)}
                    label="Título"
                    variant="standard"
                    fullWidth
                    required
                />
                <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel id="select-autor-label">Autor</InputLabel>
                    <Select
                        labelId="select-autor-label"
                        id="select-autor"
                        value={autor}
                        onChange={evento => setAutor(evento.target.value)}
                        label="Autor"
                        required
                    >
                        <MenuItem value=""><em>Selecione um autor</em></MenuItem>
                        {autores.map(autor => (
                            <MenuItem key={autor._id} value={autor._id}>
                                {autor.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div>
                <label htmlFor="opcoes">Editora:</label>
                <select id="editora" value={editora} onChange={evento => setEditora(evento.target.value)}>
                    <option value="">-- Selecione --</option>
                    <option value="Casa do código">Casa do código</option>
                    <option value="Alura">Alura</option>
                    <option value="Cristiano Arcoverde Publicacoes">Cristiano Arcoverde Publicacoes</option>
                </select>
                <p>Você selecionou: {editora}</p>
                </div>                
                <TextField
                    value={numeroPaginas}
                    onChange={evento => setNumeroPaginas(evento.target.value)}
                    label="Páginas"
                    variant="standard"
                    fullWidth
                    required
                /> 

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioLivro;