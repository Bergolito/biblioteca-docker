import React from 'react';
import styles from './GridLivros.module.scss';
import IEditora from '../../../interfaces/IEditora';
import ExibirEditora from '../ExibirEditora';

interface GridEditorasProps {
  editoras: IEditora[];
  colunas?: number;
  onVerDetalhes?: (id: number) => void;
  onDetalhar?: (editora: IEditora) => void;
}

const GridEditoras: React.FC<GridEditorasProps> = ({ 
  editoras, 
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
      {editoras.map(editora => (
        //<div className={styles.gridItem} key={livro._id}>
        <div className={styles.gridItem} key={editora._id}>
          <ExibirEditora 
            editora={editora} 
            onVerDetalhes={onVerDetalhes}
            onDetalhar={() => onDetalhar && onDetalhar(editora)}
          />
        </div>
      ))}
    </div>
  );
};

export default GridEditoras;
