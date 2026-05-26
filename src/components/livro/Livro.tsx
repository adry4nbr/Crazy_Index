"use client";

import { useEffect, useState, useCallback } from "react";
import { useLivro } from "./hooks/useLivro";
import { useFiltros } from "./hooks/useFiltros";
import { CapaGrimorio } from "./CapaGrimorio";
import { PaginaRaca } from "./PaginaRaca";
import { ControlesNavegacao } from "./ControlesNavegacao";
import { BarraFiltros } from "./BarraFiltros";
import { LivroMobile } from "./LivroMobile";
import { Raca, Regiao } from "@/data/mockData";
import { preloadSound, playSound } from "@/utils/playSound";

interface LivroProps {
  racas: Raca[];
  regioes: Regiao[];
}

function PaginaVazia() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-[#4a331e] font-['IM_Fell_English'] text-center select-none relative overflow-hidden">
      <div className="absolute top-8 left-8 w-48 h-48 bg-radial-[rgba(65,35,10,0.20)_0%,transparent_70%] pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-36 h-36 bg-radial-[rgba(55,25,5,0.25)_0%,transparent_65%] pointer-events-none" />
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center gap-3 opacity-25">
        <div className="h-px flex-1 bg-[#4a321a]" />
        <span className="text-xs tracking-widest">✦ ✦ ✦</span>
        <div className="h-px flex-1 bg-[#4a321a]" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 px-12 max-w-sm mx-auto">
        <div className="flex flex-col items-center gap-1 opacity-30">
          <span className="text-[52px] leading-none">⛤</span>
        </div>
        <div className="w-24 h-px bg-[#4a321a]/30" />
        <p className="text-xl italic leading-relaxed opacity-70">
          Nenhuma criatura encontrada nos registros antigos...
        </p>
        <p className="text-sm opacity-40 leading-relaxed">
          Os filtros selecionados não correspondem a nenhum ser catalogado neste
          grimório.
        </p>
        <div className="w-24 h-px bg-[#4a321a]/30" />
        <p className="text-[11px] tracking-[3px] uppercase opacity-30 font-['Cinzel']">
          Altere os filtros
        </p>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-3 opacity-25">
        <div className="h-px flex-1 bg-[#4a321a]" />
        <span className="text-xs tracking-widest">✦ ✦ ✦</span>
        <div className="h-px flex-1 bg-[#4a321a]" />
      </div>
    </div>
  );
}

export default function Livro({ racas, regioes }: LivroProps) {
  // ── Preload de sons ────────────────────────────────────────────────────────
  useEffect(() => {
    preloadSound("/sounds/BookOpen.wav");
    preloadSound("/sounds/BookClose.wav");
    preloadSound("/sounds/Filtro.wav");
    preloadSound("/sounds/PaginaFlip.mp3");
    preloadSound("/sounds/PapelMagicoClose.mp3");
    preloadSound("/sounds/PapelMagicoOpen.mp3");
  }, []);

  // ── Detecção de breakpoint mobile (< 768px) ────────────────────────────────
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Hooks de dados ─────────────────────────────────────────────────────────
  const { filtros, racasFiltradas, temFiltros, set, toggle, limpar } =
    useFiltros(racas);

  const {
    isOpen,
    currentPage,
    activeNote,
    direcao,
    fechando,
    racaEsquerda,
    racaDireita,
    podVoltar,
    podAvancar,
    abrirLivro,
    fecharLivro,
    avancarPagina,
    voltarPagina,
    fecharNota,
    alternarNota,
    limparNota,
    getNomeRaca,
    getNomeRegiao,
  } = useLivro({ racasFiltradas, todasRacas: racas, regioes });

  // ── Navegação mobile (1 a 1, sem useEffect) ────────────────────────────────
  const [mobileOffset, setMobileOffset] = useState<0 | 1>(0);

  // Índice real da raça exibida no mobile
  const mobilePageIndex = currentPage + mobileOffset;

  const mobilePodVoltar = mobilePageIndex > 0 && !direcao && !fechando;
  const mobilePodAvancar =
    mobilePageIndex < racasFiltradas.length - 1 && !direcao && !fechando;

  const onAvancarMobile = useCallback(() => {
    if (!mobilePodAvancar) return;

    if (mobileOffset === 0 && racasFiltradas[currentPage + 1] !== undefined) {
      // Toca apenas aqui, pois estamos indo da esquerda para a direita na MESMA folha
      playSound("/sounds/PaginaFlip.mp3", 0.45);
      setMobileOffset(1);
      limparNota();
    } else {
      // Não toca aqui, deixa o som do useLivro/avancarPagina() agir na troca de folha física
      setMobileOffset(0);
      avancarPagina();
    }
  }, [
    mobilePodAvancar,
    mobileOffset,
    currentPage,
    racasFiltradas,
    avancarPagina,
    limparNota,
  ]);

  const onVoltarMobile = useCallback(() => {
    if (!mobilePodVoltar) return;

    if (mobileOffset === 1) {
      // Toca apenas aqui, pois estamos voltando da direita para a esquerda na MESMA folha
      playSound("/sounds/PaginaFlip.mp3", 0.45);
      setMobileOffset(0);
      limparNota();
    } else {
      // Não toca aqui, deixa o som do useLivro/voltarPagina() agir na troca de folha física
      const blocoAnteriorTemDois =
        racasFiltradas[currentPage - 1] !== undefined;
      setMobileOffset(blocoAnteriorTemDois ? 1 : 0);
      voltarPagina();
    }
  }, [
    mobilePodVoltar,
    mobileOffset,
    currentPage,
    racasFiltradas,
    voltarPagina,
    limparNota,
  ]);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!isOpen) {
    return <CapaGrimorio onOpen={abrirLivro} />;
  }

  // ── Versão Mobile ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <LivroMobile
        key={racasFiltradas.length}
        // Dados
        racasFiltradas={racasFiltradas}
        todasRacas={racas}
        regioes={regioes}
        // Estado do livro
        currentPage={mobilePageIndex}
        activeNote={activeNote}
        podVoltar={mobilePodVoltar}
        podAvancar={mobilePodAvancar}
        // Ações do livro
        fechando={fechando}
        fecharLivro={fecharLivro}
        fecharNota={fecharNota}
        alternarNota={alternarNota}
        getNomeRaca={getNomeRaca}
        getNomeRegiao={getNomeRegiao}
        // Navegação mobile (1 a 1)
        onAvancar={onAvancarMobile}
        onVoltar={onVoltarMobile}
        // Filtros
        filtros={filtros}
        temFiltros={temFiltros}
        totalEncontrado={racasFiltradas.length}
        onToggle={toggle}
        onBusca={(valor) => set("busca", valor)}
        onLimpar={limpar}
      />
    );
  }

  // ── Versão Desktop (código original, intacto) ──────────────────────────────
  return (
    <div
      onClick={fecharNota}
      className="flex flex-col items-center animate-fade-in font-['IM_Fell_English'] selection:bg-[#a42b2b]/20"
    >
      <div className="relative">
        <BarraFiltros
          filtros={filtros}
          temFiltros={temFiltros}
          onToggle={toggle}
          onBusca={(valor) => set("busca", valor)}
          onLimpar={limpar}
          totalEncontrado={racasFiltradas.length}
          todasRacas={racas}
          regioes={regioes}
        />

        {/* Livro — livro-aberto + fechando dispara book-close */}
        <div
          className={`livro-aberto w-212.5 h-160 flex relative border-12 border-[#1a0e0a] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden bg-[#cdb394] ${fechando ? "fechando" : ""}`}
        >
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(50,25,10,0.6)] pointer-events-none z-20" />

          {/* Páginas que viram ao fechar */}
          {fechando && (
            <>
              <div className="pagina-fechar-esq fechando-ativa">
                <div className="p-8 pr-10 pb-6 h-full">
                  {racaEsquerda && (
                    <PaginaRaca
                      raca={racaEsquerda}
                      pageNum={currentPage + 1}
                      side="left"
                      activeNote={activeNote}
                      onAlternarNota={alternarNota}
                      getNomeRaca={getNomeRaca}
                      getNomeRegiao={getNomeRegiao}
                    />
                  )}
                </div>
              </div>
              <div className="pagina-fechar-dir fechando-ativa">
                <div className="p-8 pl-10 pb-6 h-full">
                  {racaDireita && (
                    <PaginaRaca
                      raca={racaDireita}
                      pageNum={currentPage + 2}
                      side="right"
                      activeNote={activeNote}
                      onAlternarNota={alternarNota}
                      getNomeRaca={getNomeRaca}
                      getNomeRegiao={getNomeRegiao}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Overlay de flip ao navegar */}
          {direcao && (
            <div
              className={`pagina-flip-overlay ${
                direcao === "avancar"
                  ? "flip-avancar lado-direito"
                  : "flip-voltar lado-esquerdo"
              }`}
            >
              <div className="flip-conteudo">
                <div className="p-8 pr-10 pb-6 h-full">
                  <PaginaRaca
                    raca={direcao === "avancar" ? racaDireita : racaEsquerda}
                    pageNum={
                      direcao === "avancar" ? currentPage + 2 : currentPage + 1
                    }
                    side="left"
                    activeNote={activeNote}
                    onAlternarNota={alternarNota}
                    getNomeRaca={getNomeRaca}
                    getNomeRegiao={getNomeRegiao}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Página Esquerda */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="p-8 pr-10 pb-6 h-full">
              {racasFiltradas.length === 0 ? (
                <PaginaVazia />
              ) : (
                <PaginaRaca
                  raca={racaEsquerda}
                  pageNum={currentPage + 1}
                  side="left"
                  activeNote={activeNote}
                  onAlternarNota={alternarNota}
                  getNomeRaca={getNomeRaca}
                  getNomeRegiao={getNomeRegiao}
                />
              )}
            </div>
          </div>

          {/* Dobra Central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-10 -ml-5 bg-linear-to-r from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75 z-30 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/85 z-30 shadow-[0_0_10px_rgba(0,0,0,0.9)]" />

          {/* Página Direita */}
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="p-8 pl-10 pb-6 h-full">
              {racasFiltradas.length === 0 ? (
                <div className="h-full relative overflow-hidden opacity-30">
                  <div className="absolute top-12 right-8 w-52 h-44 bg-radial-[rgba(65,35,10,0.30)_0%,transparent_70%]" />
                  <div className="absolute bottom-24 left-6 w-40 h-32 bg-radial-[rgba(55,25,5,0.35)_0%,transparent_65%]" />
                </div>
              ) : (
                <PaginaRaca
                  raca={racaDireita}
                  pageNum={currentPage + 2}
                  side="right"
                  activeNote={activeNote}
                  onAlternarNota={alternarNota}
                  getNomeRaca={getNomeRaca}
                  getNomeRegiao={getNomeRegiao}
                />
              )}
            </div>
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
