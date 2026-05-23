import { useState } from "react";
import { Raca, Regiao } from "@/data/mockData";

export type ActiveNote = {
  side: "left" | "right";
  title: string;
  items: string[];
} | null;

interface UseLivroParams {
  // Lista já filtrada pelo useFiltros — controla o que aparece nas páginas
  racasFiltradas: Raca[];
  // Lista completa — usada para resolver nomes em aliancas/inimigos
  todasRacas: Raca[];
  // Lista de regioes — usada para resolver nomes de regioes_ids
  regioes: Regiao[];
}

export function useLivro({
  racasFiltradas,
  todasRacas,
  regioes,
}: UseLivroParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeNote, setActiveNote] = useState<ActiveNote>(null);

  const totalRacas = racasFiltradas.length;

  // Garante que a página atual não ultrapasse o total filtrado
  const paginaSegura = Math.min(currentPage, Math.max(0, totalRacas - 1));

  const alternarNota = (
    e: React.MouseEvent,
    side: "left" | "right",
    title: string,
    items: string[],
  ) => {
    e.stopPropagation();
    if (activeNote?.side === side && activeNote?.title === title) {
      setActiveNote(null);
    } else {
      setActiveNote({ side, title, items });
    }
  };

  const avancarPagina = () => {
    if (paginaSegura + 2 < totalRacas) {
      setCurrentPage((p) => p + 2);
      setActiveNote(null);
    }
  };

  const voltarPagina = () => {
    if (paginaSegura - 2 >= 0) {
      setCurrentPage((p) => p - 2);
      setActiveNote(null);
    }
  };

  const abrirLivro = () => {
    setCurrentPage(0);
    setIsOpen(true);
  };

  const fecharLivro = () => {
    setIsOpen(false);
    setActiveNote(null);
  };

  // Resolve o nome de uma raça pelo id — usa a lista completa (não a filtrada)
  // para que aliados/inimigos apareçam corretamente mesmo quando filtrados
  const getNomeRaca = (id: string) =>
    todasRacas.find((r) => r.id === id)?.nome ?? "Desconhecida";

  // Resolve o nome de uma região pelo id
  const getNomeRegiao = (id: string) =>
    regioes.find((r) => r.id === id)?.nome ?? id;

  return {
    isOpen,
    currentPage: paginaSegura,
    activeNote,
    totalRacas,
    racaEsquerda: racasFiltradas[paginaSegura],
    racaDireita: racasFiltradas[paginaSegura + 1],
    podVoltar: paginaSegura > 0,
    podAvancar: paginaSegura + 2 < totalRacas,
    abrirLivro,
    fecharLivro,
    alternarNota,
    avancarPagina,
    voltarPagina,
    limparNota: () => setActiveNote(null),
    getNomeRaca,
    getNomeRegiao,
  };
}
