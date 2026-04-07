import { useEffect } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';

export default function Teste({ voltarInicio }: { voltarInicio: () => void }) {
  const linkWhatsTeste = "https://wa.me/5514996392691?text=Olá,%20eu%20li%20as%20regras%20e%20quero%20iniciar%20meu%20teste%20de%207%20dias%20na%20dotweb!%20🚀";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-inter overflow-x-hidden selection:bg-[#0400FF] selection:text-white pb-20">
      
      <style>{`
        html { scroll-behavior: smooth; }
        .dark-shine-card {
          position: relative;
          overflow: hidden;
          background: #050505;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          transform: translateZ(0);
        }
        .dark-shine-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 60%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
          transform: skewX(-25deg);
          transition: 0.75s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .dark-shine-card:hover::after { left: 150%; }
        .dark-shine-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 25px 50px -12px rgba(4, 0, 255, 0.25);
          transform: translateY(-8px) translateZ(0);
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[90%] max-w-5xl rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-xl py-3 px-4 md:py-4 md:px-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div onClick={voltarInicio} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-lg md:text-xl italic bg-[#0400FF] text-white shadow-[0_0_15px_rgba(4,0,255,0.4)]">D</div>
            <span className="font-black text-xl md:text-2xl tracking-tighter uppercase hidden sm:block text-black">DOTWEB</span>
          </div>
          <button onClick={voltarInicio} className="text-xs font-bold text-gray-500 hover:text-[#0400FF] transition-colors uppercase tracking-widest">
            Voltar ao Início
          </button>
        </div>
      </nav>

      {/* HERO DO TESTE */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#0400FF] blur-[150px] opacity-10 rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0400FF] px-4 py-2 md:px-5 md:py-2.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 relative z-10">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#0400FF] animate-pulse"></span>
          HOMOLOGAÇÃO DE SISTEMA
        </div>
        
        <h1 className="text-[36px] sm:text-[45px] md:text-[80px] font-black uppercase leading-[0.9] tracking-tighter relative z-10 text-black mb-6">
          TESTE NA <span className="text-[#0400FF]">PRÁTICA.</span>
        </h1>
        
        <p className="text-sm sm:text-base md:text-xl text-gray-600 font-medium max-w-2xl mx-auto relative z-10 px-2 leading-relaxed">
          Antes de colocar a empresa inteira, cadastre uma pequena equipe de testes e veja com seus próprios olhos como o nosso radar GPS e o modo offline funcionam.
        </p>
      </section>

      {/* REGRAS DO JOGO */}
      <section className="relative pt-16 md:pt-24 px-4 md:px-6 max-w-6xl mx-auto z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Como funciona a liberação</h2>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">As 3 Regras do Teste</h3>
        </div>

        {/* GRID COM AUTO-ROWS-FR PARA MANTER ALTURA IGUAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          
          {/* CARD 01 */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative group flex flex-col text-left h-full">
            <span className="text-white/30 font-black text-xl md:text-3xl tracking-tighter block mb-6 md:mb-8">01</span>
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 md:mb-4 text-white">7 Dias de Acesso</h4>
            <p className="text-gray-400 font-medium text-sm sm:text-base leading-relaxed">
              Você terá uma semana inteira para usar a plataforma completa. Tempo suficiente para fechar uma folha de ponto semanal da sua equipe de teste.
            </p>
          </div>

          {/* CARD 02 */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative group flex flex-col text-left h-full">
            <span className="text-white/30 font-black text-xl md:text-3xl tracking-tighter block mb-6 md:mb-8">02</span>
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 md:mb-4 text-white">Até 3 Cadastros</h4>
            <p className="text-gray-400 font-medium text-sm sm:text-base leading-relaxed">
              Durante o período de avaliação, o limite é de 3 funcionários. Ideal para você testar a ferramenta junto com seu RH e gerentes de confiança.
            </p>
          </div>

          {/* CARD 03 */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-8 md:p-10 relative group flex flex-col text-left h-full">
            <span className="text-white/30 font-black text-xl md:text-3xl tracking-tighter block mb-6 md:mb-8">03</span>
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-3 md:mb-4 text-white">Sem Cartão</h4>
            <p className="text-gray-400 font-medium text-sm sm:text-base leading-relaxed">
              Não pedimos cartão de crédito para liberar. Se você não gostar (o que duvidamos), sua conta é cancelada automaticamente após o fim do teste.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-24 flex flex-col items-center">
           <button onClick={() => window.open(linkWhatsTeste, '_blank')} className="w-full sm:w-auto px-10 py-5 sm:px-14 sm:py-6 rounded-full font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 bg-[#0400FF] text-white hover:bg-blue-700 shadow-[0_15px_40px_rgba(4,0,255,0.3)] flex items-center justify-center gap-3">
             <WhatsappLogo size={24} weight="regular" /> Quero iniciar meu teste
           </button>
        </div>
      </section>

    </div>
  );
}