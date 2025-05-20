import { 
    Button, Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Card, CardContent, TextField, Grid
} from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import { Link as RouterLink } from 'react-router-dom'
import IEditora from "../../../interfaces/IEditora"

const AdministracaoEditoras = () => {

    const [nome, setNome] = useState('')
    const [editoras, setEditoras] = useState<IEditora[]>([])

    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        http.get<IEditora[]>(API_URL + '/editoras').then((resp) => {
            console.log('editoras => ', resp.data);
            setEditoras(resp.data)
        })
    }, [API_URL])

    const buscarEditoras = () => {
        const params: any = {}
        if (nome) params.nome = nome

        console.log('params => ', params);
        http.get<IEditora[]>(API_URL + '/editoras/busca', { params })
            .then(resposta => {
                setEditoras(resposta.data)
            })
    }

    useEffect(() => {
        buscarEditoras()
        // eslint-disable-next-line
    }, [])

    const excluir = (editora: IEditora) => {
        http.delete(API_URL + `/editoras/${editora._id}`)
            .then(() => {
                buscarEditoras()
            })
    }

    const handlePesquisar = () => {
        buscarEditoras()
    }

    const handleLimpar = () => {
        setNome('')
        buscarEditoras()
    }

    return (
        <>
            <RouterLink to="/admin/editoras/novo">
                <Button  variant="contained" color="primary">
                    Nova Editora
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
            
            <RouterLink to="/admin/editoras/novo">
                <Button  variant="contained" color="primary">
                    Nova Editora
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
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editoras.map(editora => <TableRow key={editora._id}>
                            <TableCell>
                                {editora.nome}
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/editoras/${editora._id}`}> Editar </RouterLink>
                                <Button variant="outlined" color="error" onClick={() => excluir(editora)}>
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

export default AdministracaoEditoras;