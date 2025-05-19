import React from 'react';

import styles from './ExibirLivro.module.scss';
import IEditora from '../../../interfaces/IEditora';

interface ExibirEditoraProps {
  editora: IEditora;
  onVerDetalhes?: (id: number) => void;
  onDetalhar?: () => void;
  exibirModalCompleto?: boolean;
}

const ExibirEditora: React.FC<ExibirEditoraProps> = ({ editora, onVerDetalhes, onDetalhar, exibirModalCompleto }) => {
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/editoras/capa-editora.jpg';

  if (exibirModalCompleto) {
    return (
      <div className={styles.modalConteudo} style={{ boxShadow: 'none', pointerEvents: 'auto' }}>
        <div className={styles.modalImagem}>
          <img
            src={editora.imagem || imagemPadrao}
            alt={`Capa do livro ${editora.nome}`}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
            }}
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className={styles.detalhesLivro}>
          <h2 style={{ color: '#6a5acd', marginBottom: 16 }}>{editora.nome}</h2>
          {/* <p><strong>ID:</strong> {editora._id ?? editora.id}</p> */}
          <p><strong>Editora:</strong> {editora.nome}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardLivro}>
      <div className={styles.cardImagem}>
        <img 
          src={editora.imagem || imagemPadrao} 
          alt={`Capa do livro ${editora.nome}`} 
          className={styles.capaLivro}
          onError={(e) => {
            // Caso a imagem local também falhe, usar um placeholder online como fallback
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Previne loop infinito
            target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
          }}
        />
      </div>
      <div className={styles.cardConteudo}>
        <h3 className={styles.titulo}>{editora.nome}</h3>

        <div className={styles.infoLivro}>
          { 
            editora.nome && (
              <p><span>Editora:</span> {editora.nome}</p>
            )
          }
        </div>
        
        <div className={styles.footerBotoes}>
          {onVerDetalhes && (
            <button 
              className={styles.botaoDetalhes}
              onClick={() => onVerDetalhes(editora._id)}
            >
              Ver detalhes
            </button>
          )}
          {onDetalhar && !exibirModalCompleto && (
            <button 
              className={styles.botaoDetalhar}
              onClick={onDetalhar}
            >
              Detalhar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExibirEditora;
