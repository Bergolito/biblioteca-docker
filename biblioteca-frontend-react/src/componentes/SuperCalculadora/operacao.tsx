export default function Operacao(
    { valor1, valor2, operacao, resultado, corFundo }: 
    { valor1: number; valor2: number; operacao: string; resultado: number; corFundo?: string }) {

    const estilos = {
        border: '1px solid #ccc',
        padding: '10px',
        background: corFundo ? corFundo : '#ADD8E6',
    };

    return (
        // Rosa pastel: #FFD1DC
        // Azul bebê: #ADD8E6
        // Verde menta: #E0FFFF
        // Amarelo claro: #FFFACD
        <div className="direita" style={estilos}>
            <h2>Operação: {operacao === '+'?'Soma':operacao === '-'?'Subtração':operacao === '*'?'Multiplicação':operacao === '/'?'Divisão':'Outra Operação'}</h2>
            <label>
                Número 1: <input type="text" value={valor1} readOnly/>
            </label>
            <br />
            <label>
                Número 2: <input type="text" value={valor2} readOnly/>
            </label>
            <br />
            <p>Resultado: {resultado}</p>
        </div>
    );
}