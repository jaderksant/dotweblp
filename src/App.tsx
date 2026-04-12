import { useState } from 'react';
import Home from './Home';
import Teste from './Teste';
import Privacidade from './Privacidade';
import Termos from './Termos';
import TrabalheConosco from './TrabalheConosco';
import BoasVindas from './BoasVindas'; // IMPORTAMOS A TELA NOVA AQUI!

// Adicionamos 'boas-vindas' na lista de páginas permitidas
type Pagina = 'home' | 'teste' | 'privacidade' | 'termos' | 'trabalhe' | 'boas-vindas';

export default function App() {
  // Em vez de começar cego na 'home', ele olha a URL. 
  // Se o Asaas mandou para /boas-vindas, ele já abre direto nela!
  const [paginaAtiva, setPaginaAtiva] = useState<Pagina>(() => {
    if (window.location.pathname === '/boas-vindas') {
      return 'boas-vindas';
    }
    return 'home';
  });

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

  // O if da tela nova!
  if (paginaAtiva === 'boas-vindas') {
    // Caso o cliente queira voltar pra home depois, passei a função também
    // Lembre-se de adicionar a prop { voltarInicio } lá no componente BoasVindas se for usar!
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