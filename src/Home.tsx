import { useEffect, useState } from 'react';
import {
  ArrowRight, Lightning, CheckCircle, WhatsappLogo,
  CaretRight, Crown, WifiSlash, X, Spinner
} from '@phosphor-icons/react';
import mkDotInterface from './assets/mk-dotinterface.png';
import { supabase } from './supabase'; // CONEXÃO COM O BANCO E FUNCTIONS!

export default function Home({ irParaTeste, irParaPrivacidade, irParaTermos, irParaTrabalhe }: { irParaTeste: () => void, irParaPrivacidade: () => void, irParaTermos: () => void, irParaTrabalhe: () => void }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // ESTADOS DO CHECKOUT
  const [modalCheckoutAberto, setModalCheckoutAberto] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<string>('');
  const [cicloPagamento, setCicloPagamento] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [erroCheckout, setErroCheckout] = useState('');

  const [formCheckout, setFormCheckout] = useState({
    nome: '',
    email: '',
    documento: '',
    colaboradores: 10 // Padrão base
  });

  const linkWhatsTeste = "https://wa.me/5514996392691?text=Olá,%20eu%20quero%20testar%20a%20dotweb%20por%207%20dias!%20🕑";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollProgress(Math.min(1, window.scrollY / 400));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleFeature = (id: number) => setActiveFeature(activeFeature === id ? null : id);

  // FUNÇÃO PARA ABRIR O MODAL DE PAGAMENTO
  const abrirCheckout = (plano: string, minColab: number) => {
    setPlanoSelecionado(plano);
    setFormCheckout(prev => ({ ...prev, colaboradores: minColab }));
    setCicloPagamento('MONTHLY');
    setErroCheckout('');
    setModalCheckoutAberto(true);
  };

  // FUNÇÃO QUE CHAMA O SUPABASE E O ASAAS
  const handleGerarPagamento = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCheckout(true);
    setErroCheckout('');

    try {
      const { data, error } = await supabase.functions.invoke('asaas-checkout', {
        body: {
          name: formCheckout.nome,
          email: formCheckout.email,
          cpfCnpj: formCheckout.documento.replace(/\D/g, ''), // Limpa máscara
          planKey: planoSelecionado,
          employeesCount: formCheckout.colaboradores,
          cycle: cicloPagamento
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Redireciona para o link do Asaas!
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Link de pagamento não retornado.");
      }

    } catch (err: any) {
      console.error(err);
      setErroCheckout(err.message || 'Ocorreu um erro ao gerar o pagamento. Tente novamente.');
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter overflow-x-hidden selection:bg-[#0400FF] selection:text-white relative">

      {/* MODAL DE CHECKOUT (SOBREPÕE A TELA) */}
      {modalCheckoutAberto && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[30px] p-8 relative shadow-2xl animate-phone-up">
            <button onClick={() => setModalCheckoutAberto(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
              <X size={24} weight="bold" />
            </button>

            <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">Finalizar Assinatura</h3>
            <p className="text-xs font-bold text-[#0400FF] uppercase tracking-widest mb-6">Plano {planoSelecionado}</p>

            <form onSubmit={handleGerarPagamento} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nome Completo / Razão Social</label>
                <input required type="text" value={formCheckout.nome} onChange={e => setFormCheckout({ ...formCheckout, nome: e.target.value })} className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">CPF ou CNPJ</label>
                  <input required type="text" placeholder="Apenas números" value={formCheckout.documento} onChange={e => setFormCheckout({ ...formCheckout, documento: e.target.value })} className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Colaboradores</label>
                  <input required type="number" min={planoSelecionado === 'start' ? 1 : planoSelecionado === 'sync' ? 20 : 30} value={formCheckout.colaboradores} onChange={e => setFormCheckout({ ...formCheckout, colaboradores: Number(e.target.value) })} className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail Comercial</label>
                <input required type="email" value={formCheckout.email} onChange={e => setFormCheckout({ ...formCheckout, email: e.target.value })} className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-all font-medium" />
              </div>

              <div className="pt-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ciclo de Pagamento</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setCicloPagamento('MONTHLY')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all ${cicloPagamento === 'MONTHLY' ? 'border-[#0400FF] bg-[#0400FF]/5 text-[#0400FF]' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>Mensal</button>
                  <button type="button" onClick={() => setCicloPagamento('YEARLY')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all relative ${cicloPagamento === 'YEARLY' ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                    Anual (PIX)
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] px-2 py-0.5 rounded-full animate-pulse">2 MESES OFF</span>
                  </button>
                </div>
              </div>

              {erroCheckout && <p className="text-[11px] font-bold text-red-500 text-center mt-2">{erroCheckout}</p>}

              <button type="submit" disabled={loadingCheckout} className="w-full mt-4 bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-900 active:scale-95 transition-all flex items-center justify-center gap-2">
                {loadingCheckout ? <Spinner size={18} className="animate-spin" /> : 'Ir para Pagamento Segurto'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ESTILOS (Mesmos de antes) */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes phone-up { 0% { transform: translateY(100px); opacity: 0; } 100% { transform: translateY(0px); opacity: 1; } }
        .animate-phone-up { animation: phone-up 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .perspective-container { perspective: 2000px; }

        .anime-shine-card {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          -webkit-backdrop-filter: blur(15px);
          backdrop-filter: blur(15px);
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
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.25), transparent);
          transform: skewX(-25deg);
          transition: 0.75s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .anime-shine-card:hover::after { left: 150%; }
        .anime-shine-card:hover {
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-5px) translateZ(0);
        }

        .flow-hover-card { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .flow-hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.05);
        }

        @keyframes shine-border { to { background-position: 200% center; } }
        .premium-glow-card {
          position: relative;
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.5);
          transform: translateZ(0);
        }
        .premium-glow-card:hover {
          transform: translateY(-12px) scale(1.02) translateZ(0);
          border-color: transparent;
          box-shadow: 0 30px 60px -15px rgba(4, 0, 255, 0.4);
        }
        .premium-glow-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 3px;
          background: linear-gradient(45deg, #0400FF, #4facfe, #0400FF);
          background-size: 200% auto;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s;
          animation: shine-border 3s linear infinite;
        }
        .premium-glow-card:hover::before { opacity: 1; }
      `}</style>

      {/* NAVBAR */}
      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] md:w-[90%] max-w-5xl rounded-full border border-gray-200/50 bg-white/70 backdrop-blur-xl py-3 px-4 md:py-4 md:px-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]`} style={{ WebkitBackdropFilter: 'blur(24px)' }}>
        <div className="flex justify-between items-center">
          <div onClick={scrollToTop} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-lg md:text-xl italic bg-[#0400FF] text-white shadow-[0_0_15px_rgba(4,0,255,0.4)]`}>D</div>
            <span className={`font-black text-xl md:text-2xl tracking-tighter uppercase hidden sm:block text-black`}>DOTWEB</span>
          </div>
          <div className={`hidden md:flex gap-8 font-black text-xs uppercase tracking-[0.15em] text-gray-600`}>
            <a href="#sistema" className={`hover:text-[#0400FF] transition-colors`}>Sistema</a>
            <a href="#precos" className={`hover:text-[#0400FF] transition-colors`}>Planos</a>
          </div>
          <button onClick={irParaTeste} className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 bg-black text-white hover:bg-[#0400FF] shadow-lg`}>
            Testar Grátis
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-32 md:pt-40 px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-visible">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] md:w-[600px] md:h-[600px] bg-[#0400FF] blur-[100px] md:blur-[150px] opacity-10 rounded-full pointer-events-none transform-gpu"></div>

        <div className="inline-flex items-center gap-2 bg-[#0400FF] border border-[#0400FF]/50 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full font-black text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 relative z-10 shadow-[0_0_20px_rgba(4,0,255,0.3)]">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse"></span>
          GESTÃO DE EQUIPE ÁGIL
        </div>

        <h1 className="text-[40px] sm:text-[45px] md:text-[120px] lg:text-[140px] font-black uppercase leading-[0.85] md:leading-[0.8] tracking-[-0.04em] relative z-10 text-black">
          O PONTO <br /> <span className="text-[#0400FF]">SEM CAÔ.</span>
        </h1>

        <p className="mt-5 sm:mt-6 md:mt-10 text-sm sm:text-base md:text-xl text-gray-600 font-medium max-w-2xl mx-auto relative z-10 px-2">
          Geolocalização cirúrgica. App direto no celular. Esqueça o papel, a planilha e os relógios caros. Controle sua equipe de onde estiver, feito para quem não tem tempo a perder.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 relative z-30 w-full sm:w-auto">
          <a href="#sistema" className="w-full sm:w-auto bg-[#0400FF] text-white px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.1em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_30px_rgba(4,0,255,0.3)]">
            Veja as Vantagens e Recursos <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>

        <div className="w-full flex justify-center relative z-10 -mt-16 sm:-mt-24 md:-mt-48 pointer-events-none perspective-container max-w-5xl mx-auto">
          <div className="animate-phone-up w-full relative flex justify-center">
            <div className="animate-float w-full relative flex justify-center flex-col items-center">
              <div className="will-change-transform" style={{ transform: `rotateX(${(1 - scrollProgress) * 35}deg) rotateY(${(1 - scrollProgress) * -12}deg) rotateZ(${(1 - scrollProgress) * -5}deg) translateZ(0)`, WebkitTransform: `rotateX(${(1 - scrollProgress) * 35}deg) rotateY(${(1 - scrollProgress) * -12}deg) rotateZ(${(1 - scrollProgress) * -5}deg) translateZ(0)` }}>
                <img src={mkDotInterface} alt="Interface DOTWEB" className="w-[280px] sm:w-[320px] md:w-[550px] lg:w-[700px] h-auto object-contain relative z-10" style={{ filter: `drop-shadow(0 25px 35px rgba(0,0,0,0.15))` }} />
              </div>

              {/* DESKTOP FEATURES (Encurtado p/ não estourar linhas no código, igual ao anterior) */}
              <div className="absolute inset-0 z-20 hidden md:block" style={{ opacity: scrollProgress > 0.6 ? 1 : 0, transform: `translateY(${scrollProgress > 0.6 ? 0 : '20px'})`, transition: 'all 0.6s ease-out' }}>
                <div onClick={() => toggleFeature(101)} className="absolute top-[28%] left-[2%] lg:left-[5%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest flex items-center gap-1"><WifiSlash size={14} weight="bold" /> Modo Offline</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 101 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 101 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Sem internet? O app salva o ponto e sincroniza automaticamente depois.</p></div></div>
                <div onClick={() => toggleFeature(102)} className="absolute top-[24%] right-[2%] lg:right-[5%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest">Notificações</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 102 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 102 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Avisos urgentes com confirmação de leitura instantânea.</p></div></div>
                <div onClick={() => toggleFeature(103)} className="absolute top-[48%] left-[-2%] lg:left-[2%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest">Status Atual</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 103 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 103 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Acompanhe se a equipe está trabalhando ou em intervalo.</p></div></div>
                <div onClick={() => toggleFeature(104)} className="absolute top-[46%] right-[-2%] lg:right-[2%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest">Carga Diária</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 104 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 104 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Total trabalhado no dia atualizado em tempo real.</p></div></div>
                <div onClick={() => toggleFeature(105)} className="absolute top-[68%] left-[2%] lg:left-[5%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest">Mural de Avisos</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 105 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 105 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Mural para o RH enviar recados importantes para todos.</p></div></div>
                <div onClick={() => toggleFeature(106)} className="absolute top-[66%] right-[2%] lg:right-[5%] pointer-events-auto cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl py-3 px-5 w-max max-w-[240px] transition-all" style={{ WebkitBackdropFilter: 'blur(24px)' }}><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-black text-[#0400FF] uppercase tracking-widest">Equipe Online</span><CaretRight className={`w-4 h-4 text-[#0400FF] transition-transform ${activeFeature === 106 ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-500 ${activeFeature === 106 ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[11px] font-semibold text-gray-700 leading-snug">Visão rápida de quem da equipe está com o ponto rodando.</p></div></div>
              </div>

              {/* MOBILE FEATURES */}
              <div className="w-full max-w-[320px] mx-auto md:hidden flex flex-col gap-2 mt-4 px-2 pointer-events-auto" style={{ opacity: scrollProgress > 0.6 ? 1 : 0, transition: 'opacity 0.6s ease-out' }}>
                {[{ id: 1, title: 'Modo Offline', desc: 'Sem internet? O app salva o ponto e sincroniza automaticamente depois.' }, { id: 2, title: 'Notificações', desc: 'Avisos urgentes com confirmação de leitura instantânea.' }, { id: 3, title: 'Status Atual', desc: 'Acompanhe se a equipe está trabalhando ou em intervalo.' }, { id: 4, title: 'Carga Diária', desc: 'Total trabalhado no dia atualizado em tempo real.' }, { id: 5, title: 'Mural de Avisos', desc: 'Mural para o RH enviar recados importantes para todos.' }, { id: 6, title: 'Equipe Online', desc: 'Visão rápida de quem da equipe está com o ponto rodando.' }].map((feat) => (
                  <div key={feat.id} onClick={() => toggleFeature(feat.id)} className="bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 w-full text-left transition-all cursor-pointer"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-black text-[#0400FF] uppercase tracking-widest flex items-center gap-1">{feat.id === 1 && <WifiSlash size={12} weight="bold" />} {feat.title}</span><CaretRight className={`w-3 h-3 text-[#0400FF] transition-transform ${activeFeature === feat.id ? 'rotate-90' : ''}`} weight="bold" /></div><div className={`overflow-hidden transition-all duration-300 ${activeFeature === feat.id ? 'max-h-20 mt-2 opacity-100' : 'max-h-0 opacity-0'}`}><p className="text-[10px] font-semibold text-gray-500 leading-snug">{feat.desc}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 text-center mt-12 sm:-mt-16 md:-mt-56 pb-12 sm:pb-16 md:pb-24 w-full pointer-events-none" style={{ opacity: scrollProgress > 0.6 ? 1 : 0, transform: `translateY(${scrollProgress > 0.6 ? 0 : '40px'})`, WebkitTransform: `translateY(${scrollProgress > 0.6 ? 0 : '40px'})`, transition: 'all 0.6s ease-out' }}>
          <h2 className="text-[40px] sm:text-[55px] md:text-[130px] font-black uppercase text-black leading-[0.8] tracking-tighter drop-shadow-lg">ZERO FRAUDE.</h2>
          <p className="mt-3 sm:mt-4 md:mt-8 text-sm sm:text-lg md:text-2xl text-gray-700 font-semibold max-w-2xl mx-auto px-4">O ponto só bate se o GPS confirmar. Segurança total para o seu caixa.</p>
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="sistema" className="py-16 sm:py-24 md:py-32 px-4 md:px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12 md:mb-16 text-center md:text-left">
            <h2 className="text-[32px] sm:text-[40px] md:text-[80px] font-black uppercase leading-[0.9] md:leading-[0.85] tracking-tighter mb-4 md:mb-6 text-white">
              O CONTROLE NA <br /> <span className="text-gray-600">SUA MÃO.</span>
            </h2>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black text-[#0400FF] uppercase tracking-widest">Para o Gestor</h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[300px] mb-16">
            <div className="md:col-span-2 anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">01</span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Cerca Virtual Antifraude</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg max-w-xl relative z-10">Defina o local exato da batida. Bateu fora do raio ou em horário não autorizado? O sistema bloqueia na hora e te avisa. Zero surpresas.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">02</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">100% Offline</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">A internet caiu? O sistema guarda a hora no celular e sincroniza sozinho depois. Fim das desculpas.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">03</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Tempo Real</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">Saiba na palma da mão quem chegou, quem está no intervalo e quem faltou hoje. Atualizado segundo a segundo.</p>
            </div>
            <div className="md:col-span-2 anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">04</span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Fim da Matemática</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg max-w-xl relative z-10">Esqueça horas perdidas somando planilhas e cadernos. O sistema calcula automaticamente o saldo de horas, atrasos e faltas da sua equipe.</p>
            </div>
            <div className="md:col-span-2 anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">05</span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Assinatura Digital</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg max-w-xl relative z-10">Fechamento em 1 clique: envie o espelho direto para o app e receba a assinatura da equipe na mesma hora. Sem imprimir papel.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">06</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Atestados</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">Foto do atestado via app para você aprovar. Adeus mensagens perdidas no WhatsApp.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">07</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Auditoria Invisível</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">Ajustou o ponto? O sistema grava um rastro transparente, blindando sua empresa juridicamente.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">08</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Comunicados</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">Envie avisos e saiba quem leu e a que horas leu. O fim do "eu não vi no grupo".</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">09</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Info a 1 Clique</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base md:text-lg relative z-10 leading-snug">Tenha dados de admissão e até a chave PIX dos funcionários centralizados para o pagamento.</p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-xl md:text-2xl font-black text-[#0400FF] uppercase tracking-widest">Para a Equipe</h3>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[280px]">
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">10</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Direto ao Ponto</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base relative z-10 leading-snug">App super leve, não trava o celular e é fácil de usar. Bater o ponto leva literalmente 1 segundo.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">11</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Fim das Dúvidas</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base relative z-10 leading-snug">O próprio funcionário acompanha suas horas no celular, diminuindo perguntas no seu ouvido.</p>
            </div>
            <div className="anime-shine-card rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 relative group flex flex-col justify-end">
              <span className="text-white/20 font-black text-lg sm:text-xl md:text-2xl tracking-tighter mb-auto block">12</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4 text-white mt-8 md:mt-0">Privacidade 100%</h3>
              <p className="text-gray-300 font-medium text-sm sm:text-base relative z-10 leading-snug">O GPS só é ativado no momento exato em que o botão é apertado. Fora disso, privacidade total.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO DE PREÇOS COM OS BOTÕES ATUALIZADOS */}
      <section id="precos" className="py-16 sm:py-20 md:py-32 px-4 md:px-6 bg-white text-black relative rounded-t-[30px] sm:rounded-t-[40px] md:rounded-t-[80px] -mt-4 sm:-mt-5 md:-mt-10 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-20">
            <h2 className="text-[32px] sm:text-[40px] md:text-[80px] font-black uppercase leading-[0.9] md:leading-[0.85] tracking-tighter mb-3 sm:mb-4 md:mb-6 text-black">
              JUSTO PARA <br /> O SEU CAIXA.
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto px-2">Sem taxas escondidas. Assine o pacote base e escale pagando centavos apenas por quem entra a mais.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 md:gap-6 items-stretch">

            {/* PLANO START */}
            <div className="flow-hover-card bg-[#F8F9FA] rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 border border-gray-100 flex flex-col group shadow-lg">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-1">Start</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 sm:mb-8">Pequenos Negócios</p>

              <div className="mb-6">
                <span className="text-sm sm:text-base font-black text-gray-400">R$</span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tighter">12</span>
                <span className="text-xl sm:text-2xl font-black text-black">,90</span>
                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por funcionário / mês</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl md:rounded-3xl mb-auto border border-gray-200 shadow-sm flex flex-col gap-3">
                <p className="text-[11px] sm:text-xs md:text-sm font-bold flex justify-between items-center text-black">Total Mensal (até 10 func): <span className="font-black text-[#0400FF]">R$ 129,00</span></p>
                <div className="flex justify-between items-center text-[11px] sm:text-xs md:text-sm font-bold text-gray-500">
                  <span>Anual no PIX:</span>
                  <span className="font-black text-black">R$ 1.548,00</span>
                </div>
                <div className="w-full h-px bg-gray-100 my-1"></div>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-400 flex justify-between">Colab. extra: <span className="font-bold text-gray-700">+R$ 10,00/mês</span></p>
              </div>

              {/* BOTÃO START ATUALIZADO */}
              <button onClick={() => abrirCheckout('start', 10)} className="w-full mt-6 sm:mt-8 py-3 sm:py-4 md:py-5 border-2 border-black rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95">Assinar Start</button>
            </div>

            {/* PLANO SYNC */}
            <div className="bg-[#0400FF] text-white rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 transform lg:-translate-y-8 shadow-2xl shadow-blue-500/30 flex flex-col relative group transition-transform hover:-translate-y-2 lg:hover:-translate-y-10 duration-300">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">O MAIS QUERIDO</div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-1 mt-3 sm:mt-4 text-white">Sync</h3>
              <p className="text-[10px] sm:text-xs text-blue-200 font-bold uppercase tracking-widest mb-6 sm:mb-8">Negócios em Expansão</p>

              <div className="mb-6">
                <span className="text-sm sm:text-base font-black text-blue-300">R$</span>
                <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter">9</span>
                <span className="text-xl sm:text-2xl font-black text-white">,45</span>
                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase font-bold text-blue-300 mt-2 tracking-widest">por funcionário / mês</p>
              </div>

              <div className="bg-black/20 p-4 sm:p-5 rounded-2xl md:rounded-3xl mb-5 sm:mb-6 md:mb-8 backdrop-blur-md border border-white/10 flex flex-col gap-3" style={{ WebkitBackdropFilter: 'blur(12px)' }}>
                <p className="text-[11px] sm:text-xs md:text-sm font-bold flex justify-between items-center text-white">Total Mensal (até 20 func): <span className="font-black">R$ 189,00</span></p>
                <div className="flex justify-between items-center text-[11px] sm:text-xs md:text-sm font-bold text-blue-200">
                  <span>Anual PIX (2 meses off):</span>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[9px] sm:text-[10px] line-through text-blue-300/70 font-medium">De R$ 2.268,00</span>
                    <span className="font-black text-white">Por R$ 1.890,00</span>
                  </div>
                </div>
                <div className="w-full h-px bg-white/10 my-1"></div>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-blue-300 flex justify-between">Colab. extra: <span className="font-bold text-blue-100">+R$ 7,00/mês</span></p>
              </div>

              <ul className="text-left space-y-2 sm:space-y-3 md:space-y-4 mb-auto text-[10px] sm:text-xs md:text-sm font-bold text-blue-100">
                <li className="flex items-start gap-2 sm:gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" weight="bold" /> Todas as funções Start</li>
                <li className="flex items-start gap-2 sm:gap-3"><CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" weight="bold" /> Espelho de Ponto em 1 Clique</li>
              </ul>

              {/* BOTÃO SYNC ATUALIZADO */}
              <button onClick={() => abrirCheckout('sync', 20)} className="w-full mt-6 sm:mt-8 py-3 sm:py-4 md:py-5 bg-white text-[#0400FF] rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl">Assinar Sync</button>
            </div>

            {/* PLANO FLOW */}
            <div className="flow-hover-card bg-[#F8F9FA] rounded-[24px] sm:rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 border border-transparent flex flex-col group shadow-lg">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-1">Flow</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mb-6 sm:mb-8">Operações Maiores</p>

              <div className="mb-6">
                <span className="text-sm sm:text-base font-black text-gray-400">R$</span>
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tighter">7</span>
                <span className="text-xl sm:text-2xl font-black text-black">,30</span>
                <p className="text-[9px] sm:text-[10px] md:text-xs uppercase font-bold text-gray-400 mt-2 tracking-widest">por funcionário / mês</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl md:rounded-3xl mb-auto border border-gray-200 shadow-sm flex flex-col gap-3">
                <p className="text-[11px] sm:text-xs md:text-sm font-bold flex justify-between items-center text-black">Total Mensal (até 30 func): <span className="font-black text-[#0400FF]">R$ 219,00</span></p>
                <div className="flex justify-between items-center text-[11px] sm:text-xs md:text-sm font-bold text-gray-500">
                  <span>Anual PIX (2 meses off):</span>
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[9px] sm:text-[10px] line-through text-gray-400 font-medium">De R$ 2.628,00</span>
                    <span className="font-black text-black">Por R$ 2.190,00</span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100 my-1"></div>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-400 flex justify-between">Colab. extra: <span className="font-bold text-gray-700">+R$ 4,00/mês</span></p>
              </div>

              {/* BOTÃO FLOW ATUALIZADO */}
              <button onClick={() => abrirCheckout('flow', 30)} className="w-full mt-6 sm:mt-8 py-3 sm:py-4 md:py-5 border-2 border-black rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95">Assinar Flow</button>
            </div>

          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-center bg-[#0400FF]/5 border-2 border-dashed border-[#0400FF]/30 p-4 sm:p-6 rounded-2xl sm:rounded-3xl max-w-3xl mx-auto group hover:bg-[#0400FF] transition-colors duration-500">
            <p className="text-[11px] sm:text-xs md:text-sm font-black text-[#0400FF] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 group-hover:text-white transition-colors">
              <Lightning className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" weight="bold" /> Assine o Anual no Sync ou Flow e leve 2 meses de graça.
            </p>
          </div>

          <div className="premium-glow-card mt-8 sm:mt-12 md:mt-16 bg-white/80 backdrop-blur-2xl border border-white/50 text-black p-6 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[30px] md:rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl relative overflow-hidden group" style={{ WebkitBackdropFilter: 'blur(24px)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0400FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0400FF]/10 border border-[#0400FF]/20 text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#0400FF] mb-4 sm:mb-5">
                <Crown weight="fill" className="w-3 h-3 sm:w-4 sm:h-4" /> Plano Customizado
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 sm:mb-3">Infinity</h3>
              <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">Sua empresa tem mais de 30 funcionários? Tenha servidores dedicados, implantação guiada pelo nosso time e valores ainda mais agressivos por funcionário.</p>
            </div>
            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
              <button onClick={() => window.open(linkWhatsTeste, '_blank')} className="w-full md:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-full font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest bg-[#0400FF] text-white hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(4,0,255,0.3)]">
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 sm:py-16 md:py-24 px-4 md:px-10 text-gray-700 border-t border-gray-200 z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 md:gap-12">

          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0400FF] flex items-center justify-center text-white font-black text-lg sm:text-xl italic tracking-tighter">D</div>
              <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tighter">DOTWEB</h2>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium max-w-xs mx-auto sm:mx-0">Ponto digital e gestão de equipe sem complicação para quem faz o negócio girar.</p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-black uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs mb-3 sm:mb-4 md:mb-6">Produto</h4>
            <ul className="space-y-2 sm:space-y-3 font-bold text-[11px] sm:text-xs md:text-sm text-gray-500">
              <li><a href="#sistema" className="hover:text-[#0400FF] hover:underline transition-all">Como Funciona</a></li>
              <li><button onClick={irParaTeste} className="hover:text-[#0400FF] hover:underline transition-all text-left">Testar Sistema</button></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-black uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs mb-3 sm:mb-4 md:mb-6">Planos</h4>
            <ul className="space-y-2 sm:space-y-3 font-bold text-[11px] sm:text-xs md:text-sm text-gray-500">
              <li><a href="#precos" className="hover:text-[#0400FF] hover:underline transition-all">Start</a></li>
              <li><a href="#precos" className="hover:text-[#0400FF] hover:underline transition-all">Sync</a></li>
              <li><a href="#precos" className="hover:text-[#0400FF] hover:underline transition-all">Flow</a></li>
              <li><a href="#precos" className="text-[#0400FF] hover:underline transition-all flex items-center justify-center sm:justify-start gap-1"><Crown weight="fill" className="w-3 h-3 sm:w-4 sm:h-4" /> Infinity</a></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-black text-black uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs mb-3 sm:mb-4 md:mb-6">A Empresa</h4>
            <ul className="space-y-2 sm:space-y-3 font-bold text-[11px] sm:text-xs md:text-sm text-gray-500">
              <li><a href={linkWhatsTeste} target="_blank" rel="noreferrer" className="hover:text-[#0400FF] hover:underline transition-all">Fale com a gente</a></li>
              <li><button onClick={irParaTrabalhe} className="hover:text-[#0400FF] hover:underline transition-all text-left">Trabalhe Conosco</button></li>
              <li><button onClick={irParaTermos} className="hover:text-[#0400FF] hover:underline transition-all text-left">Termos de Uso</button></li>
              <li><button onClick={irParaPrivacidade} className="hover:text-[#0400FF] hover:underline transition-all text-left">Privacidade</button></li>
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-end gap-4 sm:gap-6 mt-2 sm:mt-4 md:mt-0">
            <h4 className="font-black text-black uppercase tracking-widest text-[10px] md:text-xs hidden md:block">Atendimento</h4>
            <a href={linkWhatsTeste} target="_blank" rel="noreferrer" className="flex items-center gap-2 sm:gap-3 bg-gray-50 border-2 border-gray-200 hover:border-green-400 hover:text-green-500 hover:bg-green-50 p-3 sm:p-3.5 md:p-4 rounded-full md:rounded-3xl group transition-all text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest text-black">
              <WhatsappLogo className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 shrink-0" weight="duotone" />
              WhatsApp
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-500 opacity-50" />
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-10 sm:mt-12 md:mt-16 pt-5 sm:pt-6 md:pt-8 border-t border-gray-200">
          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-3 text-center sm:text-left">
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