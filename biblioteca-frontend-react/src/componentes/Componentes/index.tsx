import NavBar from "../NavBar";
import Banner from "../Banner";
import Rodape from "../Rodape";
import Painel from "../Panel";
import BasicTable from "../Tables";


const Componentes = () => {
    return (
        <>
            <NavBar />
            <Banner /> 
            <div> Meus compoenentes </div>
            <Painel nome={'Bergson'} />
            <BasicTable />
            <Rodape />
        </>
    )    
}

export default Componentes;