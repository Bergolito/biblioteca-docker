import { useState } from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import Rodape from "../Rodape";
import Operacao from "./operacao";
import estilo from './SuperCalculadora.module.scss';

export default function SuperCalculadora() {

    const [valor1, setValor1] = useState<number>(0);
    const [valor2, setValor2] = useState<number>(0);

    const [operacao1, setOperacao1] = useState<string>('+');
    const [operacao2, setOperacao2] = useState<string>('-');
    const [operacao3, setOperacao3] = useState<string>('*');
    const [operacao4, setOperacao4] = useState<string>('/');

    const [resultado1, setResultado1] = useState<number>(0);
    const [resultado2, setResultado2] = useState<number>(0);
    const [resultado3, setResultado3] = useState<number>(0);
    const [resultado4, setResultado4] = useState<number>(0);

    function calcularResultado() {
        setOperacao1('+');
        setResultado1(valor1 + valor2);
        setOperacao2('-');
        setResultado2(valor1 - valor2);
        setOperacao3('*');
        setResultado3(valor1 * valor2);
        setOperacao4('/');
        setResultado4(valor1 / valor2);
    }

    return (
        <>
        <NavBar />
        <Banner /> 
        <h1>Super Calculadora </h1>

        <div>
            <label>
                Valor 1:
                <input type="number" value={valor1} onChange={(e) => setValor1(Number(e.target.value))} />
            </label> 
            <br />
            <label>
                Valor 2:
                <input type="number" value={valor2} onChange={(e) => setValor2(Number(e.target.value))} />
            </label>
            <br />
            <button id="calcular" onClick={calcularResultado}>Calcular</button>
        </div>
        {/* 
        // Rosa pastel: #FFD1DC
        // Azul bebê: #ADD8E6
        // Verde menta: #E0FFFF
        // Amarelo claro: #FFFACD 
        // */}
        <div className={estilo.container}>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao={operacao1} resultado={resultado1} corFundo="#FFD1DC" /></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao={operacao2} resultado={resultado2} corFundo="#ADD8E6"/></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao={operacao3} resultado={resultado3} corFundo="#E0FFFF"/></div>
            <div className={estilo.item}><Operacao valor1={valor1} valor2={valor2} operacao={operacao4} resultado={resultado4} corFundo="#FFFACD"/></div>
        </div>
            
        <Rodape />
        </>
    )
    
}    