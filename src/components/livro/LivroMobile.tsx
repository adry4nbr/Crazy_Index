"use client";

import { useState } from "react";
import { Raca, Regiao } from "@/data/mockData";
import { ActiveNote } from "./hooks/useLivro";
import { FiltrosState } from "./hooks/useFiltros";
import { PaginaRacaMobile } from "./PaginaRacaMobile";
import { LongevidadeRaca, CategoriaRaca, OrigemRaca } from "@/data/mockData";
import { playSound } from "@/utils/playSound";

// ─── Constantes de filtro (espelham BarraFiltros.tsx) ────────────────────────

const LONGEVIDADES: LongevidadeRaca[] = [
  "50 anos",
  "100 anos",
  "150 anos",
  "200 anos",
  "300 anos",
  "500+",
  "Imortal",
  "???",
];
const CATEGORIAS: CategoriaRaca[] = [
  "Terrestre",
  "Aéreo",
  "Elemental",
  "Mágico",
  "Astral",
  "Aquático",
  "Infernal",
  "Celestial",
  "Divino",
  "Extinto",
  "???",
];
const ORIGENS: OrigemRaca[] = [
  "Natural",
  "Artificial",
  "Maldição",
  "Extraterrestre",
  "???",
];

// ─── Tipos das Props ──────────────────────────────────────────────────────────

/**
 * Todas as props tipadas diretamente a partir dos retornos dos hooks,
 * sem redefinir tipos — evita qualquer drift de tipagem.
 */
type LivroMobileProps = {
  // Dados
  racasFiltradas: Raca[];
  todasRacas: Raca[];
  regioes: Regiao[];

  // Estado da página (vem do useLivro)
  currentPage: number; // índice atual (0-based), já é paginaSegura
  activeNote: ActiveNote; // { side, title, items } | null
  podVoltar: boolean;
  podAvancar: boolean;

  // Ações de navegação (vem do useLivro)
  fechando: boolean;
  fecharLivro: () => void;
  fecharNota: () => void;
  alternarNota: (
    e: React.MouseEvent,
    side: "left" | "right",
    title: string,
    items: string[],
  ) => void;
  getNomeRaca: (id: string) => string;
  getNomeRegiao: (id: string) => string;

  /**
   * avancarPagina / voltarPagina do useLivro avançam de 2 em 2.
   * No mobile avançamos 1 a 1, então recebemos setters diretos.
   * O pai (Livro.tsx) expõe setCurrentPage via callback wrapper.
   */
  onAvancar: () => void;
  onVoltar: () => void;

  // Estado de filtros (vem do useFiltros)
  filtros: FiltrosState;
  temFiltros: boolean;
  totalEncontrado: number;

  // Ações de filtro (vem do useFiltros) — mesmo tipo genérico do hook
  onToggle: <K extends keyof Omit<FiltrosState, "busca">>(
    key: K,
    item: FiltrosState[K] extends (infer U)[] ? U : never,
  ) => void;
  onBusca: (valor: string) => void;
  onLimpar: () => void;
};

// ─── Sub-componentes internos ─────────────────────────────────────────────────

