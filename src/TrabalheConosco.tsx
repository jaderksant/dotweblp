import { useEffect, useState } from 'react';
import { CaretLeft, Code, PaintBrush, VideoCamera, Paperclip } from '@phosphor-icons/react';
import { supabase } from './supabase'; // IMPORTAMOS O BANCO AQUI!

export default function TrabalheConosco({ voltarInicio }: { voltarInicio: () => void }) {
  const [nome, setNome] = useState("");
  const [vaga, setVaga] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [curriculo, setCurriculo] = useState<File | null>(null);
  
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(""); // Novo estado para lidar com erros

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const enviarCandidatura = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !vaga || !portfolio || !curriculo) return;

    setEnviando(true);
    setErro("");

    try {
      // 1. Gera um nome único para o arquivo para não dar conflito
      const nomeArquivo = `${Date.now()}_${curriculo.name.replace(/[^a-zA-Z0-9.]/g, '')}`;

      // 2. Faz o upload do PDF pro Storage (Pasta: curriculos)
      const { error: uploadError } = await supabase.storage
        .from('curriculos')
        .upload(nomeArquivo, curriculo);

      if (uploadError) throw new Error("Erro ao fazer upload do currículo.");

      // 3. Pega o Link Público do Currículo gerado pelo Supabase
      const { data: publicUrlData } = supabase.storage
        .from('curriculos')
        .getPublicUrl(nomeArquivo);

      const urlCurriculo = publicUrlData.publicUrl;

      // 4. Salva as informações de texto e o link do PDF na tabela
      const { error: insertError } = await supabase
        .from('candidaturas')
        .insert([
          { nome: nome, vaga: vaga, portfolio: portfolio, curriculo_url: urlCurriculo }
        ]);

      if (insertError) throw new Error("Erro ao salvar os dados da candidatura.");

      // DEU TUDO CERTO!
      setSucesso(true);
      setNome("");
      setVaga("");
      setPortfolio("");
      setCurriculo(null);
      
      setTimeout(() => setSucesso(false), 6000);

    } catch (error: any) {
      console.error(error);
      setErro(error.message || "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

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
          box-shadow: 0 15px 40px -10px rgba(4, 0, 255, 0.3);
          transform: translateY(-4px) translateZ(0);
        }
      `}</style>

      {/* NAVBAR */}
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

      {/* HERO SECTION */}
      <section className="pt-32 sm:pt-40 pb-10 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-[36px] sm:text-[45px] md:text-[60px] font-black uppercase leading-[0.9] tracking-tighter text-black mb-4">
          Faça parte da <br/> <span className="text-[#0400FF]">nossa equipe</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl">
          Estamos construindo a plataforma definitiva de gestão de ponto. Se você respira tecnologia, design e performance, o seu lugar é aqui.
        </p>
      </section>

      {/* VAGAS DISPONÍVEIS */}
      <section className="pt-10 px-4 md:px-6 max-w-6xl mx-auto z-10">
        <div className="text-center mb-10">
          <h2 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Vagas Abertas</h2>
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">Junte-se ao time</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* VAGA DEV */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] p-8 flex flex-col text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
              <Code size={24} weight="duotone" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-white">Desenvolvedor Web</h4>
            <p className="text-xs font-bold text-[#0400FF] uppercase tracking-widest mb-4">Pleno / Sênior</p>
            <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
              Buscamos um dev com foco em performance e UI/UX premium para evoluir nosso SaaS e Landing Pages.
            </p>
            <div className="mt-auto">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Requisitos:</p>
              <ul className="text-sm text-gray-300 space-y-1 font-medium">
                <li>• React & TypeScript</li>
                <li>• Vite & Tailwind CSS</li>
                <li>• Foco em interfaces limpas</li>
                <li>• Clean Code</li>
              </ul>
            </div>
          </div>

          {/* VAGA DESIGNER */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] p-8 flex flex-col text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
              <PaintBrush size={24} weight="duotone" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-white">Designer Digital</h4>
            <p className="text-xs font-bold text-[#0400FF] uppercase tracking-widest mb-4">Júnior / Pleno</p>
            <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
              Mente criativa com alto senso estético para alinhar nossa comunicação visual (Dark/Premium Vibe).
            </p>
            <div className="mt-auto">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Requisitos:</p>
              <ul className="text-sm text-gray-300 space-y-1 font-medium">
                <li>• Pacote Adobe (PS, AI)</li>
                <li>• Figma (Diferencial)</li>
                <li>• Criação de Assets para Redes</li>
                <li>• Senso estético minimalista</li>
              </ul>
            </div>
          </div>

          {/* VAGA EDITOR */}
          <div className="dark-shine-card rounded-[24px] sm:rounded-[30px] p-8 flex flex-col text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
              <VideoCamera size={24} weight="duotone" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-white">Editor de Vídeo</h4>
            <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Freelancer</p>
            <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
              Procuramos um editor dinâmico para dominar a retenção visual nos nossos criativos para TikTok/Reels.
            </p>
            <div className="mt-auto">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Requisitos:</p>
              <ul className="text-sm text-gray-300 space-y-1 font-medium">
                <li>• Premiere Pro</li>
                <li>• After Effects (VFX Básico)</li>
                <li>• Edição Vertical / Cortes Dinâmicos</li>
                <li>• Pegada Tech moderna</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* FORMULÁRIO DE CANDIDATURA (SUPABASE ATIVADO) */}
      <section className="pt-20 px-4 md:px-6 max-w-2xl mx-auto z-10">
        <div className="bg-white rounded-[24px] sm:rounded-[30px] shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-black mb-2">Envie seu Perfil</h3>
          <p className="text-sm text-gray-500 font-medium mb-8">Preencha os dados abaixo e anexe seu currículo.</p>
          
          <form onSubmit={enviarCandidatura} className="flex flex-col gap-5 text-left">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Seu Nome Completo</label>
              <input 
                type="text" 
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-black font-medium"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Qual vaga te interessa?</label>
              <select 
                required
                value={vaga}
                onChange={(e) => setVaga(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-black font-medium cursor-pointer"
              >
                <option value="" disabled></option>
                <option value="Desenvolvedor Web">Desenvolvedor Web (Pleno/Sênior)</option>
                <option value="Designer Digital">Designer Digital (Júnior/Pleno)</option>
                <option value="Editor de Vídeo Freelancer">Editor de Vídeo Freelancer</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Link do Portfólio ou LinkedIn</label>
              <input 
                type="url" 
                required
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-black font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Anexar Currículo (PDF ou DOCX)</label>
              <div className="relative group">
                <input 
                  type="file" 
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCurriculo(e.target.files ? e.target.files[0] : null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`w-full border-2 border-dashed rounded-xl px-4 py-6 text-center flex flex-col items-center gap-2 transition-all duration-300 ${curriculo ? 'border-black bg-gray-50' : 'border-gray-300 bg-[#F8F9FA] group-hover:border-black group-hover:bg-gray-50'}`}>
                  <Paperclip size={28} className={curriculo ? 'text-black' : 'text-gray-400 group-hover:text-black'} weight="duotone" />
                  <span className={`text-sm font-medium ${curriculo ? 'text-black font-bold' : 'text-gray-500'}`}>
                    {curriculo ? curriculo.name : 'Clique ou arraste seu arquivo aqui'}
                  </span>
                </div>
              </div>
            </div>

            {/* AVISO DE ERRO CASO ALGO DÊ ERRADO */}
            {erro && (
              <div className="text-center">
                <p className="text-xs font-bold text-red-500">{erro}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={enviando || sucesso}
              className={`mt-4 w-full text-white px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${sucesso ? 'bg-green-500 shadow-green-500/30' : 'bg-black hover:bg-gray-900 active:scale-95 shadow-black/30'} ${enviando ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {enviando ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : sucesso ? (
                'Enviado'
              ) : (
                'Enviar'
              )}
            </button>

            {sucesso && (
              <div className="mt-2 text-center animate-pulse">
                <p className="text-sm font-bold text-green-600">Obrigado pelo interesse em fazer parte do nosso time. Boa sorte!</p>
              </div>
            )}
          </form>

        </div>
      </section>

    </div>
  );
}