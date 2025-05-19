import React from 'react';
import styles from './GridLivros.module.scss';
import ExibirAutor from '../ExibirAutor';
import IAutor from '../../../interfaces/IAutor';

interface GridAutoresProps {
  autores: IAutor[];
  colunas?: number;
  onVerDetalhes?: (id: number) => void;
  onDetalhar?: (autor: IAutor) => void;
}

const GridAutores: React.FC<GridAutoresProps> = ({ 
  autores, 
  colunas = 3, 
  onVerDetalhes, 
  onDetalhar 
}) => {
  return (
    <div 
      className={styles.gridContainer}
      style={{ 
        gridTemplateColumns: `repeat(${colunas}, 1fr)` 
      }}
    >
      {autores.map(autor => (
        <div className={styles.gridItem} key={autor._id}>
          <ExibirAutor 
            autor={autor} 
            onVerDetalhes={onVerDetalhes}
            onDetalhar={() => onDetalhar && onDetalhar(autor)}
          />
        </div>
      ))}
    </div>
  );
};

export default GridAutores;
