"use client";

import { useState } from "react";
import { mockRacas } from "@/data/mockData";

type RacaType = (typeof mockRacas)[number];

export default function Livro() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalRacas = mockRacas.length;

  const avancarPagina = () => {
    if (currentPage + 2 < totalRacas) setCurrentPage(currentPage + 2);
  };

  const voltarPagina = () => {
    if (currentPage - 2 >= 0) setCurrentPage(currentPage - 2);
  };

  const getNomeRaca = (id: string) => {
    const raca = mockRacas.find((r) => r.id === id);
    return raca ? raca.nome : "Desconhecida";
  };

  const getNomeRegiao = (id: string) => {
    return id;
  };

  // ── CAPA DO GRIMÓRIO ──
  if (!isOpen) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=IM+Fell+English:ital,wght@0,400;1,400&display=swap');

          /* Estilos específicos da Capa do Grimório Arcano */
          .grimorio-cover {
            width: 340px;
            height: 500px;
            background: #1a0e0a;
            border-radius: 4px 18px 18px 4px;
            border: 3px solid #0d0806;
            box-shadow: 12px 12px 40px rgba(0,0,0,0.9), inset 0 0 60px rgba(0,0,0,0.7);
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
          }
          .grimorio-cover:hover { 
            transform: scale(1.02) rotate(-1deg); 
            box-shadow: 18px 18px 50px rgba(0,0,0,0.95); 
          }
          .cover-spine {
            position: absolute; left: 0; top: 0; bottom: 0; width: 28px;
            background: #0d0806;
            box-shadow: 4px 0 12px rgba(0,0,0,0.8);
            border-right: 1px solid #2a1a12;
          }
          .cover-inner-border {
            position: absolute; inset: 14px 10px 14px 38px;
            border: 1px solid #3a2518;
            border-radius: 2px 12px 12px 2px;
            pointer-events: none;
          }
          .cover-inner-border2 {
            position: absolute; inset: 20px 16px 20px 44px;
            border: 1px dashed #2e1c10;
            border-radius: 1px 10px 10px 1px;
            pointer-events: none;
          }
          .cover-title {
            position: absolute; top: 80px; left: 50px; right: 20px;
            text-align: center;
            font-family: 'Cinzel', serif;
            font-size: 34px;
            font-weight: 700;
            color: #8b2020;
            text-shadow: 0 0 20px rgba(139,32,32,0.6), 0 2px 4px rgba(0,0,0,1);
            letter-spacing: 6px;
            line-height: 1.2;
          }
          .cover-subtitle {
            position: absolute; top: 178px; left: 50px; right: 20px;
            text-align: center;
            font-family: 'IM Fell English', serif;
            font-size: 12px;
            color: #5a3e2e;
            letter-spacing: 4px;
            text-transform: uppercase;
          }
          .cover-sigil {
            position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
            font-size: 64px; color: #8b2020; opacity: 0.18;
            line-height: 1;
          }
          .cover-sigil2 {
            position: absolute; bottom: 108px; left: 50%; transform: translateX(-50%);
            font-size: 48px; color: #5a3020; opacity: 0.12;
            line-height: 1;
          }
          .cover-hint {
            position: absolute; bottom: 24px; left: 50px; right: 20px;
            text-align: center;
            font-family: 'IM Fell English', serif;
            font-size: 10px;
            color: #3a2518;
            font-style: italic;
            animation: pulse-text 3s ease-in-out infinite;
          }
          @keyframes pulse-text { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
          .cover-ornament {
            position: absolute;
            color: #2e1c10;
            font-size: 18px;
            opacity: 0.6;
          }
        `}</style>

        <div className="flex justify-center items-center py-8">
          <div
            className="grimorio-cover select-none"
            onClick={() => setIsOpen(true)}
          >
            <div className="cover-spine" />
            <div className="cover-inner-border" />
            <div className="cover-inner-border2" />

            <div
              className="cover-ornament"
              style={{ top: "40px", left: "44px", fontSize: "14px" }}
            >
              ✦
            </div>
            <div
              className="cover-ornament"
              style={{ top: "40px", right: "14px", fontSize: "14px" }}
            >
              ✦
            </div>
            <div
              className="cover-ornament"
              style={{ bottom: "42px", left: "44px", fontSize: "14px" }}
            >
              ✦
            </div>
            <div
              className="cover-ornament"
              style={{ bottom: "42px", right: "14px", fontSize: "14px" }}
            >
              ✦
            </div>

            <div className="cover-title">
              CRAZY
              <br />
              INDEX
            </div>
            <div className="cover-subtitle">Tomo I · Bestiário</div>

            <div
              style={{
                position: "absolute",
                top: "220px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "1px",
                background:
                  "linear-gradient(to right,transparent,#3a2518,transparent)",
              }}
            />

            <div className="cover-sigil2">☽</div>
            <div className="cover-sigil">⛤</div>

            <div
              style={{
                position: "absolute",
                bottom: "80px",
                left: "44px",
                right: "14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "8px",
                  color: "#2e1a0e",
                  letterSpacing: "2px",
                  opacity: 0.5,
                }}
              >
                ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
              </div>
            </div>

            <div className="cover-hint">
              Ouse abrir o conhecimento proibido...
            </div>
          </div>
        </div>
      </>
    );
  }

  const racaEsquerda = mockRacas[currentPage];
  const racaDireita = mockRacas[currentPage + 1];

  // ── RENDERIZADOR DE PÁGINA ──
  const renderizarPagina = (
    raca: RacaType | undefined,
    pageNum: number,
    side: "left" | "right",
  ) => {
    const isLeft = side === "left";

    if (!raca) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-[#4a331e] opacity-40 font-['IM_Fell_English'] text-xl italic text-center p-12">
          As páginas seguintes foram arrancadas ou consumidas pelo tempo...
        </div>
      );
    }

    const fraquezas = (raca.fraquezas as Record<string, string>) || {};

    return (
      <div className="h-full flex flex-col font-['IM_Fell_English'] relative z-10 select-none pb-8">
        {/* Manchas de envelhecimento orgânico */}
        <div
          className={`absolute ${isLeft ? "top-2 left-4" : "bottom-12 right-4"} w-72 h-56 bg-radial-[rgba(65,35,10,0.35)_0%,transparent_70%] pointer-events-none mix-blend-multiply z-0`}
        />
        <div
          className={`absolute ${isLeft ? "bottom-20 right-6" : "top-6 left-12"} w-44 h-36 bg-radial-[rgba(55,25,5,0.45)_0%,transparent_60%] pointer-events-none mix-blend-multiply z-0`}
        />
        <div
          className={`absolute ${isLeft ? "top-1/3 right-2" : "bottom-1/3 left-6"} w-32 h-24 bg-radial-[rgba(45,15,5,0.40)_0%,transparent_65%] pointer-events-none mix-blend-multiply z-0`}
        />

        <div className="relative z-10 flex flex-col h-full justify-start">
          {/* Cabeçalho */}
          <header className="text-center shrink-0">
            <span className="text-[12px] uppercase tracking-[3px] text-[#4a321a] font-bold block">
              ~ Origem: {raca.origem || "Sem Dados"} ~
            </span>
            <h2 className="font-['Cinzel'] text-3xl font-extrabold text-[#210f05] tracking-wide leading-tight mt-0.5">
              {raca.nome}
            </h2>
            <div className="w-full h-px bg-linear-to-r from-transparent via-[#4a321a]/40 to-transparent relative my-2">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#4a321a] bg-[#cdb394] px-2">
                ✧
              </span>
            </div>
          </header>

          {/* Imagem e Descrição */}
          <div className="flex gap-4 items-start mt-1 shrink-0">
            <div className="w-32 h-38 shrink-0 border border-[#4a321a]/70 bg-stone-950/15 relative flex flex-col items-center justify-center rounded shadow-xs">
              <div className="absolute inset-0.5 border border-[#4a321a]/20 border-dashed" />
              <span className="text-[10px] tracking-widest font-bold text-[#4a321a]/80 uppercase font-['Cinzel']">
                Gravura
              </span>
            </div>

            <p className="flex-1 text-[14.5px] leading-relaxed text-[#170a03] italic text-justify">
              {raca.descricao ||
                "Nenhum relato escrito foi encontrado sobre esta criatura nos arquivos antigos."}
            </p>
          </div>

          <div className="w-full h-px bg-[#4a321a]/25 my-3 shrink-0" />

          {/* Informações Técnicas Divididas em 2 Colunas */}
          <div className="flex gap-2 text-[14.5px] text-[#170a03] shrink-0 items-start">
            {/* Coluna da Esquerda (Informações Gerais) */}
            <div className="flex-1 space-y-2">
              <p className="leading-tight">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Longevidade:
                </span>
                <span className="font-bold">
                  {raca.idade_media || "Sem Dados"}
                </span>
              </p>

              <p className="leading-tight flex flex-wrap items-center gap-1.5">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1">
                  Alianças:
                </span>
                {raca.aliancas_ids && raca.aliancas_ids.length > 0 ? (
                  raca.aliancas_ids.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 border border-blue-900/30 bg-blue-950/10 text-blue-950 text-[12px] font-bold rounded-xs shadow-2xs"
                    >
                      {getNomeRaca(id)}
                    </span>
                  ))
                ) : (
                  <span className="italic text-[#4a321a]/80 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>

              <p className="leading-tight flex flex-wrap items-center gap-1.5">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1">
                  Inimigos:
                </span>
                {raca.inimigos_ids && raca.inimigos_ids.length > 0 ? (
                  raca.inimigos_ids.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 border border-red-900/30 bg-red-950/10 text-red-950 text-[12px] font-bold rounded-xs shadow-2xs"
                    >
                      {getNomeRaca(id)}
                    </span>
                  ))
                ) : (
                  <span className="italic text-[#4a321a]/80 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>

              <p className="leading-tight">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Categorias:
                </span>
                <span className="italic font-medium">
                  {raca.categoria && raca.categoria.length > 0
                    ? raca.categoria.join(", ")
                    : "Sem Dados"}
                </span>
              </p>
            </div>

            {/* Coluna da Direita (Regiões isoladas) */}
            <div className="w-35 shrink-0 flex flex-col pl-2 border-l border-[#4a321a]/15">
              <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs block w-max mb-1.5">
                Regiões:
              </span>
              <div className="italic font-medium flex flex-col gap-0.5 pl-1">
                {raca.regioes_ids && raca.regioes_ids.length > 0 ? (
                  raca.regioes_ids.map(getNomeRegiao).map((reg, idx) => (
                    <span
                      key={idx}
                      className="block text-[13px] leading-tight text-[#210f05]"
                    >
                      — {reg}
                    </span>
                  ))
                ) : (
                  <span className="text-[13px]">Sem Dados</span>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Fraquezas */}
          <div className="mt-4 shrink-0">
            <div className="bg-[#4a321a]/5 border-l-3 border-[#a42b2b] p-2.5 rounded-r-sm shadow-xs">
              <h4 className="font-['Cinzel'] text-[10px] text-[#381a0a] font-bold tracking-widest uppercase mb-1.5">
                Registros de Fraqueza
              </h4>

              <div className="grid grid-cols-1 gap-1.5">
                <p className="text-[13px] leading-tight flex gap-1.5">
                  <span className="font-['Cinzel'] font-bold text-[#a42b2b] text-[10px] uppercase mt-0.5 shrink-0 tracking-wider">
                    Física:
                  </span>
                  <span className="text-[#170a03] italic flex-1 font-medium">
                    {fraquezas.Física || fraquezas.Físicas || "Sem Dados"}
                  </span>
                </p>
                <p className="text-[13px] leading-tight flex gap-1.5">
                  <span className="font-['Cinzel'] font-bold text-[#a42b2b] text-[10px] uppercase mt-0.5 shrink-0 tracking-wider">
                    Mágica:
                  </span>
                  <span className="text-[#170a03] italic flex-1 font-medium">
                    {fraquezas.Mágica || fraquezas.Mágicas || "Sem Dados"}
                  </span>
                </p>
                <p className="text-[13px] leading-tight flex gap-1.5">
                  <span className="font-['Cinzel'] font-bold text-[#a42b2b] text-[10px] uppercase mt-0.5 shrink-0 tracking-wider">
                    Astral:
                  </span>
                  <span className="text-[#170a03] italic flex-1 font-medium">
                    {fraquezas.Astral || "Sem Dados"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGINAÇÃO FIXA ABSOLUTA */}
        <div className="absolute bottom-0 left-0 right-0 font-['Cinzel'] text-xs font-bold text-[#4a321a]/80 text-center pt-2 border-t border-[#4a321a]/20 tracking-widest bg-[#cdb394] z-20">
          — {pageNum} —
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center animate-fade-in font-['IM_Fell_English'] selection:bg-[#a42b2b]/20">
      <div className="w-212.5 h-160 flex relative border-12 border-[#1a0e0a] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden bg-[#cdb394]">
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(50,25,10,0.6)] pointer-events-none z-20" />

        {/* PÁGINA ESQUERDA */}
        <div className="w-1/2 h-full relative overflow-hidden bg-radial-[at_10%_15%,rgba(60,30,10,0.15)_0%,transparent_60%]">
          <div className="p-8 pr-10 pb-6 h-full">
            {renderizarPagina(racaEsquerda, currentPage + 1, "left")}
          </div>
        </div>

        {/* DOBRA CENTRAL */}
        <div className="absolute left-1/2 top-0 bottom-0 w-10 -ml-5 bg-linear-to-r from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75 z-30 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/85 z-30 shadow-[0_0_10px_rgba(0,0,0,0.9)]" />

        {/* PÁGINA DIREITA */}
        <div className="w-1/2 h-full relative overflow-hidden bg-radial-[at_90%_15%,rgba(60,30,10,0.12)_0%,transparent_60%]">
          <div className="p-8 pl-10 pb-6 h-full">
            {renderizarPagina(racaDireita, currentPage + 2, "right")}
          </div>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="flex gap-6 mt-6 items-center">
        <button
          onClick={voltarPagina}
          disabled={currentPage === 0}
          className="px-6 py-2 bg-[#1a0e0a] text-[#cdb394] border border-[#3a2518] rounded shadow-md font-['Cinzel'] text-xs font-bold tracking-widest disabled:opacity-25 hover:bg-[#2c1a0e] transition-all cursor-pointer"
        >
          Anterior
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-black text-[#6e5440] border border-[#1a0e0a] rounded font-['Cinzel'] text-[10px] font-bold tracking-widest hover:bg-[#a42b2b] hover:text-white transition-all cursor-pointer"
        >
          Fechar Grimório
        </button>
        <button
          onClick={avancarPagina}
          disabled={currentPage + 2 >= totalRacas}
          className="px-6 py-2 bg-[#1a0e0a] text-[#cdb394] border border-[#3a2518] rounded shadow-md font-['Cinzel'] text-xs font-bold tracking-widest disabled:opacity-25 hover:bg-[#2c1a0e] transition-all cursor-pointer"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
