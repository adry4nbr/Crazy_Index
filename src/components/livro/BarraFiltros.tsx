"use client";

import { useState } from "react";
import { playSound } from "@/utils/playSound";
import {
  LongevidadeRaca,
  CategoriaRaca,
  OrigemRaca,
  Raca,
  Regiao,
} from "@/data/mockData";
import { FiltrosState } from "./hooks/useFiltros";

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

function Chip({
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
      className={`text-[11px] px-2 py-0.5 rounded border transition-all font-['IM_Fell_English'] whitespace-nowrap ${
        ativo
          ? "bg-[#a42b2b]/25 border-[#a42b2b] text-[#a42b2b] font-bold"
          : "border-[#3a2518]/50 text-[#cdb394]/70 hover:border-[#a42b2b]/50 hover:text-[#a42b2b]"
      }`}
    >
      {label}
    </button>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-['Cinzel'] text-[9px] tracking-[3px] uppercase text-[#8b6a4a] mb-1.5">
        {titulo}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

type Props = {
  filtros: FiltrosState;
  temFiltros: boolean;
  onToggle: <K extends keyof Omit<FiltrosState, "busca">>(
    key: K,
    item: FiltrosState[K] extends (infer U)[] ? U : never,
  ) => void;
  onBusca: (valor: string) => void;
  onLimpar: () => void;
  totalEncontrado: number;
  todasRacas: Raca[];
  regioes: Regiao[];
};

export function BarraFiltros({
  filtros,
  temFiltros,
  onToggle,
  onBusca,
  onLimpar,
  totalEncontrado,
  todasRacas,
  regioes,
}: Props) {
  // false = fechado por padrão
  const [aberto, setAberto] = useState(false);

  const racasParaFiltro = todasRacas.map((r) => ({ id: r.id, nome: r.nome }));

  return (
    <>
      {/* Aba vertical — grudada na borda esquerda do livro */}
      <button
        onClick={() => {
          if (aberto) {
            playSound("/sounds/Filtro.wav", 0.3);
          } else {
            playSound("/sounds/Filtro.wav", 0.3);
          }

          setAberto((v) => !v);
        }}
        className="absolute left-0 top-6 -translate-x-full z-50 bg-[#1a0e0a] border border-[#3a2518] border-r-0 rounded-l-md px-1.5 py-3 flex flex-col items-center gap-2 hover:bg-[#2c1a0e] transition-colors cursor-pointer"
      >
        <span
          className="font-['Cinzel'] text-[9px] tracking-[2px] uppercase text-[#cdb394] select-none"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {aberto ? "✕ Fechar" : "Índice & Filtros"}
        </span>
        {temFiltros && !aberto && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#a42b2b]" />
        )}
      </button>

      {/* Painel — fixed, desliza levemente e desaparece
          fechado: translateX(-50%) + opacidade 0 (invisível e intocável)
          aberto:  translateX(0) + opacidade 1 (visível e interativo)
      */}
      <div
        className="fixed top-0 left-0 z-40 h-screen bg-[#120a06] border-r border-[#3a2518] transition-all duration-300 ease-in-out flex flex-col"
        style={{
          width: "340px",
          transform: aberto ? "translateX(0)" : "translateX(50%)",
          opacity: aberto ? 1 : 0,
          pointerEvents: aberto ? "auto" : "none",
        }}
      >
        <div className="w-85 h-full flex flex-col pt-8 px-5 pb-5 gap-4">
          {/* Título + busca */}
          <div className="shrink-0">
            <h2 className="font-['Cinzel'] text-[11px] tracking-[3px] uppercase text-[#cdb394] mb-3">
              Índice & Filtros
            </h2>
            <input
              type="text"
              placeholder="Buscar raça..."
              value={filtros.busca}
              onChange={(e) => onBusca(e.target.value)}
              className="w-80% bg-[#0d0806] border border-[#3a2518] rounded px-2.5 py-1.5 text-[12px] text-[#cdb394] placeholder:text-[#4a321a] focus:outline-none focus:border-[#8b2020] font-['IM_Fell_English']"
            />
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[12px] text-[#4a321a] font-['Cinzel']">
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

          {/* Grid 2 colunas */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 content-start overflow-hidden flex-1">
            <Secao titulo="Longevidade">
              {LONGEVIDADES.map((l) => (
                <Chip
                  key={l}
                  label={l}
                  ativo={filtros.longevidades.includes(l)}
                  onClick={() => onToggle("longevidades", l)}
                />
              ))}
            </Secao>

            <Secao titulo="Origem">
              {ORIGENS.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  ativo={filtros.origens.includes(o)}
                  onClick={() => onToggle("origens", o)}
                />
              ))}
            </Secao>

            <Secao titulo="Categorias">
              {CATEGORIAS.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  ativo={filtros.categorias.includes(c)}
                  onClick={() => onToggle("categorias", c)}
                />
              ))}
            </Secao>

            <Secao titulo="Regiões">
              {regioes.map((r) => (
                <Chip
                  key={r.id}
                  label={r.nome}
                  ativo={filtros.regioes.includes(r.id)}
                  onClick={() => onToggle("regioes", r.id)}
                />
              ))}
            </Secao>

            <Secao titulo="Alianças">
              {racasParaFiltro.map((r) => (
                <Chip
                  key={r.id}
                  label={r.nome}
                  ativo={filtros.aliancas.includes(r.id)}
                  onClick={() => onToggle("aliancas", r.id)}
                />
              ))}
            </Secao>

            <Secao titulo="Inimigos">
              {racasParaFiltro.map((r) => (
                <Chip
                  key={r.id}
                  label={r.nome}
                  ativo={filtros.inimigos.includes(r.id)}
                  onClick={() => onToggle("inimigos", r.id)}
                />
              ))}
            </Secao>
          </div>
        </div>
      </div>
    </>
  );
}
