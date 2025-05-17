import React, { useState } from 'react';
import './sudoku-solver.css'; // Importe o arquivo CSS

import style from './Sudoku.module.scss';
import { Button } from '@mui/material';

function SudokuSolver() {
  const initialBoard = [
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

  const [board, setBoard] = useState([...initialBoard]);
  const [solved, setSolved] = useState<number[][] | null>(null);

  function solveSudoku(boardToSolve: number[][]): number[][] {
    function isValid(board: number[][], row: number, col: number, k: number): boolean {
      for (let i = 0; i < 9; i++) {
        const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const boxCol = Math.floor(col / 3) * 3 + (i % 3);

        if (board[row][i] === k || board[i][col] === k || board[boxRow][boxCol] === k) {
          return false;
        }
      }
      return true;
    }

    function solve(data: number[][]): boolean {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (data[i][j] === 0) {
            for (let k = 1; k <= 9; k++) {
              if (isValid(data, i, j, k)) {
                data[i][j] = k;
                if (solve(data)) {
                  return true;
                } else {
                  data[i][j] = 0;
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    const boardCopy = boardToSolve.map(row => [...row]);
    solve(boardCopy);
    return boardCopy;
  }

  const handleSolve = () => {
    const solvedBoard = solveSudoku(board.map(row => [...row]));
    setSolved(solvedBoard);
  };

  return (
    <div>
      <h2>Solucionador do Sudoku</h2>

      <div className={style.container}>
          <div className={style.item}>
            <h3>Entrada:</h3>
            <div className="sudoku-grid">
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell">
                    {cell}
                  </div>
                ))
              )}
            </div>

          </div>
          <div className={style.item}>
            <Button variant="contained" onClick={handleSolve}>Solucionar</Button>
          </div>
          <div className={style.item}>
          {solved && (
              <div>
                <h3>Solução:</h3>
                <div className="sudoku-grid">
                  {solved.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div key={`${rowIndex}-${colIndex}`} className="sudoku-cell">
                        {cell}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
          <div className={style.item}> 
          </div>
      </div>
      
    </div>
  );
}

export default SudokuSolver;