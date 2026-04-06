import { useEffect } from 'react';
import { CaretLeft } from '@phosphor-icons/react';

export default function Privacidade({ voltarInicio }: { voltarInicio: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-inter overflow-x-hidden selection:bg-[#0400FF] selection:text-white pb-20">
      
      {/* NAVBAR SIMPLIFICADA (Mantida igual) */}
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

      {/* HEADER DA PÁGINA (Sem ícone, clean) */}
      <section className="pt-32 sm:pt-40 pb-10 px-4 md:px-6 max-w-3xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-[36px] sm:text-[45px] md:text-[60px] font-black uppercase leading-[0.9] tracking-tighter text-black mb-4">
          Privacidade e <br/> <span className="text-[#0400FF]">Proteção de Dados</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl">
          Transparência total sobre como tratamos as informações da sua empresa e equipe, em total conformidade com a LGPD.
        </p>
        <p className="text-xs text-gray-400 font-bold mt-6 tracking-widest uppercase">Última atualização: Abril de 2026</p>
      </section>

      {/* CONTEÚDO LEGAL - O CARD AGORA É CLEAN (Fundo Branco) */}
      <section className="pt-4 px-4 md:px-6 max-w-4xl mx-auto z-10">
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[24px] sm:rounded-[40px] shadow-sm border border-gray-100 space-y-10 relative overflow-hidden">
          
          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">1. Nosso Compromisso</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              A DOTWEB leva a proteção dos seus dados a sério. Esta política explica de forma clara como coletamos, usamos e protegemos as informações da sua empresa e dos seus colaboradores ao utilizarem nossa plataforma e aplicativo de controle de ponto. Estamos totalmente adequados à Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">2. O Papel da DOTWEB</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Para fins legais, a empresa que contrata a DOTWEB é a <strong className="text-black">Controladora</strong> dos dados. A DOTWEB atua apenas como <strong className="text-black">Operadora</strong> (fornecendo a tecnologia para o registro). Nós não tomamos decisões sobre os dados dos seus funcionários nem os utilizamos para benefício próprio.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">3. Quais dados nós coletamos?</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700 mb-4">Para o sistema funcionar com segurança e evitar fraudes, coletamos o estritamente necessário:</p>
            <ul className="list-disc pl-5 text-sm md:text-base leading-relaxed font-medium text-gray-700 space-y-2">
              <li><strong className="text-black">Dados Cadastrais:</strong> Nome completo, CPF, e-mail e telefone do colaborador e do administrador.</li>
              <li><strong className="text-black">Registro de Ponto:</strong> Data, hora exata (timestamp) e IP do dispositivo.</li>
              <li><strong className="text-black">Geolocalização (GPS):</strong> Coordenadas de latitude e longitude <strong className="text-black">apenas e exclusivamente no momento exato</strong> em que o colaborador clica em "Bater Ponto". Não rastreamos a localização em segundo plano.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">4. Para que usamos esses dados?</h2>
            <ul className="list-disc pl-5 text-sm md:text-base leading-relaxed font-medium text-gray-700 space-y-2">
              <li>Para registrar a jornada de trabalho de forma auditável e segura.</li>
              <li>Para comprovar a presença do colaborador no raio de trabalho permitido.</li>
              <li>Para fornecer relatórios e espelhos de ponto para a gestão do RH da empresa contratante.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              <strong className="text-black">A DOTWEB não vende, não aluga e não cede seus dados para terceiros sob nenhuma hipótese.</strong> Os dados são restritos apenas aos gestores da sua empresa, aos nossos servidores de hospedagem em nuvem (criptografados) e a autoridades legais (em caso de ordem judicial).
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">6. Segurança e Armazenamento</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Seus dados estão protegidos por criptografia e bancos de dados seguros (incluindo tecnologia IndexedDB para armazenamento offline). Os registros de ponto são imutáveis após a sincronização, garantindo validade jurídica.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">7. Direitos dos Titulares</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Qualquer colaborador pode solicitar à sua empresa (Controladora) a visualização de dados cadastrais. A exclusão de registros de ponto só poderá ser feita respeitando os prazos de guarda obrigatórios exigidos pela legislação trabalhista brasileira.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 mt-10">
            <h2 className="text-lg md:text-2xl font-black text-black uppercase tracking-tighter mb-4">8. Contato</h2>
            <p className="text-sm md:text-base leading-relaxed font-medium text-gray-700">
              Em caso de dúvidas sobre como seus dados são tratados, fale conosco pelo WhatsApp de atendimento presente em nosso site oficial.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}