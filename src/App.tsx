import { useState } from 'react';
import Home from './Home';
import Teste from './Teste';
import Privacidade from './Privacidade';

export default function App() {
  // Agora temos 3 opções de páginas
  const [paginaAtiva, setPaginaAtiva] = useState<'home' | 'teste' | 'privacidade'>('home');

  if (paginaAtiva === 'teste') {
    return <Teste voltarInicio={() => setPaginaAtiva('home')} />;
  }

  if (paginaAtiva === 'privacidade') {
    return <Privacidade voltarInicio={() => setPaginaAtiva('home')} />;
  }

  return (
    <Home 
      irParaTeste={() => setPaginaAtiva('teste')} 
      irParaPrivacidade={() => setPaginaAtiva('privacidade')}
    />
  );
}