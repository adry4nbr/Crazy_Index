"use client";

import { useState } from "react";
import { playSound } from "@/utils/playSound";

type CapaGrimorioProps = {
  onOpen: () => void;
};

export function CapaGrimorio({ onOpen }: CapaGrimorioProps) {
  const [abrindo, setAbrindo] = useState(false);

  const handleClick = () => {
    if (abrindo) return;
    setTimeout(() => {
      playSound("/sounds/BookOpen.wav", 0.65);
    }, 100);
    setAbrindo(true);
    setTimeout(onOpen, 900);
  };

  return (
    <>
      <div className="flex justify-center items-center py-8">
        <div
          className={`capa-livro w-85 h-125 bg-[#1a0e0a] rounded-l-sm rounded-r-[18px] border-[3px] border-[#0d0806] relative cursor-pointer select-none ${!abrindo ? "hover:scale-[1.02] hover:-rotate-1 transition-transform duration-300" : ""} ${abrindo ? "abrindo" : ""}`}
          onClick={handleClick}
        >
          {/* Páginas fantasma — folhas vazias, só cor */}
          <div className="pagina-fantasma" />
          <div className="pagina-fantasma" />
          <div className="pagina-fantasma" />

          {/* Conteúdo da capa isolado com overflow hidden */}
          <div className="absolute inset-0 overflow-hidden rounded-l-sm rounded-r-[18px]">
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
              <div className="font-['Cinzel'] text-[8px] text-[#422715] tracking-[2px] opacity-50">
                ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
              </div>
            </div>

            {/* Dica pulsante */}
            <div
              className="absolute bottom-6 left-12.5 right-5 text-center font-['IM_Fell_English'] text-[10px] text-[#7f5236] italic"
              style={{
                animation: abrindo
                  ? "none"
                  : "pulse-text 3s ease-in-out infinite",
              }}
            >
              {abrindo ? "" : "Ouse abrir o conhecimento proibido..."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
