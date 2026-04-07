import { useState } from 'react';
import Home from './Home';
import Teste from './Teste';
import Privacidade from './Privacidade';
import Termos from './Termos';
import TrabalheConosco from './TrabalheConosco';

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<'home' | 'teste' | 'privacidade' | 'termos' | 'trabalhe'>('home');

  if (paginaAtiva === 'teste') {
    return <Teste voltarInicio={() => setPaginaAtiva('home')} />;
  }

  if (paginaAtiva === 'privacidade') {
    return <Privacidade voltarInicio={() => setPaginaAtiva('home')} />;
  }

  if (paginaAtiva === 'termos') {
    return <Termos voltarInicio={() => setPaginaAtiva('home')} />;
  }

  if (paginaAtiva === 'trabalhe') {
    return <TrabalheConosco voltarInicio={() => setPaginaAtiva('home')} />;
  }

  return (
    <Home 
      irParaTeste={() => setPaginaAtiva('teste')} 
      irParaPrivacidade={() => setPaginaAtiva('privacidade')}
      irParaTermos={() => setPaginaAtiva('termos')}
      irParaTrabalhe={() => setPaginaAtiva('trabalhe')}
    />
  );
}