import { useState } from "react";
import { Raca, mockRacas } from "@/data/mockData";

export type ActiveNote = {
  side: "left" | "right";
  title: string;
  items: string[];
} | null;

export function useLivro(racas: Raca[] = mockRacas) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeNote, setActiveNote] = useState<ActiveNote>(null);

  const totalRacas = racas.length;

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

  const getNomeRaca = (id: string) =>
    mockRacas.find((r) => r.id === id)?.nome ?? "Desconhecida";

  const getNomeRegiao = (id: string) => id;

  return {
    isOpen,
    currentPage: paginaSegura,
    activeNote,
    totalRacas,
    racaEsquerda: racas[paginaSegura],
    racaDireita: racas[paginaSegura + 1],
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
