"use client";

import { Raca } from "@/data/mockData";
import { ActiveNote } from "./hooks/useLivro";
import { PapelMagico } from "./PapelMagico";
import { SecaoFraquezas } from "./SecaoFraquezas";
import { LinhaInfo } from "./LinhaInfo";
import Image from "next/image";

type PaginaRacaMobileProps = {
  raca: Raca | undefined;
  pageNum: number;
  totalPaginas: number;
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

export function PaginaRacaMobile({
  raca,
  pageNum,
  totalPaginas,
  activeNote,
  onAlternarNota,
  getNomeRaca,
  getNomeRegiao,
  onItemClick,
}: PaginaRacaMobileProps) {
  const isRightPage = pageNum % 2 === 0;
  const side = isRightPage ? "right" : "left";

  if (!raca) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-20 text-[#4a331e] font-['IM_Fell_English'] text-center select-none px-8 ${
          isRightPage ? "pl-8 pr-4" : "pl-4 pr-8"
        }`}
      >
        <span className="text-[32px] leading-none mb-4 opacity-60">✦</span>
        <p className="text-lg italic leading-relaxed opacity-60">
          As páginas seguintes foram arrancadas...
        </p>
        <p className="text-sm opacity-40 mt-1">
          ou consumidas por algo antigo.
        </p>
      </div>
    );
  }

  const fraquezas = (raca.fraquezas as Record<string, string>) || {};
  const aliancas = raca.aliancas_ids || [];
  const inimigos = raca.inimigos_ids || [];
  const categorias = raca.categoria || [];
  const regioes = raca.regioes_ids || [];

  return (
    <div
      className={`font-['IM_Fell_English'] select-none relative flex flex-col flex-1 h-full ${
        isRightPage ? "pl-8 pr-4" : "pl-4 pr-8"
      }`}
    >
      <div className="absolute top-0 left-0 w-64 h-48 bg-radial-[rgba(65,35,10,0.25)_0%,transparent_70%] pointer-events-none mix-blend-multiply z-0" />
      <div className="absolute bottom-0 right-0 w-44 h-36 bg-radial-[rgba(55,25,5,0.30)_0%,transparent_60%] pointer-events-none mix-blend-multiply z-0" />

      <div className="relative z-10 flex flex-col flex-1 h-full">
        <header className="text-center mb-2 shrink-0">
          <span className="text-[11px] uppercase tracking-[3px] text-[#4a321a] font-bold block">
            ~ Origem: {raca.origem || "Sem Dados"} ~
          </span>
          <h2 className="font-['Cinzel'] text-2xl font-extrabold text-[#210f05] tracking-wide leading-tight mt-0.5">
            {raca.nome}
          </h2>
          <div className="w-full h-px bg-linear-to-r from-transparent via-[#4a321a]/40 to-transparent relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#4a321a] bg-[#cdb394] px-2">
              ✧
            </span>
          </div>
        </header>

        <div className="flex gap-3 items-start shrink-0">
          {raca.imagem_url ? (
            <Image
              src={raca.imagem_url}
              alt={raca.nome}
              width={112}
              height={144}
              className="shrink-0 border border-[#4a321a]/70 rounded shadow-sm object-cover"
            />
          ) : (
            <div className="w-28 h-32 shrink-0 border border-[#4a321a]/70 bg-stone-950/15 relative flex flex-col items-center justify-center rounded shadow-sm">
              <div className="absolute inset-0.5 border border-[#4a321a]/20 border-dashed" />
              <span className="text-[10px] tracking-widest font-bold text-[#4a321a]/80 uppercase font-['Cinzel']">
                Gravura
              </span>
            </div>
          )}
          <p className="flex-1 text-[11px] leading-relaxed text-[#170a03] italic ">
            {raca.descricao ||
              "Nenhum relato escrito foi encontrado sobre esta criatura nos arquivos antigos."}
          </p>
        </div>

        <div className="w-full bg-[#4a321a]/25 shrink-0" />

        <div className="flex-1 min-h-4" />

        <div className="relative shrink-0 flex flex-col gap-2">
          <div className="space-y-2 text-[14px] text-[#170a03]">
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
              onItemClick={onItemClick}
            />
          )}

          <SecaoFraquezas fraquezas={fraquezas} />
        </div>

        <div className="shrink-0 font-['Cinzel'] text-xs font-bold text-[#4a321a]/80 text-center pt-2 border-t border-[#4a321a]/20 tracking-widest">
          — {pageNum} / {totalPaginas} —
        </div>
      </div>
    </div>
  );
}
