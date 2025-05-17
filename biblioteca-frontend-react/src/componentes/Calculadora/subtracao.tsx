import { useState } from 'react';

function Subtracao() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [resultado, setResultado] = useState(0);

  const calcularSubtracao = () => {
    setResultado(a - b);
  };

  return (
    <div className="direita" style={{ border: '1px solid #ccc', padding: '10px', background: '#ab3' }}>
      <h2>Subtração</h2>
      <label>
        Número A:
        <input
          type="number"
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
        />
      </label>
      <br />
      <label>
        Número B:
        <input
          type="number"
          value={b}
          onChange={(e) => setB(parseFloat(e.target.value))}
        />
      </label>
      <br />
      <button onClick={calcularSubtracao}>Calcular</button>
      <p>Resultado: {resultado}</p>
    </div>
  );
}

export default Subtracao;