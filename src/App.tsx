import { useState, useEffect } from 'react';
import Home from './Home';
import Teste from './Teste';
import Privacidade from './Privacidade';
import Termos from './Termos';
import TrabalheConosco from './TrabalheConosco';
import BoasVindas from './BoasVindas';
import LogoSkeletonLoader from './components/LogoSkeletonLoader'; // IMPORTAÇÃO DO LOADER

type Pagina = 'home' | 'teste' | 'privacidade' | 'termos' | 'trabalhe' | 'boas-vindas';

export default function App() {
  // ESTADO DO SPLASH SCREEN (Começa true para mostrar a logo)
  const [carregandoInicial, setCarregandoInicial] = useState(true);

  const [paginaAtiva, setPaginaAtiva] = useState<Pagina>(() => {
    if (window.location.pathname === '/boas-vindas') {
      return 'boas-vindas';
    }
    return 'home';
  });

  // Efeito que tira o loader da tela depois de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregandoInicial(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // SE ESTIVER CARREGANDO, MOSTRA SÓ A LOGO EM TELA CHEIA
  if (carregandoInicial) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center selection:bg-[#0400FF] selection:text-white">
      {/* Mudei de size="xl" para size="md" */}
      <LogoSkeletonLoader size="md" showText={false} />
    </div>
  );
}

  // DEPOIS DE CARREGAR, SEGUE O FLUXO NORMAL DO SITE
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

  if (paginaAtiva === 'boas-vindas') {
    return <BoasVindas />; 
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