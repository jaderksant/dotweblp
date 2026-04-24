import React from 'react';

// Tipagem do TypeScript para as propriedades do componente
interface LogoSkeletonLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  text?: string;
}

export default function LogoSkeletonLoader({ 
  size = 'md', 
  showText = true, 
  text = 'Carregando...' 
}: LogoSkeletonLoaderProps) {
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const styles = `
    @keyframes drawStroke {
      0% { stroke-dashoffset: 100; opacity: 0; }
      5% { opacity: 1; }
      75% { stroke-dashoffset: 0; opacity: 1; } /* Completa o desenho inteiro aos 1.5s */
      100% { stroke-dashoffset: 0; opacity: 1; } /* Segura o desenho pronto até dar os 2s */
    }
    
    @keyframes glow {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(4, 0, 255, 0.3)); }
      50% { filter: drop-shadow(0 0 15px rgba(4, 0, 255, 0.8)); }
    }
    
    .logo-animada {
      stroke-dasharray: 100; /* Agora usamos 100% do caminho exato */
      stroke-dashoffset: 100;
      animation: drawStroke 2s ease-in-out forwards;
    }
    
    .glow-effect {
      animation: glow 1.5s ease-in-out infinite;
    }
  `;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <style>{styles}</style>
      
      {/* SVG Logo Animation */}
      <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <g className="glow-effect">
            <path
              className="logo-animada"
              d="M 10,10 L 64,54 L 75,52 L 108,28 L 148,29 L 154,32 L 159,43 L 159,63 L 150,82 L 134,100 L 94,130 L 91,129 L 103,58 L 34,112 L 34,119 L 65,120 L 55,180 L 57,190 L 159,112 L 178,90 L 189,64 L 190,43 L 185,28 L 176,16 L 162,10 Z"
              fill="none"
              stroke="#0400FF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100" /* O TRUQUE DE MESTRE ESTÁ AQUI */
            />
          </g>
        </svg>
      </div>

      {/* Loading Text Condicional */}
      {showText && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0400FF]">
            {text}
          </p>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0400FF] animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0400FF] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0400FF] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
    </div>
  );
}