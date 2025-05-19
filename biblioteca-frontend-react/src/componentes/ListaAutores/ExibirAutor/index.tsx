import React from 'react';

import styles from './ExibirAutor.module.scss';
import IAutor from '../../../interfaces/IAutor';

interface ExibirAutorProps {
  autor: IAutor;
  onVerDetalhes?: (id: number) => void;
  onDetalhar?: () => void;
  exibirModalCompleto?: boolean;
}

const ExibirAutor: React.FC<ExibirAutorProps> = ({ autor, onVerDetalhes, onDetalhar, exibirModalCompleto }) => {
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/autores/avatar-autor.jpg';

  if (exibirModalCompleto) {
    return (
      <div className={styles.modalConteudo} style={{ boxShadow: 'none', pointerEvents: 'auto' }}>
        <div className={styles.modalImagem}>
          <img
            src={autor.imagem || imagemPadrao}
            alt={`Capa do livro ${autor.nome}`}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
            }}
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className={styles.detalhesLivro}>
          <h2 style={{ color: '#6a5acd', marginBottom: 16 }}>{autor.nome}</h2>
          {/* <p><strong>ID:</strong> {autor._id ?? autor.id}</p> */}
          <p><strong>Nacionalidade:</strong> {autor.nacionalidade}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardLivro}>
      <div className={styles.cardImagem}>
        <img 
          src={autor.imagem || imagemPadrao} 
          alt={`Capa do livro ${autor.nome}`} 
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
        <h3 className={styles.titulo}>{autor.nome}</h3>

        <div className={styles.infoLivro}>
          { 
            autor.nome && (
              <p><span>Autor:</span> {autor.nome}</p>
            )
          }
          <p><span>Nacionalidade:</span> {autor.nacionalidade}</p>
        </div>
        
        <div className={styles.footerBotoes}>
          {onVerDetalhes && (
            <button 
              className={styles.botaoDetalhes}
              onClick={() => onVerDetalhes(autor.id)}
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

export default ExibirAutor;
