import { useEffect, useState } from 'react';
import { ArrowRight, Lightning, CheckCircle, Fingerprint } from '@phosphor-icons/react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // LÓGICA À PROVA DE BALAS: Lê a posição exata da seção branca de preços
      const precosSection = document.getElementById('precos');
      if (precosSection) {
        const rect = precosSection.getBoundingClientRect();
        // A navbar está a uns 80px do topo da tela. 
        // Ela só fica "scrolled" (letras escuras) SE estiver DENTRO da seção branca.
        const isOverWhiteBackground = rect.top <= 80 && rect.bottom >= 80;
        setScrolled(isOverWhiteBackground);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden selection:bg-[#0400FF] selection:text-white">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      {/* NAVBAR FLOATING (Agora super precisa com a cor de fundo) */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-5xl rounded-full border ${scrolled ? 'bg-white/90 backdrop-blur-3xl py-3 px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border-gray-200' : 'bg-[#0a0a0a]/80 backdrop-blur-md py-4 px-6 border-white/10 shadow-2xl shadow-black/50'}`}>
        <div className="flex justify-between items-center">
          
          <div onClick={scrollToTop} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xl italic tracking-tighter transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(4,0,255,0.5)] bg-[#0400FF] text-white`}>D</div>
            <span className={`font-black text-2xl tracking-tighter uppercase hidden sm:block transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>DOTWEB</span>
          </div>
          
          <div className={`hidden md:flex gap-8 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-gray-400'}`}>
            <a href="#sistema" className={`transition-colors ${scrolled ? 'hover:text-[#0400FF]' : 'hover:text-white'}`}>Sistema</a>
            <a href="#precos" className={`transition-colors ${scrolled ? 'hover:text-[#0400FF]' : 'hover:text-white'}`}>Planos</a>
          </div>

          <button onClick={() => window.location.href = '/login'} className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 ${scrolled ? 'bg-black text-white hover:bg-[#0400FF]' : 'bg-white text-black hover:bg-gray-200'}`}>
            Acessar Painel
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0400FF] blur-[150px] opacity-30 rounded-full pointer-events-noneGlow"></div>

        {/* TAG DO TOPO: Nova Cor (Azul Sólido) e Animação Elegante (Fade-in e Zoom) */}
        <div className="inline-flex items-center gap-2 bg-[#0400FF] border border-[#0400FF]/50 text-white px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-8 relative z-10 animate-in fade-in zoom-in-95 duration-1000 shadow-[0_0_20px_rgba(4,0,255,0.4)]">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          GESTÃO DE EQUIPE ÁGIL
        </div>

        <h1 className="text-[60px] md:text-[120px] lg:text-[140px] font-black uppercase leading-[0.8] tracking-[-0.04em] relative z-10 MassiveHeader">
          O PONTO <br />
          <span className="text-[#0400FF]">SEM CAÔ.</span>
        </h1>

        <p className="mt-10 text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto relative z-10 Subtitle">
          Geolocalização cirúrgica. App direto no celular. Esqueça o papel, a planilha e os relógios caros. Controle sua equipe de onde estiver, feito para quem não tem tempo a perder.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 relative z-10 CtaButtonsContainer">
          <a href="#precos" className="w-full sm:w-auto bg-[#0400FF] text-white px-10 py-6 rounded-full font-black text-sm uppercase tracking-[0.1em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95">
            Ver Planos <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* MOCKUP COM EFEITO LIQUID GLASS FLUTUANTE */}
        <div className="mt-20 relative z-10 w-full max-w-3xl mx-auto MockupContainer animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="hidden md:flex absolute -left-16 top-1/4 z-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-float items-center gap-4 w-64 GlassElement group hover:bg-[#0400FF]/5 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity rounded-[30px]"></div>
            <div className="w-12 h-12 bg-[#0400FF]/20 rounded-full flex items-center justify-center border border-[#0400FF]/50 relative z-10">
               <Fingerprint className="w-6 h-6 text-[#0400FF]" weight="duotone" />
            </div>
            <div className="text-left relative z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ponto Registrado</p>
              <p className="text-sm text-white font-black">08:00 AM • Na Empresa</p>
            </div>
          </div>

          <img src="https://images.unsplash.com/photo-1616077168079-7e09a6a21ba6?auto=format&fit=crop&q=80&w=1000" alt="Mockup DOTWEB" className="w-full h-auto rounded-[40px] md:rounded-[60px] border-8 border-[#1a1a1a] shadow-2xl object-cover hover:grayscale-0 transition-all duration-700 hover:scale-105" />
        </div>
      </section>

      {/* LETREIRO INFINITO OUSADO */}
      <div className="bg-[#0400FF] text-white py-6 overflow-hidden flex whitespace-nowrap relative transform -rotate-2 scale-105 border-y-4 border-black MarqueeDivider">
        <div className="animate-marquee font-black text-3xl md:text-5xl uppercase tracking-tighter flex items-center gap-8">
          <span>⚡ CORTA ESSA DE BATER PONTO NO PAPEL</span> <span className="outline-text">•</span>
          <span>SISTEMA 100% CLOUD</span> <span className="outline-text">•</span>
          <span>GEOLOCALIZAÇÃO EXATA</span> <span className="outline-text">•</span>
          <span>⚡ CORTA ESSA DE BATER PONTO NO PAPEL</span> <span className="outline-text">•</span>
          <span>SISTEMA 100% CLOUD</span> <span className="outline-text">•</span>
          <span>GEOLOCALIZAÇÃO EXATA</span> <span className="outline-text">•</span>
        </div>
      </div>

      {/* BENTO GRID (SEM ÍCONES) */}
      <section id="sistema" className="py-32 px-6 max-w-7xl mx-auto BentoSection">
        <div className="mb-16 HeaderBento">
          <h2 className="text-[50px] md:text-[80px] font-black uppercase leading-[0.8] tracking-tighter mb-6HeaderBentoMassive">
            O CONTROLE NA <br/> <span className="text-gray-600">SUA MÃO.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px] BentoGrid">
          
          <div className="md:col-span-2 bg-[#111] rounded-[40px] p-10 md:p-14 relative overflow-hidden group border border-white/5 hover:border-[#0400FF]/50 transition-colors BentoCard1 hover:bg-[#0400FF]/5 flex flex-col justify-end">
            <span className="text-white font-black text-2xl tracking-tighter mb-auto block relative z-10">01</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 CardTitle relative z-10 text-white">Radar GPS</h3>
            <p className="text-gray-400 font-medium text-lg max-w-md CardText relative z-10">O ponto só bate se o colaborador estiver no raio do local de trabalho. Sem desculpas e sem fraudes no final do mês.</p>
          </div>

          <div className="bg-white text-black rounded-[40px] p-10 relative overflow-hidden BentoCard2 hover:scale-105 transition-transform duration-500 hover:border-black/20 hover:border flex flex-col justify-end">
            <span className="text-black font-black text-2xl tracking-tighter mb-auto block relative z-10">02</span>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 CardTitle relative z-10">No Bolso</h3>
            <p className="text-gray-600 font-medium text-lg CardText relative z-10 leading-snug">O funcionário bate o ponto direto pelo navegador do celular.</p>
          </div>

          <div className="bg-[#1a1a1a] text-white rounded-[40px] p-10 relative overflow-hidden group BentoCard3 border border-white/10 hover:border-[#0400FF] transition-colors hover:shadow-[0_8px_32px_0_rgba(4,0,255,0.1)] hover:bg-[#1f1f1f] flex flex-col justify-end">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0400FF]/30 rounded-full blur-3xl BgGlow opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-white font-black text-2xl tracking-tighter mb-auto block relative z-10">03</span>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 CardTitle relative z-10">Ao Vivo</h3>
            <p className="text-gray-300 font-medium text-lg CardText relative z-10 leading-snug">Abra o painel e veja na hora quem chegou e quem atrasou.</p>
          </div>

          <div className="md:col-span-2 bg-[#111] rounded-[40px] p-10 md:p-14 relative overflow-hidden group border border-white/5 BentoCard4 hover:bg-[#0400FF]/5 transition-colors duration-500 flex flex-col justify-end">
            <span className="text-white font-black text-2xl tracking-tighter mb-auto block relative z-10">04</span>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 CardTitle relative z-10 text-white">Blindagem Jurídica</h3>
            <p className="text-gray-400 font-medium text-lg max-w-xl CardText relative z-10">Dados salvos na nuvem com criptografia pesada. Os relatórios que vão salvar o seu caixa em possíveis causas trabalhistas.</p>
          </div>

        </div>
      </section>

      {/* SEÇÃO DE PREÇOS (Esta é a seção que a Navbar verifica para mudar de cor) */}
      <section id="precos" className="py-32 px-6 bg-white text-black relative rounded-t-[60px] md:rounded-t-[80px] -mt-10 PricingSection">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 HeaderPricingContainer">
            <h2 className="text-[50px] md:text-[80px] font-black uppercase leading-[0.8] tracking-tighter mb-6 HeaderPricingMassive">
              JUSTO PARA <br/> O SEU CAIXA.
            </h2>
            <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto PricingSubtitle">Sem taxas escondidas. Assine o pacote base e escale pagando centavos apenas por quem entra a mais.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch PricingGrid">
            
            <div className="bg-[#F8F9FA] rounded-[40px] p-10 border-4 border-transparent hover:border-black transition-all flex flex-col PricingCard1 group">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 CardTitle">Starter</h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-10 CardSubtitle">Ideal p/ Pequenos Negócios</p>
              
              <div className="mb-10 PricingMainNumber">
                <span className="text-lg font-black text-gray-400">R$</span>
                <span className="text-7xl font-black tracking-tighter">12</span>
                <span className="text-3xl font-black">,90</span>
                <span className="block text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-white p-5 rounded-3xl mb-auto border border-gray-200 shadow-sm PricingBreakdown">
                <p className="text-sm font-bold flex justify-between BreakdownRow">Base (até 10 func): <span className="font-black BreakdownPrice">R$ 129/mês</span></p>
                <div className="w-full h-px bg-gray-100 my-3 Divider"></div>
                <p className="text-xs font-bold text-gray-500 flex justify-between BreakdownRow">Colaborador extra: <span className="font-bold BreakdownPrice">+R$ 10,00</span></p>
              </div>

              <button className="w-full mt-8 py-5 border-4 border-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all group-hover:scale-105 active:scale-95 CardButton">Começar Agora</button>
            </div>

            <div className="bg-[#0400FF] text-white rounded-[40px] p-10 transform lg:-translate-y-8 shadow-2xl shadow-blue-500/30 flex flex-col relative PricingCard2 group">
              
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest TagMostPopular animate-pulse shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                O MAIS QUERIDO
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 mt-4 CardTitle text-white">Growth</h3>
              <p className="text-sm text-blue-200 font-bold uppercase tracking-widest mb-10 CardSubtitle">Negócios em Expansão</p>
              
              <div className="mb-10 PricingMainNumber">
                <span className="text-lg font-black text-blue-300">R$</span>
                <span className="text-8xl font-black tracking-tighter text-white">9</span>
                <span className="text-3xl font-black text-white">,45</span>
                <span className="block text-xs uppercase font-bold text-blue-300 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-black/20 p-5 rounded-3xl mb-8 backdrop-blur-md PricingBreakdown border border-white/10">
                <p className="text-sm font-bold flex justify-between BreakdownRow text-white">Base (até 20 func): <span className="font-black BreakdownPrice">R$ 189/mês</span></p>
                <div className="w-full h-px bg-white/10 my-3 Divider"></div>
                <p className="text-xs font-bold text-blue-200 flex justify-between BreakdownRow">Colaborador extra: <span className="font-bold BreakdownPrice">+R$ 7,00</span></p>
              </div>

              <ul className="text-left space-y-4 mb-auto text-sm font-bold text-blue-100 FeaturesList">
                <li className="flex items-center gap-3 FeatureItem"><CheckCircle className="w-5 h-5 text-white" weight="bold" /> Todas as funções Starter</li>
                <li className="flex items-center gap-3 FeatureItem"><CheckCircle className="w-5 h-5 text-white" weight="bold" /> Espelho de Ponto em 1 Clique</li>
              </ul>

              <button className="w-full mt-8 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform group-hover:rotate-1 CardButton">Assinar Growth</button>
            </div>

            <div className="bg-[#F8F9FA] rounded-[40px] p-10 border-4 border-transparent hover:border-black transition-all flex flex-col PricingCard3 group">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 CardTitle">Enterprise</h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-10 CardSubtitle">Para Operações Maiores</p>
              
              <div className="mb-10 PricingMainNumber">
                <span className="text-lg font-black text-gray-400">R$</span>
                <span className="text-7xl font-black tracking-tighter">6</span>
                <span className="text-3xl font-black">,78</span>
                <span className="block text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-white p-5 rounded-3xl mb-auto border border-gray-200 shadow-sm PricingBreakdown">
                <p className="text-sm font-bold flex justify-between BreakdownRow">Base (até 50 func): <span className="font-black BreakdownPrice">R$ 339/mês</span></p>
                <div className="w-full h-px bg-gray-100 my-3 Divider"></div>
                <p className="text-xs font-bold text-gray-500 flex justify-between BreakdownRow">Colaborador extra: <span className="font-bold BreakdownPrice">+R$ 4,00</span></p>
              </div>

              <button className="w-full mt-8 py-5 border-4 border-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all group-hover:scale-105 CardButton">Falar com Comercial</button>
            </div>

          </div>
          
          <div className="mt-12 text-center bg-blue-50 border-2 border-dashed border-[#0400FF] p-6 rounded-3xl max-w-3xl mx-auto AnnualDiscountTag group hover:bg-[#0400FF] transition-colors duration-500 overflow-hidden">
             <p className="text-sm font-black text-[#0400FF] flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500">
              <Lightning className="w-5 h-5 animate-pulse" weight="bold" /> Assine o Anual e leve 2 meses de graça.
            </p>
             <p className="text-xs text-gray-500 mt-2 group-hover:text-blue-100 transition-colors duration-500">+50 funcionários? Chama a gente no zap para um desconto agressivo.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-24 px-6 md:px-10 text-gray-500 border-t border-white/5 rounded-t-[60px] md:rounded-t-[80px] -mt-10 DetailedFooter z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 FooterGrid">
          
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 ColLogoSummary">
            <div className="flex items-center gap-3 LogoFooterContainer">
              <div className="w-10 h-10 rounded-full bg-[#0400FF] flex items-center justify-center text-white font-black text-xl italic tracking-tighterLogoIcon">D</div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter text-left LogoText">DOTWEB</h2>
            </div>
            <p className="text-xs text-gray-700 font-medium text-left Max-w-xs ResumoText">Ponto digital e gestão de equipe sem complicação para quem faz o negócio girar.</p>
          </div>

          <div className="ColProduto text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 ColHeader">Produto</h4>
            <ul className="space-y-3 font-bold text-sm ColList">
              <li><a href="#sistema" className="hover:text-white hover:underline transition-all">Como Funciona</a></li>
              <li><a href="#sistema" className="hover:text-white hover:underline transition-all">App Mobile</a></li>
              <li><a href="/login" className="hover:text-white hover:underline transition-all">Entrar no Painel</a></li>
            </ul>
          </div>

          <div className="ColPlanos text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 ColHeader">Planos</h4>
            <ul className="space-y-3 font-bold text-sm ColList">
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Starter</a></li>
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Growth</a></li>
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Enterprise</a></li>
            </ul>
          </div>

          <div className="ColInstitucional text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 ColHeader">A Empresa</h4>
            <ul className="space-y-3 font-bold text-sm ColList">
              <li><a href="https://wa.me/55..." target="_blank" className="hover:text-white hover:underline transition-all">Fale com a gente</a></li>
              <li><a href="/termos" className="hover:text-white hover:underline transition-all">Termos de Uso</a></li>
              <li><a href="/privacidade" className="hover:text-white hover:underline transition-all">Privacidade</a></li>
            </ul>
          </div>

          <div className="ColSocial md:text-right md:col-span-1 text-left flex flex-col md:items-end gap-6 col-span-2SocialCol">
            <h4 className="font-black text-white uppercase tracking-widest text-xsSocialColHeader">Atendimento</h4>
            <a href="https://wa.me/55..." target="_blank" className="flex items-center gap-3 bg-[#1a1a1a] border-2 border-white/5 hover:border-green-400 hover:text-green-400 p-4 rounded-3xl group transition-all text-xs font-black uppercase tracking-widestTagWhatsapp">
               <Lightning className="w-5 h-5 animate-pulse text-green-400" weight="duotone" />
               Chamar no Zap
               <CheckCircle className="w-4 h-4 text-green-400 opacity-50" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 CopyrightLine">
           <p className="text-[10px] text-gray-800 font-bold uppercase tracking-widest flex items-center justify-between text-left gap-2 flex-wrap CopyrightText">
             <span>© 2026 DOTWEB POINT SOLUTIONS LTDA.</span>
             <span>Todos os direitos reservados.</span>
             <span>CNPJ 99.999.999/0001-99</span>
             <span>Tecnologia feita para quem faz acontecer.</span>
           </p>
        </div>
      </footer>

    </div>
  );
}