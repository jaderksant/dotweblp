import { useEffect, useState } from 'react';
import { CaretLeft, CaretDown, ShieldCheck, FileText, WhatsappLogo } from '@phosphor-icons/react';

export default function Termos({ voltarInicio }: { voltarInicio: () => void }) {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);
  const [duvida, setDuvida] = useState("");

  const linkWhatsTeste = "https://wa.me/5514996392691?text=Olá,%20eu%20quero%20testar%20a%20dotweb%20por%207%20dias!%20🕑";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqAberto(faqAberto === index ? null : index);
  };

  const enviarDuvidaWhatsApp = () => {
    if (!duvida.trim()) return; // Não envia se estiver vazio
    const textoCodificado = encodeURIComponent(`OLÁ TENHO UMA DÚVIDA SOBRE A DOT: ${duvida}`);
    window.open(`https://wa.me/5514996392691?text=${textoCodificado}`, '_blank');
  };

  const faqs = [
    {
      pergunta: "O DOTWEB é legalizado pelo Ministério do Trabalho?",
      resposta: "Sim! Nosso sistema é totalmente adequado à Portaria 671 do MTE. Nós geramos o Arquivo Fonte de Dados (AFD) e o espelho de ponto digital com validade jurídica para a sua proteção e do seu colaborador."
    },
    {
      pergunta: "O que acontece se o funcionário ficar sem internet na rua?",
      resposta: "Nosso aplicativo possui tecnologia offline. O colaborador bate o ponto normalmente, o sistema captura o horário e a localização GPS, criptografa no celular e, assim que ele se conectar ao Wi-Fi ou 4G/5G, os dados sobem para o painel automaticamente."
    },
    {
      pergunta: "O aplicativo é pesado? Funciona em celular antigo?",
      resposta: "O DOTWEB é um PWA (Progressive Web App). Isso significa que ele não precisa ser baixado na lojinha e não rouba a memória do celular do colaborador. Ele 'instala' direto pelo navegador na tela inicial e roda liso até nos aparelhos mais antigos e básicos."
    },
    {
      pergunta: "E se o funcionário usar aplicativo de Fake GPS?",
      resposta: "Nosso sistema cruza dados de rede e possui tecnologias para identificar e inibir aplicativos de falsificação de localização. A geolocalização é cirúrgica, protegendo a sua empresa contra batidas de ponto fraudulentas."
    },
    {
      pergunta: "Consigo enviar os dados para o meu contador?",
      resposta: "Com certeza. No painel administrativo, você pode exportar os relatórios completos do mês em PDF ou no formato padrão AFD, que qualquer sistema de contabilidade (Domínio, Alterdata, etc) consegue ler."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-inter overflow-x-hidden selection:bg-[#0400FF] selection:text-white pb-20">
      
      <style>{`
        html { scroll-behavior: smooth; }
        /* Animação do Card Preto */
        .anime-shine-card {
          position: relative;
          overflow: hidden;
          background: #050505; /* Fundo Pretão */
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
          transform: translateZ(0);
        }
        .anime-shine-card::after {
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
        .anime-shine-card:hover::after { left: 150%; }
        .anime-shine-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 40px -10px rgba(4, 0, 255, 0.3);
          transform: translateY(-4px) translateZ(0);
        }
      `}</style>

      {/* NAVBAR SIMPLIFICADA */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[90%] max-w-5xl rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-xl py-3 px-4 md:py-4 md:px-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div onClick={voltarInicio} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-lg md:text-xl italic bg-[#0400FF] text-white shadow-[0_0_15px_rgba(4,0,255,0.4)]">D</div>
            <span className="font-black text-xl md:text-2xl tracking-tighter uppercase hidden sm:block text-black">DOTWEB</span>
          </div>
          <button onClick={voltarInicio} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#0400FF] transition-colors uppercase tracking-widest">
            <CaretLeft weight="bold" /> Voltar
          </button>
        </div>
      </nav>

      {/* HEADER DA PÁGINA */}
      <section className="pt-32 sm:pt-40 pb-10 px-4 md:px-6 max-w-3xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-[36px] sm:text-[45px] md:text-[60px] font-black uppercase leading-[0.9] tracking-tighter text-black mb-4">
          Ajuda e <br/> <span className="text-[#0400FF]">Termos de Uso</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl">
          Tire suas dúvidas rápidas e leia as regras do jogo que protegem a sua empresa e a nossa tecnologia.
        </p>
      </section>

      {/* SESSÃO 1: SELO MTE E FAQ */}
      <section className="pt-4 px-4 md:px-6 max-w-4xl mx-auto z-10 mb-16">
        
        {/* SELO MTE EM DESTAQUE (CARD PRETO ANIMADO) */}
        <div className="anime-shine-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center mb-10 shadow-xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tighter mb-3">Adequado à Portaria 671 do MTE</h3>
          <p className="text-sm sm:text-base text-gray-400 font-medium max-w-2xl leading-relaxed">
            Nosso sistema cumpre todas as exigências técnicas da legislação trabalhista para Registro Eletrônico de Ponto, garantindo segurança jurídica total em caso de fiscalizações.
          </p>
        </div>

        {/* FAQ EXPANSÍVEL */}
        <div className="bg-white rounded-[24px] sm:rounded-[30px] shadow-sm border border-gray-100 p-6 sm:p-10">
          <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[#0400FF]" size={28} weight="fill" /> Dúvidas Frequentes
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(index)} 
                  className="w-full flex items-center justify-between p-4 sm:p-5 bg-gray-50 hover:bg-blue-50/50 transition-colors text-left gap-4"
                >
                  <span className="font-bold text-black text-sm sm:text-base">{faq.pergunta}</span>
                  <CaretDown 
                    className={`shrink-0 text-[#0400FF] transition-transform duration-300 ${faqAberto === index ? 'rotate-180' : ''}`} 
                    weight="bold" 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${faqAberto === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-4 sm:p-5 bg-white text-sm sm:text-base text-gray-600 font-medium border-t border-gray-100">
                    {faq.resposta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CAIXA DE DÚVIDA CUSTOMIZADA */}
          <div className="mt-8 bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center">
             <h4 className="text-sm sm:text-base font-black text-black uppercase tracking-tighter mb-1">Ainda tem alguma dúvida?</h4>
             <p className="text-xs sm:text-sm text-gray-500 font-medium mb-5">Escreva abaixo e fale direto com nosso suporte no WhatsApp.</p>
             
             <div className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
               <input 
                 type="text" 
                 value={duvida}
                 onChange={(e) => setDuvida(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && enviarDuvidaWhatsApp()}
                 placeholder="Ex: Como funciona o espelho de ponto?" 
                 className="flex-1 bg-white border border-gray-300 rounded-xl sm:rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#0400FF] focus:ring-1 focus:ring-[#0400FF] transition-all text-black font-medium"
               />
               <button 
                 onClick={enviarDuvidaWhatsApp}
                 className="bg-[#0400FF] text-white px-6 py-3 rounded-xl sm:rounded-full font-black text-[11px] sm:text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
               >
                 <WhatsappLogo size={18} weight="regular" /> Enviar Dúvida
               </button>
             </div>
          </div>

        </div>
      </section>

      {/* SESSÃO 2: TERMOS DE USO LEGAIS */}
      <section className="px-4 md:px-6 max-w-4xl mx-auto z-10">
        <div className="bg-white p-8 sm:p-12 rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 space-y-10">
          
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
             <FileText className="text-[#0400FF]" size={32} weight="duotone" />
             <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter">Termos e Condições</h2>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-3">1. Licença de Uso</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              A DOTWEB concede à sua empresa uma licença revogável, não exclusiva e intransferível para usar nosso sistema de controle de ponto. O acesso é liberado mediante o pagamento da assinatura referente ao plano escolhido.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-3">2. Disponibilidade do Sistema (SLA)</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Garantimos um tempo de atividade (uptime) de 99% em nossos servidores. Podem ocorrer paradas programadas para manutenção, preferencialmente realizadas durante a madrugada, com aviso prévio no painel do administrador.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-3">3. Responsabilidades da Empresa</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700 mb-4">A empresa contratante (você) é a única responsável por:</p>
            <ul className="list-disc pl-5 text-sm md:text-base leading-relaxed font-medium text-gray-700 space-y-2">
              <li>Orientar seus funcionários sobre o uso correto do aplicativo e a exigência de ativação do GPS.</li>
              <li>Manter os pagamentos da assinatura em dia para evitar a suspensão do acesso ao painel de relatórios.</li>
              <li>Garantir a veracidade dos dados cadastrais inseridos no sistema.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-3">4. Limitação de Responsabilidade</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              A DOTWEB não se responsabiliza por danos físicos aos aparelhos celulares dos colaboradores, falhas de cobertura da operadora de internet do funcionário ou uso indevido do sistema para fraudar horários (embora nossa tecnologia vise impedir tais atos).
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tighter mb-3">5. Inadimplência e Cancelamento</h3>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Em caso de atraso no pagamento superior a 7 (sete) dias, o acesso ao painel administrativo poderá ser suspenso. O cancelamento da assinatura pode ser feito a qualquer momento, sem multa (exceto em contratos anuais vigentes), mediante solicitação ao nosso suporte.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}