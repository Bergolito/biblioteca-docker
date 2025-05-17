import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"

import { Link as RouterLink, Outlet } from 'react-router-dom'
import NavBar from "../../componentes/NavBar"

const PaginaBaseAdmin = () => {
    return (
        <>
            <NavBar />

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>

                            <Link component={RouterLink} to="/admin/livros">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Livros
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/livros/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Livro
                                </Button>
                            </Link>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin