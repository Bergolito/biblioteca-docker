import style from './Calculadora.module.scss';
import NavBar from '../NavBar';
import Rodape from '../Rodape';
import Adicao from './adicao';
import Subtracao from './subtracao';
import Multiplicacao from './multiplicacao';
import Divisao from './divisao';
import Banner from '../Banner';

const Calculadora = () => {

  return (
    <>
      <NavBar />
      <Banner /> 
      <h1> Calculadora </h1>
      <div className={style.container}>
          <div className={style.item}><Adicao /></div>
          <div className={style.item}><Subtracao /></div>
          <div className={style.item}><Multiplicacao /></div>
          <div className={style.item}><Divisao /></div>
      </div>
      <Rodape />
    </>
  )
}

export default Calculadora;
