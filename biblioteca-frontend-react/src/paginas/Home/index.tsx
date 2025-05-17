import Banner from '../../componentes/Banner';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';

function App() {
  const nome = process.env.REACT_APP_NOME;
  return (
    <>
      <NavBar />
      <Banner /> 
      <h1>Bem-vindo à Livraria</h1>
      <img 
          src="/imagens/livraria.jpg" 
          alt="Banner do sistema" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Previne loop infinito
            target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
          }}
        />
      
      <h2>Livros em destaque {process.env.REACT_APP_NOME}</h2>
      <Rodape />
    </>
  );
}

export default App;
