import React from 'react';
import ILivro from '../../../interfaces/ILivro';

import styles from './ExibirLivro.module.scss';

interface ExibirLivroProps {
  livro: ILivro;
  onVerDetalhes?: (id: number) => void;
  onDetalhar?: () => void;
  exibirModalCompleto?: boolean;
}

const ExibirLivro: React.FC<ExibirLivroProps> = ({ livro, onVerDetalhes, onDetalhar, exibirModalCompleto }) => {
  // Imagem padrão local em vez de placeholder online
  const imagemPadrao = '/imagens/capas/capa.jpg';

  // Função para extrair o nome do autor do objeto ou exibir o autor como string
  const renderAutor = () => {
    if (livro.autor && typeof livro.autor === 'object' && 'nome' in livro.autor) {
      return livro.autor.nome;
    }
    return livro.autor;
  };

  if (exibirModalCompleto) {
    return (
      <div className={styles.modalConteudo} style={{ boxShadow: 'none', pointerEvents: 'auto' }}>
        <div className={styles.modalImagem}>
          <img
            src={livro.imagemCapa || imagemPadrao}
            alt={`Capa do livro ${livro.titulo}`}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://via.placeholder.com/150x200?text=Sem+Capa';
            }}
            style={{ boxShadow: 'none' }}
          />
        </div>
        <div className={styles.detalhesLivro}>
          <h2 style={{ color: '#6a5acd', marginBottom: 16 }}>{livro.titulo}</h2>
          <p><strong>ID:</strong> {livro._id ?? livro.id}</p>
          <p><strong>Autor:</strong> {renderAutor()}</p>
          <p><strong>Editora:</strong> {livro.editora}</p>
          <p><strong>Número de Páginas:</strong> {livro.numeroPaginas}</p>
          <p><strong>Imagem da Capa:</strong> {livro.imagemCapa ? livro.imagemCapa : 'Não informada'}</p>
          <div className={styles.infoAdicional} style={{ marginTop: 24 }}>
            <h3 style={{ color: '#6a5acd' }}>Informações Adicionais</h3>
            <p><strong>Info 1:</strong> Dados complementares sobre o livro</p>
            <p><strong>Info 2:</strong> Outra informação relevante</p>
            <p><strong>Info 3:</strong> Mais um dado extra</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardLivro}>
      <div className={styles.cardImagem}>
        <img 
          src={livro.imagemCapa || imagemPadrao} 
          alt={`Capa do livro ${livro.titulo}`} 
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
        <h3 className={styles.titulo}>{livro.titulo}</h3>

        <div className={styles.infoLivro}>
          { 
            livro.autor && (
              <p><span>Autor:</span> {renderAutor()}</p>
            )
          }
          <p><span>Editora:</span> {livro.editora}</p>
          { livro.numeroPaginas && (
            <p><span>Páginas:</span> {livro.numeroPaginas}</p>
          )
          }
        </div>
        
        <div className={styles.footerBotoes}>
          {onVerDetalhes && (
            <button 
              className={styles.botaoDetalhes}
              onClick={() => onVerDetalhes(livro.id)}
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

export default ExibirLivro;
