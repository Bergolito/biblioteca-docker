import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (<nav className={estilos.Link} style={{ background: '#afa' }}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/livros">Livros</Link>
      </li>
      <li>
        <Link to="/autores">Autores</Link>
      </li>
      <li>
        <Link to="/editoras">Editoras</Link>
      </li>

      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  </nav>)
}

export default NavBar