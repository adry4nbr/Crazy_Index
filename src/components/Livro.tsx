"use client";

import { useState } from "react";
import { mockRacas } from "@/data/mockData";

type RacaType = (typeof mockRacas)[number];

export default function Livro() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Estado para controlar qual nota mágica está ativa temporariamente
  const [activeNote, setActiveNote] = useState<{
    side: "left" | "right";
    title: string;
    items: string[];
  } | null>(null);

  const totalRacas = mockRacas.length;

  const alternarNota = (
    e: React.MouseEvent, // 1. Recebe o evento de clique aqui
    side: "left" | "right",
    title: string,
    items: string[],
  ) => {
    e.stopPropagation(); // 2. Impede que o clique suba para o fundo e feche o papel na hora!

    if (activeNote && activeNote.side === side && activeNote.title === title) {
      setActiveNote(null);
    } else {
      setActiveNote({ side, title, items });
    }
  };

  const avancarPagina = () => {
    if (currentPage + 2 < totalRacas) {
      setCurrentPage(currentPage + 2);
      setActiveNote(null); // Limpa notas ao mudar de página
    }
  };

  const voltarPagina = () => {
    if (currentPage - 2 >= 0) {
      setCurrentPage(currentPage - 2);
      setActiveNote(null); // Limpa notas ao mudar de página
    }
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
        {/* Mantido apenas o estritamente necessário (Fontes e Keyframes) */}
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
            onClick={() => setIsOpen(true)}
          >
            {/* Lombada do Livro */}
            <div className="absolute left-0 top-0 bottom-0 w-7 bg-[#0d0806] shadow-[4px_0_12px_rgba(0,0,0,0.8)] border-r border-[#2a1a12]" />

            {/* Bordas Internas Decorativas */}
            <div className="absolute top-3.5 right-2.5 bottom-3.5 left-9.5 border border-[#3a2518] rounded-l-xs rounded-r-xl pointer-events-none" />
            <div className="absolute top-5 right-4 bottom-5 left-11 border border-dashed border-[#2e1c10] rounded-l-[1px] rounded-r-[10px] pointer-events-none" />

            {/* Ornamentos (Estrelas nos cantos) */}
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

            {/* Título Principal */}
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

            {/* Linha Divisória de Gradiente Arcano */}
            <div className="absolute top-55 left-1/2 -translate-x-1/2 w-30 h-px bg-linear-to-r from-transparent via-[#3a2518] to-transparent" />

            {/* Símbolos / Sigilos */}
            <div className="absolute bottom-27 left-1/2 -translate-x-1/2 text-[48px] text-[#5a3020] opacity-[0.12] leading-none">
              ☽
            </div>
            <div className="absolute bottom-25 left-1/2 -translate-x-1/2 text-[64px] text-[#8b2020] opacity-[0.18] leading-none">
              ⛤
            </div>

            {/* Runas Antigas */}
            <div className="absolute bottom-20 left-11 right-3.5 text-center">
              <div className="font-['Cinzel'] text-[8px] text-[#2e1a0e] tracking-[2px] opacity-50">
                ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
              </div>
            </div>

            {/* Texto de Dica Pulsação */}
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

    // Preparação dos arrays
    const aliancas = raca.aliancas_ids || [];
    const inimigos = raca.inimigos_ids || [];
    const categorias = raca.categoria || [];
    const regioes = raca.regioes_ids || [];

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

          {/* ── CONTEINER RELATIVO PARA AS INFORMAÇÕES E O PAPEL MÁGICO ── */}
          <div className="relative shrink-0">
            {/* Lista Unificada na Esquerda */}
            <div className="w-57.5 space-y-2 text-[14.5px] text-[#170a03]">
              {/* Longevidade */}
              <p className="leading-tight flex items-center">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Longevidade:
                </span>
                <span className="font-bold">
                  {raca.idade_media || "Sem Dados"}
                </span>
              </p>

              {/* Regiões */}
              <p className="leading-tight flex items-center flex-wrap">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Regiões:
                </span>
                {regioes.length > 0 ? (
                  regioes.length > 1 ? (
                    <span
                      onClick={(e) =>
                        alternarNota(
                          e, // Passa o evento
                          side,
                          "Territórios Vistos",
                          regioes.map(getNomeRegiao),
                        )
                      }
                      className="font-bold px-1 rounded-xs transition-colors hover:bg-[#a42b2b]/10 flex items-center cursor-pointer select-none"
                    >
                      {getNomeRegiao(regioes[0])}{" "}
                      <span className="text-[10px] font-medium text-[#8b3a3a] ml-1">
                        (+{regioes.length - 1}) ✦
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold text-[#210f05]">
                      {getNomeRegiao(regioes[0])}
                    </span>
                  )
                ) : (
                  <span className="italic text-[#4a321a]/60 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>

              {/* Categorias */}
              <p className="leading-tight flex items-center flex-wrap">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Categorias:
                </span>
                {categorias.length > 0 ? (
                  categorias.length > 1 ? (
                    <span
                      onClick={(e) =>
                        alternarNota(
                          e, // Passa o evento
                          side,
                          "Classificações", // Corrigido o título
                          categorias, // Corrigido os itens
                        )
                      }
                      className="font-bold px-1 rounded-xs transition-colors hover:bg-[#a42b2b]/10 flex items-center cursor-pointer select-none"
                    >
                      {categorias[0]}{" "}
                      <span className="text-[10px] font-medium text-[#8b3a3a] ml-1">
                        (+{categorias.length - 1}) ✦
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold text-[#210f05]">
                      {categorias[0]}
                    </span>
                  )
                ) : (
                  <span className="italic text-[#4a321a]/60 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>

              {/* Alianças */}
              <p className="leading-tight flex items-center flex-wrap">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Alianças:
                </span>
                {aliancas.length > 0 ? (
                  aliancas.length > 1 ? (
                    <span
                      onClick={(e) =>
                        alternarNota(
                          e, // Passa o evento
                          side,
                          "Registros de Aliança", // Corrigido o título
                          aliancas.map(getNomeRaca), // Corrigido os itens
                        )
                      }
                      className="font-bold px-1 rounded-xs transition-colors hover:bg-[#a42b2b]/10 flex items-center cursor-pointer select-none"
                    >
                      {getNomeRaca(aliancas[0])}{" "}
                      <span className="text-[10px] font-medium text-[#8b3a3a] ml-1">
                        (+{aliancas.length - 1}) ✦
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold text-[#210f05]">
                      {getNomeRaca(aliancas[0])}
                    </span>
                  )
                ) : (
                  <span className="italic text-[#4a321a]/60 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>

              {/* Inimigos */}
              <p className="leading-tight flex items-center flex-wrap">
                <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
                  Inimigos:
                </span>
                {inimigos.length > 0 ? (
                  inimigos.length > 1 ? (
                    <span
                      onClick={(e) =>
                        alternarNota(
                          e, // Passa o evento
                          side,
                          "Inimizades Antigas", // Corrigido o título
                          inimigos.map(getNomeRaca), // Corrigido os itens
                        )
                      }
                      className="font-bold px-1 rounded-xs transition-colors hover:bg-[#a42b2b]/10 flex items-center cursor-pointer select-none"
                    >
                      {getNomeRaca(inimigos[0])}{" "}
                      <span className="text-[10px] font-medium text-[#8b3a3a] ml-1">
                        (+{inimigos.length - 1}) ✦
                      </span>
                    </span>
                  ) : (
                    <span className="font-bold text-[#210f05]">
                      {getNomeRaca(inimigos[0])}
                    </span>
                  )
                ) : (
                  <span className="italic text-[#4a321a]/60 font-medium">
                    Sem Dados
                  </span>
                )}
              </p>
            </div>

            {/* O PAPEL MÁGICO (Sem pointer-events-none para permitir cliques) */}
            {activeNote && activeNote.side === side && (
              <div
                onClick={(e) => e.stopPropagation()} // Adicione essa linha aqui
                className="absolute -top-2.5 right-0 w-40.5 bg-[#f5ebd5] border border-[#6b4c31]/50 rounded-xs shadow-[8px_10px_25px_rgba(0,0,0,0.45)] p-3 rotate-[1.5deg] flex flex-col z-50 transition-all duration-200 animate-fade-in"
              >
                {/* Fita adesiva mágica */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#a42b2b]/15 border border-dashed border-[#a42b2b]/30 mix-blend-multiply transform -rotate-2" />

                <h5 className="font-['Cinzel'] text-[11px] font-bold text-[#a42b2b] tracking-wider uppercase border-b border-[#4a321a]/20 pb-0.5 mb-2 text-center">
                  {activeNote.title}
                </h5>

                <div className="flex flex-col space-y-1 text-[13.5px] leading-tight font-medium italic text-[#301c0f]">
                  {activeNote.items.map((item, idx) => (
                    <div
                      key={idx}
                      // Adicionado: cursor-pointer e um efeito hover para o usuário saber que é clicável
                      className="flex items-start gap-1.5 py-0.5 border-b border-[#4a321a]/5 last:border-0 cursor-pointer hover:text-[#a42b2b] hover:underline transition-all"
                      // Adicionado: Função provisória que você vai substituir no futuro pela navegação real
                      onClick={() => {
                        alert(
                          `No futuro, isso vai te levar para a página de: ${item}`,
                        );
                        // Aqui você usará funções como o router.push() do Next.js ou atualizará o currentPage
                      }}
                    >
                      <span className="text-[#a42b2b] text-[10px] mt-0.5 shrink-0">
                        ✧
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Seção de Fraquezas (Fica imóvel por baixo do papel mágico) */}
          <div className="mt-1 shrink-0 relative z-0">
            <div className="bg-[#4a321a]/5 border-l-3 border-[#a42b2b] p-2 rounded-r-sm shadow-xs">
              <h4 className="font-['Cinzel'] text-[10px] text-[#381a0a] font-bold tracking-widest uppercase mb-1">
                Registros de Fraqueza
              </h4>

              <div className="grid grid-cols-1 gap-1">
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
    <div
      onClick={() => setActiveNote(null)} // Adicione essa linha aqui! (Pega cliques fora)
      className="flex flex-col items-center animate-fade-in font-['IM_Fell_English'] selection:bg-[#a42b2b]/20"
    >
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
          onClick={() => {
            setIsOpen(false);
            setActiveNote(null);
          }}
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
