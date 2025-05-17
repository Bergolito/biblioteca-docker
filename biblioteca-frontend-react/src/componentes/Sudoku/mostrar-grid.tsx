import { useState } from "react";

import './sudoku'

// Defina a interface para os atributos do componente Botao
interface GridProps {
  dados: number[][];
  texto: string;
}

// Use a interface para tipar os atributos do componente
function Grid(props: GridProps) {
  return (
    <>

      <h1>{props.texto}</h1>
      <div className="sudoku-grid">
        {props.dados.map((linha, rowIndex) => (
          linha.map((celula, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell">
              {celula}
            </div>
          ))
        ))}
      </div>      
          
    </>
  );
}

function MostrarGrid() {

  const [resultado, setResultado] = useState(0);

  // Exemplo de uso:
  const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const calcularSolucao = () => {
    setResultado(resultado);
  };
  
  console.log('SAIDA => ')

  return (
    <div>
      <Grid texto="Sudoku Solution" dados={sudokuBoard} />
      <button onClick={calcularSolucao}>Solucionar</button>
    </div>
  );
}

interface BoardProps {
  dados: number[][];
  texto: string;
}



export default MostrarGrid;