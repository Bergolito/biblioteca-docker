import { 
    Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Card, CardContent, TextField, Grid 
} from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import { Link as RouterLink } from 'react-router-dom'
import IAutor from "../../../interfaces/IAutor"

const AdministracaoAutores = () => {

    const [nome, setNome] = useState('')
    const [autores, setAutores] = useState<IAutor[]>([])

    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        http.get<IAutor[]>(API_URL + '/autores').then((resp) => {
            console.log('autores => ', resp.data);
            setAutores(resp.data)
        })
    }, [API_URL])

    const buscarAutores = () => {
        const params: any = {}
        if (nome) params.nome = nome

        console.log('params => ', params);
        http.get<IAutor[]>(API_URL + '/autores/busca', { params })
            .then(resposta => {
                setAutores(resposta.data)
            })
    }

    useEffect(() => {
        buscarAutores()
    }, [])

    const excluir = (autor: IAutor) => {
        http.delete(API_URL + `/autores/${autor._id}`)
            .then(() => {
                buscarAutores()
            })
    }

    const handlePesquisar = () => {
        buscarAutores()
    }

    const handleLimpar = () => {
        setNome('')
        buscarAutores()
    }

    return (
        <>
            <RouterLink to="/admin/autores/novo">
                <Button  variant="contained" color="primary">
                    Novo Autor
                </Button>
            </RouterLink>        

            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12}>
                            <label>Nome</label>
                            <TextField
                                label="Nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
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

            <RouterLink to="/admin/autores/novo">
                <Button  variant="contained" color="primary">
                    Novo Autor
                </Button>
            </RouterLink>                

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Nacionalidade
                            </TableCell>
                            <TableCell>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {autores.map(autor => <TableRow key={autor._id}>
                            <TableCell>
                                {autor.nome}
                            </TableCell>
                            <TableCell>
                                {autor.nacionalidade}
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/autores/${autor._id}`}> Editar </RouterLink>
                                <Button variant="outlined" color="error" onClick={() => excluir(autor)}>
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

export default AdministracaoAutores;