"use client";

import { Raca } from "@/data/mockData";
import { ActiveNote } from "./hooks/useLivro";
import { PapelMagico } from "./PapelMagico";
import { SecaoFraquezas } from "./SecaoFraquezas";
import { LinhaInfo } from "./LinhaInfo";

type PaginaRacaProps = {
  raca: Raca | undefined;
  pageNum: number;
  side: "left" | "right";
  activeNote: ActiveNote;
  onAlternarNota: (
    e: React.MouseEvent,
    side: "left" | "right",
    title: string,
    items: string[],
  ) => void;
  getNomeRaca: (id: string) => string;
  getNomeRegiao: (id: string) => string;
  onItemClick?: (item: string) => void;
};

// Rasgo de garra — SVG inline com marcas de arranhão e buracos na página
function RasgosGarra() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 300 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Manchas de cor da capa — como o papel se dobrou expondo a capa */}

        {/* Pontos de tinta espalhados */}
        <circle cx="55" cy="295" r="2.5" fill="rgba(20,8,2,0.35)" />
        <circle cx="220" cy="145" r="1.8" fill="rgba(20,8,2,0.30)" />
        <circle cx="240" cy="300" r="3" fill="rgba(20,8,2,0.25)" />
        <circle cx="45" cy="180" r="2" fill="rgba(20,8,2,0.28)" />
        <circle cx="255" cy="220" r="1.5" fill="rgba(20,8,2,0.22)" />
        <circle cx="100" cy="280" r="2.5" fill="rgba(20,8,2,0.35)" />
        <circle cx="20" cy="10" r="5" fill="rgba(20,8,2,0.30)" />
        <circle cx="78" cy="30" r="3" fill="rgba(20,8,2,0.25)" />
        <circle cx="300" cy="55" r="2" fill="rgba(20,8,2,0.28)" />
        <circle cx="25" cy="120" r="4" fill="rgba(20,8,2,0.22)" />
        <circle cx="200" cy="400" r="3" fill="rgba(20,8,2,0.25)" />
        <circle cx="150" cy="350" r="2" fill="rgba(20,8,2,0.28)" />
        <circle cx="70" cy="450" r="5" fill="rgba(20,8,2,0.22)" />
      </svg>
    </div>
  );
}

export function PaginaRaca({
  raca,
  pageNum,
  side,
  activeNote,
  onAlternarNota,
  getNomeRaca,
  getNomeRegiao,
  onItemClick,
}: PaginaRacaProps) {
  const isLeft = side === "left";

  if (!raca) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full text-[#4a331e] font-['IM_Fell_English'] text-center select-none overflow-hidden">
        <RasgosGarra />
        <div className="relative z-10 flex flex-col items-center gap-3 px-8 opacity-60">
          <span className="text-[32px] leading-none">✦</span>
          <p className="text-lg italic leading-relaxed">
            As páginas seguintes foram arrancadas...
          </p>
          <p className="text-sm opacity-70">ou consumidas por algo antigo.</p>
        </div>
      </div>
    );
  }

  const fraquezas = (raca.fraquezas as Record<string, string>) || {};
  const aliancas = raca.aliancas_ids || [];
  const inimigos = raca.inimigos_ids || [];
  const categorias = raca.categoria || [];
  const regioes = raca.regioes_ids || [];

  return (
    <div className="h-full flex flex-col font-['IM_Fell_English'] relative z-10 select-none pb-8">
      {/* Manchas de envelhecimento */}
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
          {raca.imagem_url ? (
            <img
              src={raca.imagem_url}
              alt={raca.nome}
              className="w-32 h-38 shrink-0 border border-[#4a321a]/70 rounded shadow-xs object-cover"
            />
          ) : (
            <div className="w-32 h-38 shrink-0 border border-[#4a321a]/70 bg-stone-950/15 relative flex flex-col items-center justify-center rounded shadow-xs">
              <div className="absolute inset-0.5 border border-[#4a321a]/20 border-dashed" />
              <span className="text-[10px] tracking-widest font-bold text-[#4a321a]/80 uppercase font-['Cinzel']">
                Gravura
              </span>
            </div>
          )}
          <p className="flex-1 text-[14.5px] leading-relaxed text-[#170a03] italic text-justify">
            {raca.descricao ||
              "Nenhum relato escrito foi encontrado sobre esta criatura nos arquivos antigos."}
          </p>
        </div>

        <div className="w-full h-px bg-[#4a321a]/25 my-3 shrink-0" />

        {/* Infos + PapelMagico */}
        <div className="relative shrink-0">
          <div className="w-57.5 space-y-2 text-[14.5px] text-[#170a03]">
            <LinhaInfo
              label="Longevidade"
              items={raca.idade_media ? [String(raca.idade_media)] : []}
              side={side}
              tituloNota="Longevidade"
              onAlternarNota={onAlternarNota}
            />
            <LinhaInfo
              label="Regiões"
              items={regioes}
              side={side}
              tituloNota="Territórios Vistos"
              onAlternarNota={onAlternarNota}
              resolverNome={getNomeRegiao}
            />
            <LinhaInfo
              label="Categorias"
              items={categorias}
              side={side}
              tituloNota="Classificações"
              onAlternarNota={onAlternarNota}
            />
            <LinhaInfo
              label="Alianças"
              items={aliancas}
              side={side}
              tituloNota="Registros de Aliança"
              onAlternarNota={onAlternarNota}
              resolverNome={getNomeRaca}
            />
            <LinhaInfo
              label="Inimigos"
              items={inimigos}
              side={side}
              tituloNota="Inimizades Antigas"
              onAlternarNota={onAlternarNota}
              resolverNome={getNomeRaca}
            />
          </div>

          {activeNote?.side === side && (
            <PapelMagico
              title={activeNote.title}
              items={activeNote.items}
              onItemClick={onItemClick} // 3. REPASSANDO A NAVEGAÇÃO
            />
          )}
        </div>

        <SecaoFraquezas fraquezas={fraquezas} />
      </div>

      {/* Paginação */}
      <div className="absolute bottom-0 left-0 right-0 font-['Cinzel'] text-xs font-bold text-[#4a321a]/80 text-center pt-2 border-t border-[#4a321a]/20 tracking-widest bg-[#cdb394] z-20">
        — {pageNum} —
      </div>
    </div>
  );
}
