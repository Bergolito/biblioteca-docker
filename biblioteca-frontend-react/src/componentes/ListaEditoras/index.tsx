import axios from 'axios';
import { useEffect, useState } from 'react';
import GridEditoras from './GridEditoras';
import ExibirEditora from './ExibirEditora';
import IEditora from '../../interfaces/IEditora';

const ListaEditoras = () => {

  const [editoras, setEditoras] = useState<IEditora[]>([])
  const [editoraSelecionada, setEditoraSelecionada] = useState<IEditora | null>(null);

  const API_URL = process.env.REACT_APP_API_URL 
  console.log('API_URL => ',API_URL)
  useEffect(() => {
      // obter editoras
      axios.get(API_URL+'/editoras')
        .then(resposta => {
          console.log('editoras => ',resposta.data)
          setEditoras(resposta.data)
        })
        .catch(erro => {
          console.log(erro)
      })
    }, []  // Adicionando array de dependências vazio para evitar loop infinito
  )

  return (
    <>
    <h1>Lista de Editoras</h1>
    <GridEditoras 
      editoras={editoras} 
      colunas={3} 
      onDetalhar={setEditoraSelecionada}
    />
    {editoraSelecionada && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }} onClick={() => setEditoraSelecionada(null)}>
        <div onClick={e => e.stopPropagation()} style={{background: '#fff', borderRadius: 8, padding: 32, maxWidth: 600, width: '90%', position: 'relative'}}>
          <button onClick={() => setEditoraSelecionada(null)} style={{position: 'absolute', top: 12, right: 16, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer'}}>×</button>
          <ExibirEditora editora={editoraSelecionada} exibirModalCompleto />
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 24}}>
            <button onClick={() => setEditoraSelecionada(null)} style={{background: '#6a5acd', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 24px', fontWeight: 600, cursor: 'pointer'}}>Fechar</button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ListaEditoras;