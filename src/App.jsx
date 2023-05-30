import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [atletas, setAtletas] = useState([]);
  const [clubes, setClubes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('https://api.cartola.globo.com/atletas/pontuados/1');
        setAtletas(Object.values(response1.data.atletas));
        setClubes(Object.values(response1.data.clubes));
        setPosicoes(Object.values(response1.data.posicoes));
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const procuraPosicao = (id) => {
    const posicaoCorreta = posicoes.find((posicao) => {
      return posicao.id === id;
    });
    return posicaoCorreta.nome;
  };

  const procuraClube = (id) => {
    const clubeCorreto = clubes.find((clube) => {
      return clube.id === id;
    });
    return clubeCorreto;
  };

  return (
    <div className="container">
      {atletas.map((atleta, index) => (
        <li className='cards' key={index}>
          <p>Nome: {atleta.apelido}</p>
          <p>Posicao: {procuraPosicao(atleta.posicao_id)}</p>
          <p>Clube: {procuraClube(atleta.clube_id).nome}</p>
          <img src={procuraClube(atleta.clube_id).escudos['30x30']} alt={procuraClube(atleta.clube_id).nome} />
          <p>Pontuacao: {atleta.pontuacao}</p>
          <img className="foto-tecnico" src={atleta.foto.replace('FORMATO', '220x220')} alt={atleta.apelido} />
        </li>
      ))}
      
    </div>
  );
};

export default App;