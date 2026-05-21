"use client";

import { useLivro } from "./hooks/useLivro";
import { CapaGrimorio } from "./CapaGrimorio";
import { PaginaRaca } from "./PaginaRaca";
import { ControlesNavegacao } from "./ControlesNavegacao";

export default function Livro() {
  const {
    isOpen,
    currentPage,
    activeNote,
    racaEsquerda,
    racaDireita,
    podVoltar,
    podAvancar,
    abrirLivro,
    fecharLivro,
    avancarPagina,
    voltarPagina,
    limparNota,
    alternarNota,
    getNomeRaca,
    getNomeRegiao,
  } = useLivro();

  if (!isOpen) {
    return <CapaGrimorio onOpen={abrirLivro} />;
  }

  return (
    <div
      onClick={limparNota}
      className="flex flex-col items-center animate-fade-in font-['IM_Fell_English'] selection:bg-[#a42b2b]/20"
    >
      <div className="w-212.5 h-160 flex relative border-12 border-[#1a0e0a] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden bg-[#cdb394]">
        {/* Sombra interna */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(50,25,10,0.6)] pointer-events-none z-20" />

        {/* Página Esquerda */}
        <div className="w-1/2 h-full relative overflow-hidden bg-radial-[at_10%_15%,rgba(60,30,10,0.15)_0%,transparent_60%]">
          <div className="p-8 pr-10 pb-6 h-full">
            <PaginaRaca
              raca={racaEsquerda}
              pageNum={currentPage + 1}
              side="left"
              activeNote={activeNote}
              onAlternarNota={alternarNota}
              getNomeRaca={getNomeRaca}
              getNomeRegiao={getNomeRegiao}
            />
          </div>
        </div>

        {/* Dobra Central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-10 -ml-5 bg-linear-to-r from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75 z-30 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/85 z-30 shadow-[0_0_10px_rgba(0,0,0,0.9)]" />

        {/* Página Direita */}
        <div className="w-1/2 h-full relative overflow-hidden bg-radial-[at_90%_15%,rgba(60,30,10,0.12)_0%,transparent_60%]">
          <div className="p-8 pl-10 pb-6 h-full">
            <PaginaRaca
              raca={racaDireita}
              pageNum={currentPage + 2}
              side="right"
              activeNote={activeNote}
              onAlternarNota={alternarNota}
              getNomeRaca={getNomeRaca}
              getNomeRegiao={getNomeRegiao}
            />
          </div>
        </div>
      </div>

      <ControlesNavegacao
        podVoltar={podVoltar}
        podAvancar={podAvancar}
        onVoltar={voltarPagina}
        onAvancar={avancarPagina}
        onFechar={fecharLivro}
      />
    </div>
  );
}
