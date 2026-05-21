"use client";

import { mockRacas } from "@/data/mockData";
import { ActiveNote } from "./hooks/useLivro";
import { PapelMagico } from "./PapelMagico";
import { SecaoFraquezas } from "./SecaoFraquezas";
import { LinhaInfo } from "./LinhaInfo";

type RacaType = (typeof mockRacas)[number];

type PaginaRacaProps = {
  raca: RacaType | undefined;
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
};

export function PaginaRaca({
  raca,
  pageNum,
  side,
  activeNote,
  onAlternarNota,
  getNomeRaca,
  getNomeRegiao,
}: PaginaRacaProps) {
  const isLeft = side === "left";

  if (!raca) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#4a331e] opacity-40 font-['IM_Fell_English'] text-xl italic text-center p-12">
        As páginas seguintes foram arrancadas ou consumidas pelo tempo...
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
            <PapelMagico title={activeNote.title} items={activeNote.items} />
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
