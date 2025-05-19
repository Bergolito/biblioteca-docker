import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IAutor from "../../../interfaces/IAutor"

const FormularioAutor = () => {

    const parametros = useParams()
    const [autores, setAutores] = useState<IAutor[]>([])
    const [nome, setNome] = useState('')
    const [nacionalidade, setNacionalidade] = useState('')

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
            http.get<IAutor>(API_URL+`/autores/${parametros.id}`)
                .then(resposta => {
                    setNome(resposta.data.nome)
                    setNacionalidade(resposta.data.nacionalidade)
                })
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        console.log('Submit => ',parametros);

        if (parametros.id) {
            http.put(API_URL+`/autores/${parametros.id}/`, {
                nome: nome,
                nacionalidade: nacionalidade,
            })
            .then(() => {
                alert("Autor atualizado com sucesso!")
            })
        } else {
            http.post(API_URL+'/autores', {
                nome: nome,
                nacionalidade: nacionalidade,
            })
            .then(() => {
                alert("Autor cadastrado com sucesso!")
            })
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Autores</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <InputLabel id="select-titulo-label">Nome</InputLabel>
                <TextField
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    label="Nome"
                    variant="standard"
                    fullWidth
                    required
                />

                <InputLabel id="select-titulo-label">Nacionalidade</InputLabel>
                <TextField
                    value={nacionalidade}
                    onChange={evento => setNacionalidade(evento.target.value)}
                    label="Nome"
                    variant="standard"
                    fullWidth
                    required
                />

                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioAutor;