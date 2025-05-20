import { 
    Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Card, CardContent, TextField, MenuItem, Select, InputLabel, FormControl, Grid 
} from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import ILivro from "../../../interfaces/ILivro"
import IAutor from "../../../interfaces/IAutor"
import { Link as RouterLink } from 'react-router-dom'

const listaEditoras = [
    { id: 1, nome: 'Casa do código' },
    { id: 2, nome: 'Alura' },
    { id: 3, nome: 'Cristiano Arcoverde Publicacoes' }
]

const AdministracaoLivros = () => {

    const [livros, setLivros] = useState<ILivro[]>([])
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')
    const [autores, setAutores] = useState<IAutor[]>([])

    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        http.get<IAutor[]>(API_URL + '/autores').then(resp => setAutores(resp.data))
    }, [API_URL])

    const buscarLivros = () => {
        const params: any = {}
        if (titulo) params.titulo = titulo
        if (autor) params.nomeAutor = autor
        if (editora) params.editora = editora
        if (numeroPaginas) params.numeroPaginas = numeroPaginas

        console.log('params => ', params);
        http.get<ILivro[]>(API_URL + '/livros/busca', { params })
            .then(resposta => {
                setLivros(resposta.data)
            })
    }

    useEffect(() => {
        buscarLivros()
    }, [])

    const excluir = (livro: ILivro) => {
        http.delete(API_URL + `/livros/${livro._id}`)
            .then(() => {
                buscarLivros()
            })
    }

    const handlePesquisar = () => {
        buscarLivros()
    }

    const handleLimpar = () => {
        setTitulo('')
        setAutor('')
        setEditora('')
        setNumeroPaginas('')
        buscarLivros()
    }

    return (
        <>
            <RouterLink to="/admin/livros/novo">
                <Button variant="contained" color="primary">
                    Novo Livro
                </Button>
            </RouterLink>            

            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12}>
                            <label>Título</label>
                            <TextField
                                label="Título"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Autor</InputLabel>
                                <Select
                                    label="Autor"
                                    value={autor}
                                    onChange={e => setAutor(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {autores.map(autor => (
                                        <MenuItem key={autor._id} value={autor.nome}>{autor.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Editora</InputLabel>
                                <Select
                                    label="Editora"
                                    value={editora}
                                    onChange={e => setEditora(e.target.value)}
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    {listaEditoras.map(editora => (
                                        <MenuItem key={editora.id} value={editora.nome}>{editora.nome}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Nº de páginas"
                                type="number"
                                value={numeroPaginas}
                                onChange={e => setNumeroPaginas(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <Button variant="contained" color="primary" onClick={handlePesquisar} sx={{ mr: 1 }}>
                                Pesquisar
                            </Button>
                            <Button variant="outlined" onClick={handleLimpar}>
                                Limpar
                            </Button>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <RouterLink to="/admin/livros/novo">
                <Button variant="contained" color="primary">
                    Novo Livro
                </Button>
            </RouterLink>            

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Título
                            </TableCell>
                            <TableCell>
                                Editora
                            </TableCell>
                            <TableCell>
                                Paginas
                            </TableCell>
                            <TableCell>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livros.map(livro => <TableRow key={livro._id}>
                            <TableCell>
                                {livro.titulo}
                            </TableCell>
                            <TableCell>
                                {livro.editora}
                            </TableCell>
                            <TableCell>
                                {livro.numeroPaginas}
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/livros/${livro._id}`}> Editar </RouterLink>
                                <Button variant="outlined" color="error" onClick={() => excluir(livro)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdministracaoLivros