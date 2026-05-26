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
  useEffect(() => {
    preloadSound("/sounds/BookOpen.wav");
    preloadSound("/sounds/BookClose.wav");
    preloadSound("/sounds/Filtro.wav");
    preloadSound("/sounds/PaginaFlip.mp3");
    preloadSound("/sounds/PapelMagicoClose.mp3");
    preloadSound("/sounds/PapelMagicoOpen.mp3");
  }, []);

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
    irParaPagina, // Usa o novo método do hook
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

  const [mobileOffset, setMobileOffset] = useState<0 | 1>(0);

  // A função mestre de clique que controla Desktop e Mobile
  const handleItemClick = useCallback(
    (nomeRaca: string) => {
      let index = racasFiltradas.findIndex((r) => r.nome === nomeRaca);

      // Se não achou na busca atual, limpa os filtros para procurar na lista toda
      if (index === -1 && racas.some((r) => r.nome === nomeRaca)) {
        limpar();
        index = racas.findIndex((r) => r.nome === nomeRaca);
      }

      if (index !== -1) {
        irParaPagina(index);
        if (isMobile) {
          // Calcula a folha certa para o mobile e abre nela
          setMobileOffset(index % 2 !== 0 ? 1 : 0);
        }
      }
    },
    [racasFiltradas, racas, limpar, irParaPagina, isMobile],
  );

  const mobilePageIndex = currentPage + mobileOffset;
  const mobilePodVoltar = mobilePageIndex > 0 && !direcao && !fechando;
  const mobilePodAvancar =
    mobilePageIndex < racasFiltradas.length - 1 && !direcao && !fechando;

  const onAvancarMobile = useCallback(() => {
    if (!mobilePodAvancar) return;
    if (mobileOffset === 0 && racasFiltradas[currentPage + 1] !== undefined) {
      playSound("/sounds/PaginaFlip.mp3", 0.45);
      setMobileOffset(1);
      limparNota();
    } else {
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
      playSound("/sounds/PaginaFlip.mp3", 0.45);
      setMobileOffset(0);
      limparNota();
    } else {
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

  if (!isOpen) {
    return <CapaGrimorio onOpen={abrirLivro} />;
  }

  if (isMobile) {
    return (
      <LivroMobile
        racasFiltradas={racasFiltradas}
        todasRacas={racas}
        regioes={regioes}
        currentPage={mobilePageIndex}
        activeNote={activeNote}
        podVoltar={mobilePodVoltar}
        podAvancar={mobilePodAvancar}
        fechando={fechando}
        fecharLivro={fecharLivro}
        fecharNota={fecharNota}
        alternarNota={alternarNota}
        getNomeRaca={getNomeRaca}
        getNomeRegiao={getNomeRegiao}
        onAvancar={onAvancarMobile}
        onVoltar={onVoltarMobile}
        filtros={filtros}
        temFiltros={temFiltros}
        totalEncontrado={racasFiltradas.length}
        onToggle={toggle}
        onBusca={(valor) => set("busca", valor)}
        onLimpar={limpar}
        onItemClick={handleItemClick} // 🔴 Aqui o Fio foi passado pro Mobile!
      />
    );
  }

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

        <div
          className={`livro-aberto w-212.5 h-160 flex relative border-12 border-[#1a0e0a] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden bg-[#cdb394] ${fechando ? "fechando" : ""}`}
        >
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(50,25,10,0.6)] pointer-events-none z-20" />

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
                      onItemClick={handleItemClick}
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
                      onItemClick={handleItemClick}
                    />
                  )}
                </div>
              </div>
            </>
          )}

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
                  onItemClick={handleItemClick} // Já estava aqui, mas usa o novo hook
                />
              )}
            </div>
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 w-10 -ml-5 bg-linear-to-r from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75 z-30 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/85 z-30 shadow-[0_0_10px_rgba(0,0,0,0.9)]" />

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
                  onItemClick={handleItemClick} // Já estava aqui, mas usa o novo hook
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
