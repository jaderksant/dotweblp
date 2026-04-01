import { useEffect, useState } from 'react';
import { ArrowRight, Lightning, CheckCircle, Fingerprint } from '@phosphor-icons/react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  // Link do WhatsApp com a mensagem padrão de teste
  const linkWhatsTeste = "https://wa.me/5514996392691?text=Olá,%20eu%20quero%20testar%20a%20dotweb%20por%207%20dias!%20🕑";

  useEffect(() => {
    const handleScroll = () => {
      const precosSection = document.getElementById('precos');
      if (precosSection) {
        const rect = precosSection.getBoundingClientRect();
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
        /* GARANTE QUE O SCROLL DOS BOTÕES SEJA SUAVE */
        html { scroll-behavior: smooth; }
        
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
        @keyframes entrance-spin {
          0% { transform: scale(0) rotate(-360deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-entrance-spin {
          animation: entrance-spin 1.5s ease-out forwards;
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

      {/* NAVBAR */}
      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] md:w-[90%] max-w-5xl rounded-full border ${scrolled ? 'bg-white/90 backdrop-blur-3xl py-2.5 px-4 md:py-3 md:px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border-gray-200' : 'bg-[#0a0a0a]/80 backdrop-blur-md py-3 px-4 md:py-4 md:px-6 border-white/10 shadow-2xl shadow-black/50'}`}>
        <div className="flex justify-between items-center">
          
          <div onClick={scrollToTop} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-lg md:text-xl italic tracking-tighter transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(4,0,255,0.5)] bg-[#0400FF] text-white`}>D</div>
            <span className={`font-black text-xl md:text-2xl tracking-tighter uppercase hidden sm:block transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>DOTWEB</span>
          </div>
          
          <div className={`hidden md:flex gap-8 font-black text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-gray-600' : 'text-gray-400'}`}>
            <a href="#sistema" className={`transition-colors ${scrolled ? 'hover:text-[#0400FF]' : 'hover:text-white'}`}>Sistema</a>
            <a href="#precos" className={`transition-colors ${scrolled ? 'hover:text-[#0400FF]' : 'hover:text-white'}`}>Planos</a>
          </div>

          <button onClick={() => window.open(linkWhatsTeste, '_blank')} className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 ${scrolled ? 'bg-black text-white hover:bg-[#0400FF] shadow-lg' : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}>
            Testar Grátis
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#0400FF] blur-[100px] md:blur-[150px] opacity-30 rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-[#0400FF] border border-[#0400FF]/50 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 relative z-10 animate-in fade-in zoom-in-95 duration-1000 shadow-[0_0_20px_rgba(4,0,255,0.4)]">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse"></span>
          GESTÃO DE EQUIPE ÁGIL
        </div>

        <h1 className="text-[45px] sm:text-[60px] md:text-[120px] lg:text-[140px] font-black uppercase leading-[0.85] md:leading-[0.8] tracking-[-0.04em] relative z-10">
          O PONTO <br />
          <span className="text-[#0400FF]">SEM CAÔ.</span>
        </h1>

        <p className="mt-6 md:mt-10 text-base md:text-xl text-gray-400 font-medium max-w-2xl mx-auto relative z-10">
          Geolocalização cirúrgica. App direto no celular. Esqueça o papel, a planilha e os relógios caros. Controle sua equipe de onde estiver, feito para quem não tem tempo a perder.
        </p>

        {/* BOTAO ATUALIZADO AQUI - ANCORA PARA A SEÇÃO #SISTEMA */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full sm:w-auto">
          <a href="#sistema" className="w-full sm:w-auto bg-[#0400FF] text-white px-8 py-5 md:px-10 md:py-6 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.1em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95">
            Veja as Vantagens e Recursos <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>

        <div className="mt-16 md:mt-20 relative z-10 w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="hidden md:flex absolute -left-16 top-1/4 z-20 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[30px] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-float items-center gap-4 w-64 group hover:bg-[#0400FF]/5 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity rounded-[30px]"></div>
            <div className="w-12 h-12 bg-[#0400FF]/20 rounded-full flex items-center justify-center border border-[#0400FF]/50 relative z-10">
               <Fingerprint className="w-6 h-6 text-[#0400FF]" weight="duotone" />
            </div>
            <div className="text-left relative z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ponto Registrado</p>
              <p className="text-sm text-white font-black">08:00 AM • Na Empresa</p>
            </div>
          </div>

          <img src="https://images.unsplash.com/photo-1616077168079-7e09a6a21ba6?auto=format&fit=crop&q=80&w=1000" alt="Mockup DOTWEB" className="w-full h-auto rounded-[30px] md:rounded-[60px] border-4 md:border-8 border-[#1a1a1a] shadow-2xl object-cover hover:grayscale-0 transition-all duration-700 hover:scale-105" />
        </div>
      </section>

      {/* LETREIRO INFINITO */}
      <div className="bg-[#0400FF] text-white py-4 md:py-6 overflow-hidden flex whitespace-nowrap relative transform -rotate-2 scale-105 border-y-2 md:border-y-4 border-black">
        <div className="animate-marquee font-black text-2xl md:text-5xl uppercase tracking-tighter flex items-center gap-6 md:gap-8">
          <span>⚡ CORTA ESSA DE BATER PONTO NO PAPEL</span> <span className="outline-text">•</span>
          <span>SISTEMA 100% CLOUD</span> <span className="outline-text">•</span>
          <span>GEOLOCALIZAÇÃO EXATA</span> <span className="outline-text">•</span>
          <span>⚡ CORTA ESSA DE BATER PONTO NO PAPEL</span> <span className="outline-text">•</span>
          <span>SISTEMA 100% CLOUD</span> <span className="outline-text">•</span>
          <span>GEOLOCALIZAÇÃO EXATA</span> <span className="outline-text">•</span>
        </div>
      </div>

      {/* BENTO GRID */}
      <section id="sistema" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-[40px] sm:text-[50px] md:text-[80px] font-black uppercase leading-[0.85] md:leading-[0.8] tracking-tighter mb-4 md:mb-6">
            O CONTROLE NA <br/> <span className="text-gray-600">SUA MÃO.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[320px]">
          
          <div className="md:col-span-2 bg-[#111] rounded-[30px] md:rounded-[40px] p-8 md:p-14 relative overflow-hidden group border border-white/5 hover:border-[#0400FF]/50 transition-colors hover:bg-[#0400FF]/5 flex flex-col justify-end">
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter mb-auto block relative z-10">01</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 md:mb-4 relative z-10 text-white mt-8 md:mt-0">Radar GPS</h3>
            <p className="text-gray-400 font-medium text-base md:text-lg max-w-md relative z-10">O ponto só bate se o colaborador estiver no raio do local de trabalho. Sem desculpas e sem fraudes no final do mês.</p>
          </div>

          <div className="bg-white text-black rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative overflow-hidden hover:scale-105 transition-transform duration-500 hover:border-black/20 hover:border flex flex-col justify-end">
            <span className="text-black font-black text-xl md:text-2xl tracking-tighter mb-auto block relative z-10">02</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3 md:mb-4 relative z-10 mt-8 md:mt-0">No Bolso</h3>
            <p className="text-gray-600 font-medium text-base md:text-lg relative z-10 leading-snug">O funcionário bate o ponto direto pelo navegador do celular.</p>
          </div>

          <div className="bg-[#1a1a1a] text-white rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative overflow-hidden group border border-white/10 hover:border-[#0400FF] transition-colors hover:shadow-[0_8px_32px_0_rgba(4,0,255,0.1)] hover:bg-[#1f1f1f] flex flex-col justify-end">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#0400FF]/30 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter mb-auto block relative z-10">03</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3 md:mb-4 relative z-10 mt-8 md:mt-0">Ao Vivo</h3>
            <p className="text-gray-300 font-medium text-base md:text-lg relative z-10 leading-snug">Abra o painel e veja na hora quem chegou e quem atrasou.</p>
          </div>

          <div className="md:col-span-2 bg-[#111] rounded-[30px] md:rounded-[40px] p-8 md:p-14 relative overflow-hidden group border border-white/5 hover:bg-[#0400FF]/5 transition-colors duration-500 flex flex-col justify-end">
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter mb-auto block relative z-10">04</span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 md:mb-4 relative z-10 text-white mt-8 md:mt-0">Blindagem Jurídica</h3>
            <p className="text-gray-400 font-medium text-base md:text-lg max-w-xl relative z-10">Dados salvos na nuvem com criptografia pesada. Os relatórios que vão salvar o seu caixa em possíveis causas trabalhistas.</p>
          </div>

        </div>
      </section>

      {/* SEÇÃO DE PREÇOS */}
      <section id="precos" className="py-20 md:py-32 px-4 md:px-6 bg-white text-black relative rounded-t-[40px] md:rounded-t-[80px] -mt-5 md:-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-[40px] sm:text-[50px] md:text-[80px] font-black uppercase leading-[0.85] md:leading-[0.8] tracking-tighter mb-4 md:mb-6">
              JUSTO PARA <br/> O SEU CAIXA.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto">Sem taxas escondidas. Assine o pacote base e escale pagando centavos apenas por quem entra a mais.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 items-stretch">
            
            <div className="bg-[#F8F9FA] rounded-[30px] md:rounded-[40px] p-8 md:p-10 border-4 border-transparent hover:border-black transition-all flex flex-col group">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 md:mb-2">Starter</h3>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mb-8 md:mb-10">Ideal p/ Pequenos Negócios</p>
              
              <div className="mb-8 md:mb-10">
                <span className="text-base md:text-lg font-black text-gray-400">R$</span>
                <span className="text-6xl md:text-7xl font-black tracking-tighter">12</span>
                <span className="text-2xl md:text-3xl font-black">,90</span>
                <span className="block text-[10px] md:text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-white p-5 rounded-2xl md:rounded-3xl mb-auto border border-gray-200 shadow-sm">
                <p className="text-xs md:text-sm font-bold flex justify-between">Base (até 10 func): <span className="font-black">R$ 129/mês</span></p>
                <div className="w-full h-px bg-gray-100 my-3"></div>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 flex justify-between">Colaborador extra: <span className="font-bold">+R$ 10,00</span></p>
              </div>

              <button onClick={() => window.open('https://wa.me/5514996392691?text=olá,%20quero%20assinar%20o%20plano%20Starter%20da%20dotweb!%20🚀', '_blank')} className="w-full mt-8 py-4 md:py-5 border-4 border-black rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all group-hover:scale-105 active:scale-95">Assinar Starter</button>
            </div>

            <div className="bg-[#0400FF] text-white rounded-[30px] md:rounded-[40px] p-8 md:p-10 transform lg:-translate-y-8 shadow-2xl shadow-blue-500/30 flex flex-col relative group">
              
              <div className="absolute top-5 right-5 md:top-6 md:right-6 bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest animate-pulse shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
                O MAIS QUERIDO
              </div>
              
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 md:mb-2 mt-4 text-white">Growth</h3>
              <p className="text-xs md:text-sm text-blue-200 font-bold uppercase tracking-widest mb-8 md:mb-10">Negócios em Expansão</p>
              
              <div className="mb-8 md:mb-10">
                <span className="text-base md:text-lg font-black text-blue-300">R$</span>
                <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">9</span>
                <span className="text-2xl md:text-3xl font-black text-white">,45</span>
                <span className="block text-[10px] md:text-xs uppercase font-bold text-blue-300 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-black/20 p-5 rounded-2xl md:rounded-3xl mb-6 md:mb-8 backdrop-blur-md border border-white/10">
                <p className="text-xs md:text-sm font-bold flex justify-between text-white">Base (até 20 func): <span className="font-black">R$ 189/mês</span></p>
                <div className="w-full h-px bg-white/10 my-3"></div>
                <p className="text-[10px] md:text-xs font-bold text-blue-200 flex justify-between">Colaborador extra: <span className="font-bold">+R$ 7,00</span></p>
              </div>

              <ul className="text-left space-y-3 md:space-y-4 mb-auto text-xs md:text-sm font-bold text-blue-100">
                <li className="flex items-start md:items-center gap-3"><CheckCircle className="w-5 h-5 text-white shrink-0" weight="bold" /> Todas as funções Starter</li>
                <li className="flex items-start md:items-center gap-3"><CheckCircle className="w-5 h-5 text-white shrink-0" weight="bold" /> Espelho de Ponto em 1 Clique</li>
              </ul>

              <button onClick={() => window.open('https://wa.me/5514996392691?text=olá,%20quero%20assinar%20o%20plano%20Growth%20da%20dotweb!%20🚀', '_blank')} className="w-full mt-8 py-4 md:py-5 bg-white text-black rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform group-hover:rotate-1">Assinar Growth</button>
            </div>

            <div className="bg-[#F8F9FA] rounded-[30px] md:rounded-[40px] p-8 md:p-10 border-4 border-transparent hover:border-black transition-all flex flex-col group">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 md:mb-2">Enterprise</h3>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest mb-8 md:mb-10">Para Operações Maiores</p>
              
              <div className="mb-8 md:mb-10">
                <span className="text-base md:text-lg font-black text-gray-400">R$</span>
                <span className="text-6xl md:text-7xl font-black tracking-tighter">6</span>
                <span className="text-2xl md:text-3xl font-black">,78</span>
                <span className="block text-[10px] md:text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por colaborador / mês</span>
              </div>
              
              <div className="bg-white p-5 rounded-2xl md:rounded-3xl mb-auto border border-gray-200 shadow-sm">
                <p className="text-xs md:text-sm font-bold flex justify-between">Base (até 50 func): <span className="font-black">R$ 339/mês</span></p>
                <div className="w-full h-px bg-gray-100 my-3"></div>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 flex justify-between">Colaborador extra: <span className="font-bold">+R$ 4,00</span></p>
              </div>

              <button onClick={() => window.open('https://wa.me/5514996392691?text=olá,%20gostaria%20de%20falar%20com%20um%20consultor%20sobre%20o%20plano%20Enterprise%20da%20dotweb!%20💼', '_blank')} className="w-full mt-8 py-4 md:py-5 border-4 border-black rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all group-hover:scale-105">Falar com Comercial</button>
            </div>

          </div>
          
          <div className="mt-10 md:mt-12 text-center bg-blue-50 border-2 border-dashed border-[#0400FF] p-5 md:p-6 rounded-2xl md:rounded-3xl max-w-3xl mx-auto group hover:bg-[#0400FF] transition-colors duration-500 overflow-hidden">
             <p className="text-xs md:text-sm font-black text-[#0400FF] flex items-center justify-center gap-2 md:gap-3 group-hover:text-white transition-colors duration-500">
              <Lightning className="w-4 h-4 md:w-5 md:h-5 animate-pulse" weight="bold" /> Assine o Anual e leve 2 meses de graça.
            </p>
             <p className="text-[10px] md:text-xs text-gray-500 mt-2 group-hover:text-blue-100 transition-colors duration-500">+50 funcionários? Chama a gente no zap para um desconto agressivo.</p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16 md:py-24 px-4 md:px-10 text-gray-500 border-t border-white/5 rounded-t-[40px] md:rounded-t-[80px] -mt-5 md:-mt-10 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-12">
          
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0400FF] flex items-center justify-center text-white font-black text-xl italic tracking-tighter">D</div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">DOTWEB</h2>
            </div>
            <p className="text-xs text-gray-700 font-medium max-w-xs mx-auto sm:mx-0">Ponto digital e gestão de equipe sem complicação para quem faz o negócio girar.</p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6">Produto</h4>
            <ul className="space-y-3 font-bold text-xs md:text-sm">
              <li><a href="#sistema" className="hover:text-white hover:underline transition-all">Como Funciona</a></li>
              <li><a href="#sistema" className="hover:text-white hover:underline transition-all">App Mobile</a></li>
              <li><a href={linkWhatsTeste} target="_blank" rel="noreferrer" className="hover:text-[#0400FF] hover:underline transition-all">Testar Sistema</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6">Planos</h4>
            <ul className="space-y-3 font-bold text-xs md:text-sm">
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Starter</a></li>
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Growth</a></li>
              <li><a href="#precos" className="hover:text-white hover:underline transition-all">Enterprise</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6">A Empresa</h4>
            <ul className="space-y-3 font-bold text-xs md:text-sm">
              <li><a href={linkWhatsTeste} target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-all">Fale com a gente</a></li>
              <li><a href="/termos" className="hover:text-white hover:underline transition-all">Termos de Uso</a></li>
              <li><a href="/privacidade" className="hover:text-white hover:underline transition-all">Privacidade</a></li>
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-end gap-6 mt-4 md:mt-0">
            <h4 className="font-black text-white uppercase tracking-widest text-[10px] md:text-xs hidden md:block">Atendimento</h4>
            <a href={linkWhatsTeste} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#1a1a1a] border-2 border-white/5 hover:border-green-400 hover:text-green-400 p-3.5 md:p-4 rounded-full md:rounded-3xl group transition-all text-[10px] md:text-xs font-black uppercase tracking-widest">
               <Lightning className="w-4 h-4 md:w-5 md:h-5 animate-pulse text-green-400" weight="duotone" />
               Chamar no Zap
               <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400 opacity-50" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/5">
           <p className="text-[9px] md:text-[10px] text-gray-800 font-bold uppercase tracking-widest flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
             <span>© 2026 DOTWEB POINT SOLUTIONS LTDA.</span>
             <span className="hidden sm:inline">Todos os direitos reservados.</span>
             <span>CNPJ 99.999.999/0001-99</span>
             <span className="hidden md:inline">Tecnologia feita para quem faz acontecer.</span>
           </p>
        </div>
      </footer>

    </div>
  );
}