function ChipMobile({
  label,
  ativo,
  onClick,
}: {
  label: string;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[12px] px-3 py-1 rounded-full border transition-all font-['IM_Fell_English'] whitespace-nowrap ${
        ativo
          ? "bg-[#a42b2b]/25 border-[#a42b2b] text-[#a42b2b] font-bold"
          : "border-[#3a2518]/60 text-[#cdb394]/70 hover:border-[#a42b2b]/50"
      }`}
    >
      {label}
    </button>
  );
}

function SecaoFiltroMobile({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="font-['Cinzel'] text-[10px] tracking-[3px] uppercase text-[#8b6a4a] mb-2">
        {titulo}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

/** Gaveta (Bottom Sheet) de filtros para mobile */
function GavetaFiltros({
  aberta,
  onFechar,
  filtros,
  temFiltros,
  totalEncontrado,
  onToggle,
  onBusca,
  onLimpar,
  todasRacas,
  regioes,
}: {
  aberta: boolean;
  onFechar: () => void;
  filtros: FiltrosState;
  temFiltros: boolean;
  totalEncontrado: number;
  onToggle: LivroMobileProps["onToggle"];
  onBusca: (v: string) => void;
  onLimpar: () => void;
  todasRacas: Raca[];
  regioes: Regiao[];
}) {
  const racasParaFiltro = todasRacas.map((r) => ({ id: r.id, nome: r.nome }));

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          aberta
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onFechar}
      />

      {/* Gaveta */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#120a06] border-t border-[#3a2518] rounded-t-2xl transition-transform duration-300 ease-out flex flex-col`}
        style={{
          transform: aberta ? "translateY(0)" : "translateY(100%)",
          maxHeight: "80vh",
        }}
      >
        {/* Alça visual */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#3a2518]" />
        </div>

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-5 py-3 shrink-0">
          <h2 className="font-['Cinzel'] text-[13px] tracking-[3px] uppercase text-[#cdb394]">
            Filtros do Grimório
          </h2>
          <button
            onClick={onFechar}
            className="text-[#8b6a4a] hover:text-[#cdb394] transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Busca */}
        <div className="px-5 pb-3 shrink-0">
          <input
            type="text"
            placeholder="Buscar raça..."
            value={filtros.busca}
            onChange={(e) => onBusca(e.target.value)}
            className="w-full bg-[#0d0806] border border-[#3a2518] rounded-lg px-3 py-2 text-[14px] text-[#cdb394] placeholder:text-[#4a321a] focus:outline-none focus:border-[#8b2020] font-['IM_Fell_English']"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-[#4a321a] font-['Cinzel']">
              {totalEncontrado} raça{totalEncontrado !== 1 ? "s" : ""}{" "}
              encontrada{totalEncontrado !== 1 ? "s" : ""}
            </span>
            {temFiltros && (
              <button
                onClick={onLimpar}
                className="text-[12px] text-[#a42b2b] hover:text-[#cc3333] font-['Cinzel'] transition-colors"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-[#3a2518]/50 shrink-0" />

        {/* Conteúdo rolável */}
        <div className="overflow-y-auto flex-1 px-5 pt-4 pb-8">
          <SecaoFiltroMobile titulo="Longevidade">
            {LONGEVIDADES.map((l) => (
              <ChipMobile
                key={l}
                label={l}
                ativo={filtros.longevidades.includes(l)}
                onClick={() => onToggle("longevidades", l)}
              />
            ))}
          </SecaoFiltroMobile>

          <SecaoFiltroMobile titulo="Origem">
            {ORIGENS.map((o) => (
              <ChipMobile
                key={o}
                label={o}
                ativo={filtros.origens.includes(o)}
                onClick={() => onToggle("origens", o)}
              />
            ))}
          </SecaoFiltroMobile>

          <SecaoFiltroMobile titulo="Categorias">
            {CATEGORIAS.map((c) => (
              <ChipMobile
                key={c}
                label={c}
                ativo={filtros.categorias.includes(c)}
                onClick={() => onToggle("categorias", c)}
              />
            ))}
          </SecaoFiltroMobile>

          <SecaoFiltroMobile titulo="Regiões">
            {regioes.map((r) => (
              <ChipMobile
                key={r.id}
                label={r.nome}
                ativo={filtros.regioes.includes(r.id)}
                onClick={() => onToggle("regioes", r.id)}
              />
            ))}
          </SecaoFiltroMobile>

          <SecaoFiltroMobile titulo="Alianças">
            {racasParaFiltro.map((r) => (
              <ChipMobile
                key={r.id}
                label={r.nome}
                ativo={filtros.aliancas.includes(r.id)}
                onClick={() => onToggle("aliancas", r.id)}
              />
            ))}
          </SecaoFiltroMobile>

          <SecaoFiltroMobile titulo="Inimigos">
            {racasParaFiltro.map((r) => (
              <ChipMobile
                key={r.id}
                label={r.nome}
                ativo={filtros.inimigos.includes(r.id)}
                onClick={() => onToggle("inimigos", r.id)}
              />
            ))}
          </SecaoFiltroMobile>
        </div>
      </div>
    </>
  );
}

/** Página vazia quando nenhuma raça passa pelos filtros */
function PaginaVaziaMobile() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[#4a331e] font-['IM_Fell_English'] text-center px-8 select-none">
      <span className="text-[48px] leading-none opacity-40 mb-4">⛤</span>
      <p className="text-lg italic leading-relaxed opacity-70">
        Nenhuma criatura encontrada nos registros antigos...
      </p>
      <p className="text-sm opacity-40 mt-2 leading-relaxed">
        Os filtros selecionados não correspondem a nenhum ser catalogado neste
        grimório.
      </p>
      <p className="text-[11px] tracking-[3px] uppercase opacity-30 font-['Cinzel'] mt-4">
        Altere os filtros
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function LivroMobile({
  racasFiltradas,
  todasRacas,
  regioes,
  currentPage,
  activeNote,
  podVoltar,
  podAvancar,
  fechando,
  fecharLivro,
  fecharNota,
  alternarNota,
  getNomeRaca,
  getNomeRegiao,
  onAvancar,
  onVoltar,
  filtros,
  temFiltros,
  totalEncontrado,
  onToggle,
  onBusca,
  onLimpar,
}: LivroMobileProps) {
  const [gavetaAberta, setGavetaAberta] = useState(false);

  // No mobile, currentPage já é o índice da única raça visível.
  // racaAtual pode ser undefined se racasFiltradas estiver vazia.
  const racaAtual: Raca | undefined = racasFiltradas[currentPage];

  // O número de página exibido no rodapé (1-based)
  const numeroPagina = racasFiltradas.length > 0 ? currentPage + 1 : 0;

  // Lógica de ímpar(esquerda) e par(direita)
  // Como página 1 é ímpar (esquerda) e página 2 é par (direita)
  const isRightPage = numeroPagina % 2 === 0;

  const abrirGaveta = () => {
    playSound("/sounds/Filtro.wav", 0.3);
    setGavetaAberta(true);
  };
  const fecharGaveta = () => {
    playSound("/sounds/Filtro.wav", 0.3);
    setGavetaAberta(false);
  };

  return (
    // Clique fora fecha a nota mágica aberta
    <div
      className="flex flex-col h-dvh w-full bg-[#0d0705] font-['IM_Fell_English'] selection:bg-[#a42b2b]/20 overflow-hidden"
      onClick={fecharNota}
    >
      {/* ── Barra superior ─────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-[#1a0e0a] border-b border-[#3a2518] z-10">
        {/* Botão Fechar Livro */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            fecharLivro();
          }}
          className="flex items-center gap-1.5 text-[#8b6a4a] hover:text-[#cdb394] transition-colors"
          aria-label="Fechar grimório"
        >
          <span className="text-base leading-none">✕</span>
          <span className="font-['Cinzel'] text-[10px] tracking-[2px] uppercase">
            Fechar
          </span>
        </button>

        {/* Título central */}
        <span className="font-['Cinzel'] text-[11px] tracking-[3px] uppercase text-[#cdb394]">
          Grimório
        </span>

        {/* Botão Filtros */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            abrirGaveta();
          }}
          className="flex items-center gap-1.5 text-[#8b6a4a] hover:text-[#cdb394] transition-colors relative"
          aria-label="Abrir filtros"
        >
          <span className="font-['Cinzel'] text-[10px] tracking-[2px] uppercase">
            Filtros
          </span>
          <span className="text-base leading-none">⚗</span>
          {/* Indicador de filtro ativo */}
          {temFiltros && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#a42b2b]" />
          )}
        </button>
      </header>

      {/* ── Conteúdo da página (O LIVRO FÍSICO) ─────────────────────────── */}
      <main className="flex-1 bg-[#0d0705] p-3 flex items-center justify-center overflow-hidden">
        {/* CAPA DO LIVRO */}
        <div
          className={`w-full max-w-107.5 h-full max-h-200 bg-[#1a0e0a] border-2 border-[#090504] shadow-[0_12px_35px_rgba(0,0,0,0.9)] relative p-1 sm:p-2 flex flex-col ${
            isRightPage
              ? "rounded-r-2xl rounded-l-sm"
              : "rounded-l-2xl rounded-r-sm"
          } ${fechando ? (isRightPage ? "mobile-fechar-dir" : "mobile-fechar-esq") : ""}`}
        >
          {/* VINCO / LOMBADA DO LIVRO */}
          <div
            className={`absolute top-0 bottom-0 w-10 z-20 pointer-events-none mix-blend-multiply transition-all duration-300 ${
              isRightPage
                ? "left-0 bg-linear-to-r from-black/85 via-black/30 to-transparent"
                : "right-0 bg-linear-to-l from-black/85 via-black/30 to-transparent"
            }`}
          />
          <div
            className={`absolute top-0 bottom-0 w-px bg-black/90 z-30 shadow-[0_0_6px_rgba(0,0,0,0.8)] ${
              isRightPage ? "left-0" : "right-0"
            }`}
          />

          {/* PAPEL (PERGAMINHO) */}
          <div
            className={`w-full h-full bg-[#cdb394] shadow-[inset_0_0_25px_rgba(45,22,8,0.55)] relative overflow-y-auto overflow-x-hidden flex flex-col ${
              isRightPage
                ? "rounded-r-xl rounded-l-none"
                : "rounded-l-xl rounded-r-none"
            }`}
          >
            {/* Dobra central */}
            <div
              className={`absolute top-0 bottom-0 w-5.5 z-30 pointer-events-none ${
                isRightPage
                  ? "left-0 bg-linear-to-r from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75"
                  : "right-0 bg-linear-to-l from-[#120703]/75 via-[#381d0d]/25 to-[#120703]/75"
              }`}
            />
            <div
              className={`absolute top-0 bottom-0 w-0.5 bg-black/85 z-30 shadow-[0_0_10px_rgba(0,0,0,0.9)] ${
                isRightPage ? "left-0" : "right-0"
              }`}
            />

            <div className="py-5 h-full flex flex-col relative z-10">
              {racasFiltradas.length === 0 ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                  <PaginaVaziaMobile />
                </div>
              ) : (
                <PaginaRacaMobile
                  raca={racaAtual}
                  pageNum={numeroPagina}
                  totalPaginas={racasFiltradas.length}
                  activeNote={activeNote}
                  onAlternarNota={alternarNota}
                  getNomeRaca={getNomeRaca}
                  getNomeRegiao={getNomeRegiao}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── Barra de navegação inferior ────────────────────────────────── */}
      <nav
        className="shrink-0 flex items-center justify-between px-6 py-3 bg-[#1a0e0a] border-t border-[#3a2518] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Voltar */}
        <button
          onClick={onVoltar}
          disabled={!podVoltar}
          className={`flex items-center gap-2 font-['Cinzel'] text-[11px] tracking-[2px] uppercase transition-all ${
            podVoltar
              ? "text-[#cdb394] hover:text-white active:scale-95"
              : "text-[#3a2518] cursor-not-allowed"
          }`}
          aria-label="Página anterior"
        >
          <span className="text-lg leading-none">←</span>
          <span>Anterior</span>
        </button>

        {/* Contador de página */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-['Cinzel'] text-[10px] tracking-[2px] text-[#8b6a4a]">
            {racasFiltradas.length > 0
              ? `${numeroPagina} / ${racasFiltradas.length}`
              : "— / —"}
          </span>
          {/* Barra de progresso */}
          <div className="w-20 h-0.5 bg-[#3a2518] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8b6a4a] rounded-full transition-all duration-300"
              style={{
                width:
                  racasFiltradas.length > 0
                    ? `${((currentPage + 1) / racasFiltradas.length) * 100}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* Botão Avançar */}
        <button
          onClick={onAvancar}
          disabled={!podAvancar}
          className={`flex items-center gap-2 font-['Cinzel'] text-[11px] tracking-[2px] uppercase transition-all ${
            podAvancar
              ? "text-[#cdb394] hover:text-white active:scale-95"
              : "text-[#3a2518] cursor-not-allowed"
          }`}
          aria-label="Próxima página"
        >
          <span>Próxima</span>
          <span className="text-lg leading-none">→</span>
        </button>
      </nav>

      {/* ── Gaveta de Filtros ───────────────────────────────────────────── */}
      <GavetaFiltros
        aberta={gavetaAberta}
        onFechar={fecharGaveta}
        filtros={filtros}
        temFiltros={temFiltros}
        totalEncontrado={totalEncontrado}
        onToggle={onToggle}
        onBusca={onBusca}
        onLimpar={onLimpar}
        todasRacas={todasRacas}
        regioes={regioes}
      />
    </div>
  );
}
