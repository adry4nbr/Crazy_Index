"use client";

type CapaGrimorioProps = {
  onOpen: () => void;
};

export function CapaGrimorio({ onOpen }: CapaGrimorioProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=IM+Fell+English:ital,wght@0,400;1,400&display=swap');
        @keyframes pulse-text {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>

      <div className="flex justify-center items-center py-8">
        <div
          className="w-85 h-125 bg-[#1a0e0a] rounded-l-sm rounded-r-[18px] border-[3px] border-[#0d0806] shadow-[12px_12px_40px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(0,0,0,0.7)] relative cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:scale-[1.02] hover:-rotate-1 hover:shadow-[18px_18px_50px_rgba(0,0,0,0.95),inset_0_0_60px_rgba(0,0,0,0.7)] select-none"
          onClick={onOpen}
        >
          {/* Lombada */}
          <div className="absolute left-0 top-0 bottom-0 w-7 bg-[#0d0806] shadow-[4px_0_12px_rgba(0,0,0,0.8)] border-r border-[#2a1a12]" />

          {/* Bordas Internas Decorativas */}
          <div className="absolute top-3.5 right-2.5 bottom-3.5 left-9.5 border border-[#3a2518] rounded-l-xs rounded-r-xl pointer-events-none" />
          <div className="absolute top-5 right-4 bottom-5 left-11 border border-dashed border-[#2e1c10] rounded-l-[1px] rounded-r-[10px] pointer-events-none" />

          {/* Ornamentos */}
          <div className="absolute text-[#2e1c10] opacity-60 text-[14px] top-10 left-11">
            ✦
          </div>
          <div className="absolute text-[#2e1c10] opacity-60 text-[14px] top-10 right-3.5">
            ✦
          </div>
          <div className="absolute text-[#2e1c10] opacity-60 text-[14px] bottom-10.5 left-11">
            ✦
          </div>
          <div className="absolute text-[#2e1c10] opacity-60 text-[14px] bottom-10.5 right-3.5">
            ✦
          </div>

          {/* Título */}
          <div
            className="absolute top-20 left-12.5 right-5 text-center font-['Cinzel'] text-[34px] font-bold text-[#8b2020] tracking-[6px] leading-[1.2]"
            style={{
              textShadow:
                "0 0 20px rgba(139,32,32,0.6), 0 2px 4px rgba(0,0,0,1)",
            }}
          >
            CRAZY
            <br />
            INDEX
          </div>

          {/* Subtítulo */}
          <div className="absolute top-44.5 left-12.5 right-5 text-center font-['IM_Fell_English'] text-[12px] text-[#5a3e2e] tracking-[4px] uppercase">
            Tomo I · Bestiário
          </div>

          {/* Linha Divisória */}
          <div className="absolute top-55 left-1/2 -translate-x-1/2 w-30 h-px bg-linear-to-r from-transparent via-[#3a2518] to-transparent" />

          {/* Sigilos */}
          <div className="absolute bottom-27 left-1/2 -translate-x-1/2 text-[48px] text-[#5a3020] opacity-[0.12] leading-none">
            ☽
          </div>
          <div className="absolute bottom-25 left-1/2 -translate-x-1/2 text-[64px] text-[#8b2020] opacity-[0.18] leading-none">
            ⛤
          </div>

          {/* Runas */}
          <div className="absolute bottom-20 left-11 right-3.5 text-center">
            <div className="font-['Cinzel'] text-[8px] text-[#2e1a0e] tracking-[2px] opacity-50">
              ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
            </div>
          </div>

          {/* Dica pulsante */}
          <div
            className="absolute bottom-6 left-12.5 right-5 text-center font-['IM_Fell_English'] text-[10px] text-[#3a2518] italic"
            style={{ animation: "pulse-text 3s ease-in-out infinite" }}
          >
            Ouse abrir o conhecimento proibido...
          </div>
        </div>
      </div>
    </>
  );
}
