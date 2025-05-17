import { Alert } from "@mui/material";

interface Props {
    nome: String
}
  
const Painel  = ({ nome }: Props)  => {
    return (
        <>
        <div> Olá. Eu sou um Painel!!! </div>
        <div> Meu nome é {nome} </div>
        </>
    )
}

export default Painel;