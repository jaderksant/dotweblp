import { useEffect, useState } from 'react';
import { CheckCircle, WhatsappLogo, RocketLaunch, ShieldCheck } from '@phosphor-icons/react';

export default function BoasVindas() {
  const [showContent, setShowContent] = useState(false);

  // Link do WhatsApp com mensagem pré-programada para a implantação
  const linkWhatsImplatacao = "https://wa.me/5514996392691?text=Olá,%20acabei%20de%20assinar%20a%20Dotweb%20e%20quero%20iniciar%20a%20minha%20implantação!%20";

  useEffect(() => {
    // Efeito de entrada suave
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-inter overflow-hidden selection:bg-[#0400FF] selection:text-white flex items-center justify-center relative px-4">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#0400FF] blur-[150px] opacity-10 rounded-full pointer-events-none"></div>

      {/* NAVBAR SIMPLIFICADA */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex justify-center">
        <div className="flex items-center gap-3 cursor-default">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xl italic bg-[#0400FF] text-white shadow-[0_0_15px_rgba(4,0,255,0.4)]">D</div>
          <span className="font-black text-2xl tracking-tighter uppercase text-black">DOTWEB</span>
        </div>
      </nav>

      {/* CARD CENTRAL */}
      <div 
        className={`relative z-10 max-w-2xl w-full bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-[30px] md:rounded-[40px] p-8 md:p-12 text-center transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        style={{ WebkitBackdropFilter: 'blur(24px)' }}
      >
        
        {/* ÍCONE DE SUCESSO ANIMADO */}
        <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 md:mb-8 border-4 border-white shadow-lg relative">
          <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
          <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-500" weight="fill" />
        </div>

        {/* TEXTOS */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-[10px] font-black uppercase tracking-widest text-green-600 mb-6">
          <ShieldCheck weight="bold" className="w-4 h-4" /> Pagamento Aprovado
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-black leading-none">
          BEM-VINDO À <br/><span className="text-[#0400FF]">DOTWEB.</span>
        </h1>
        
        <p className="text-sm md:text-base font-medium text-gray-500 max-w-md mx-auto mb-8 md:mb-10 leading-relaxed">
          Sua assinatura foi processada com sucesso. Para garantir que sua cerca virtual e regras de ponto funcionem perfeitamente, <strong className="text-black">nossa equipe fará a implantação inicial junto com você.</strong>
        </p>

        {/* CAIXA DE AÇÃO */}
        <div className="bg-[#F8F9FA] border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col items-center gap-6">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Próximo Passo</h3>
            <p className="text-sm font-bold text-black">Chame nosso time no WhatsApp para liberar seu acesso e configurar seu painel.</p>
          </div>

          <a 
            href={linkWhatsImplatacao} 
            target="_blank" 
            rel="noreferrer" 
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all active:scale-95 shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_10px_40px_rgba(34,197,94,0.4)]"
          >
            <WhatsappLogo className="w-6 h-6 md:w-7 md:h-7" weight="regular" />
            Iniciar Implantação
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <RocketLaunch className="w-4 h-4" weight="fill" />
          Preparando o terreno para sua gestão ágil
        </div>

      </div>
    </div>
  );
}