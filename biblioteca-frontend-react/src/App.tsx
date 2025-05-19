import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import Home from './paginas/Home';
import VitrineLivros from './paginas/VitrineLivros';
import VitrineAutores from './paginas/VitrineAutores';
import VitrineEditoras from './paginas/VitrineEditoras';
import Sudoku from './componentes/Sudoku';
import Calculadora from './componentes/Calculadora';
import Componentes from './componentes/Componentes';
import AdministracaoLivros from './paginas/Administracao/Livros/AdministracaoLivros';
import FormularioLivro from './paginas/Administracao/Livros/FormularioLivro';
import SuperCalculadora from './componentes/SuperCalculadora';
import AdministracaoAutores from './paginas/Administracao/Autores/AdministracaoAutores';
import FormularioAutor from './paginas/Administracao/Autores/FormularioAutor';
import AdministracaoEditoras from './paginas/Administracao/Editoras/AdministracaoEditoras';
import FormularioEditora from './paginas/Administracao/Editoras/FormularioEditora';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/livros" element={<VitrineLivros />} />
      <Route path="/autores" element={<VitrineAutores />} />
      <Route path="/editoras" element={<VitrineEditoras />} />
      <Route path="/sudoku" element={<Sudoku />} />
      <Route path="/calculadora" element={<Calculadora />} />
      <Route path="/super-calculadora" element={<SuperCalculadora />} />
      <Route path="/comps" element={<Componentes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>
      
        <Route path="livros" element={<AdministracaoLivros />} />
        <Route path="livros/novo" element={<FormularioLivro />} />
        <Route path="livros/:id" element={<FormularioLivro />} />

        <Route path="autores" element={<AdministracaoAutores />} />
        <Route path="autores/novo" element={<FormularioAutor />} />
        <Route path="autores/:id" element={<FormularioAutor />} />

        <Route path="editoras" element={<AdministracaoEditoras />} />
        <Route path="editoras/novo" element={<FormularioEditora />} />
        <Route path="editoras/:id" element={<FormularioEditora />} />

      </Route>
    </Routes>
  );
}

export default App;
