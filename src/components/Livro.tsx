"use client";

import { useState } from "react";
import { mockRacas } from "@/data/mockData";

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

  // Função mágica para pegar o nome da raça através do ID
  const getNomeRaca = (id: string) => {
    const raca = mockRacas.find((r) => r.id === id);
    return raca ? raca.nome : "Desconhecida";
  };

  // 📖 CAPA DO GRIMÓRIO (Estilo Necronomicon)
  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="w-95 h-137.5 bg-[#2a1e1a] border-4 border-[#1c120f] rounded-r-3xl shadow-[20px_20px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center cursor-pointer transform hover:rotate-y-6 transition-all duration-700 hover:scale-105 select-none relative group"
        style={{ perspective: "1200px" }}
      >
        {/* Textura de couro velho / costura */}
        <div className="absolute inset-2 border-2 border-dashed border-[#4a3525] opacity-50 rounded-r-2xl pointer-events-none" />
        <div className="absolute left-4 top-0 bottom-0 w-8 bg-[#1c120f] opacity-80 shadow-[5px_0_15px_rgba(0,0,0,0.9)]" />

        <h1 className="text-[#a42b2b] font-serif text-5xl font-extrabold tracking-widest text-center px-8 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] z-10 opacity-90">
          CRAZY INDEX
        </h1>
        <p className="text-[#8c7462] font-serif text-sm mt-6 tracking-[0.3em] uppercase z-10">
          Tomo I: Bestiário
        </p>

        {/* Adorno místico (pentagrama/símbolo simples) */}
        <div className="absolute bottom-16 text-[#a42b2b] text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
          ⛤
        </div>

        <span className="absolute bottom-6 text-[#8c7462] text-xs animate-pulse opacity-60">
          Ouse abrir o conhecimento proibido...
        </span>
      </div>
    );
  }

  const racaEsquerda = mockRacas[currentPage];
  const racaDireita = mockRacas[currentPage + 1];

  // 📖 FUNÇÃO PARA RENDERIZAR UMA PÁGINA INTERNA COM OS DADOS
  const renderizarPagina = (
    raca: typeof racaEsquerda,
    numeroPagina: number,
  ) => {
    if (!raca) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-[#7a6452] opacity-40 font-serif text-xl italic">
          As páginas seguintes foram arrancadas...
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        {/* Título e Origem */}
        <div className="text-center mb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#6e5440] font-bold">
            ~ Origem: {raca.origem} ~
          </span>
          <h2
            className="text-3xl font-extrabold text-[#3d2b1f] font-serif mt-1 drop-shadow-sm"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {raca.nome}
          </h2>
        </div>

        {/* 🪄 NOVO LAYOUT: Imagem e Descrição lado a lado */}
        <div className="flex gap-4 mb-4">
          {/* Imagem (Largura reduzida) */}
          <div className="w-28 h-36 border border-[#7a6452] border-dashed rounded bg-[#3d2b1f]/5 flex flex-col items-center justify-center shrink-0">
            <span className="text-2xl opacity-40">🖋️</span>
            <span className="text-[10px] text-[#7a6452] font-serif italic text-center px-2">
              Gravura de {raca.nome}
            </span>
          </div>

          {/* Descrição ao lado */}
          <p className="flex-1 text-sm leading-relaxed text-[#2c1e16] font-serif italic overflow-y-auto max-h-36 pr-1 custom-scrollbar">
            {raca.descricao}
          </p>
        </div>

        {/* Linha divisória de tinta */}
        <div className="w-full h-px bg-[#7a6452]/40 mb-4 rounded-[50%]" />

        {/* Informações Técnicas e Relacionamentos (Baixo) */}
        <div className="flex-1 overflow-y-auto space-y-3 text-xs text-[#3d2b1f] font-serif pr-2 custom-scrollbar">
          <p>
            <strong>⏳ Longevidade:</strong> {raca.idade_media}
          </p>
          <p>
            <strong>🏷️ Categoria(s):</strong> {raca.categoria.join(", ")}
          </p>

          {raca.aliancas_ids && raca.aliancas_ids.length > 0 && (
            <p>
              <strong>🤝 Alianças Conhecidas:</strong>{" "}
              <span className="text-blue-900/80 cursor-pointer hover:underline">
                {raca.aliancas_ids.map(getNomeRaca).join(", ")}
              </span>
            </p>
          )}

          {raca.inimigos_ids && raca.inimigos_ids.length > 0 && (
            <p>
              <strong>⚔️ Inimigos Declarados:</strong>{" "}
              <span className="text-red-900/80 cursor-pointer hover:underline">
                {raca.inimigos_ids.map(getNomeRaca).join(", ")}
              </span>
            </p>
          )}

          {raca.fraquezas && Object.keys(raca.fraquezas).length > 0 && (
            <div className="mt-2 bg-[#7a6452]/10 p-2 border-l-2 border-[#7a6452]">
              <strong className="block mb-1 font-bold text-[#5c3a21]">
                ⚠️ Registros de Fraqueza:
              </strong>
              <ul className="list-disc list-inside space-y-1 ml-1 text-[#4a3018]">
                {raca.fraquezas.Físicas && (
                  <li>
                    <strong>Física:</strong> {raca.fraquezas.Físicas}
                  </li>
                )}
                {raca.fraquezas.Mágicas && (
                  <li>
                    <strong>Mágica:</strong> {raca.fraquezas.Mágicas}
                  </li>
                )}
                {raca.fraquezas.Astral && (
                  <li>
                    <strong>Astral:</strong> {raca.fraquezas.Astral}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 📖 PÁGINAS ABERTAS (Pergaminho envelhecido)
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="flex w-212.5 h-150 bg-[#d5c2a5] border-12 border-[#2a1e1a] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Sombra interna para dar o aspecto de sujeira/tempo no papel */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(89,62,43,0.6)] pointer-events-none z-0" />

        {/* Dobra central do livro e sombras */}
        <div className="absolute inset-y-0 left-1/2 w-10 -ml-5 bg-linear-to-r from-transparent via-[#593e2b]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#3d2b1f]/60 shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10" />

        {/* PÁGINA ESQUERDA */}
        <div className="w-1/2 h-full p-8 px-10 relative z-0 flex flex-col justify-between">
          {renderizarPagina(racaEsquerda, currentPage + 1)}
          <span className="text-xs text-center font-serif text-[#7a6452] mt-4 font-bold border-t border-[#7a6452]/30 pt-2">
            - {currentPage + 1} -
          </span>
        </div>

        {/* PÁGINA DIREITA */}
        <div className="w-1/2 h-full p-8 px-10 relative z-0 flex flex-col justify-between bg-linear-to-l from-transparent to-[#c8b394]/30">
          {renderizarPagina(racaDireita, currentPage + 2)}
          <span className="text-xs text-center font-serif text-[#7a6452] mt-4 font-bold border-t border-[#7a6452]/30 pt-2">
            - {currentPage + 2} -
          </span>
        </div>
      </div>

      {/* CONTROLES ESTILO MESA DE RPG */}
      <div className="flex gap-8 mt-8">
        <button
          onClick={voltarPagina}
          disabled={currentPage === 0}
          className="px-6 py-2 bg-[#2a1e1a] hover:bg-[#3d2b1f] text-[#d5c2a5] disabled:opacity-30 disabled:hover:bg-[#2a1e1a] rounded font-serif tracking-widest text-sm transition-all shadow-lg border border-[#593e2b]"
        >
          ⮜ Página Anterior
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 bg-[#1a1311] hover:bg-[#8b0000] text-[#7a6452] hover:text-white rounded font-serif text-xs uppercase tracking-widest transition-all border border-[#2a1e1a]"
        >
          Fechar Grimório
        </button>
        <button
          onClick={avancarPagina}
          disabled={currentPage + 2 >= totalRacas}
          className="px-6 py-2 bg-[#2a1e1a] hover:bg-[#3d2b1f] text-[#d5c2a5] disabled:opacity-30 disabled:hover:bg-[#2a1e1a] rounded font-serif tracking-widest text-sm transition-all shadow-lg border border-[#593e2b]"
        >
          Próxima Página ⮞
        </button>
      </div>
    </div>
  );
}
