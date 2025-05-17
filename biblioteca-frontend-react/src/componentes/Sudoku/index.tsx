import Banner from '../Banner';
import NavBar from '../NavBar';
import Rodape from '../Rodape';
import SudokuSolver from './sudoku-solver';

const Sudoku = () => {

  return (
    <>
      <NavBar />
      <Banner /> 
      <SudokuSolver />
      <Rodape />
    </>
  )
}

export default Sudoku;