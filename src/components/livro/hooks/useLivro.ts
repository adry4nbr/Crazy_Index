import { useState } from "react";
import { mockRacas } from "@/data/mockData";

export type ActiveNote = {
  side: "left" | "right";
  title: string;
  items: string[];
} | null;

export function useLivro() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeNote, setActiveNote] = useState<ActiveNote>(null);

  const totalRacas = mockRacas.length;

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
    if (currentPage + 2 < totalRacas) {
      setCurrentPage((p) => p + 2);
      setActiveNote(null);
    }
  };

  const voltarPagina = () => {
    if (currentPage - 2 >= 0) {
      setCurrentPage((p) => p - 2);
      setActiveNote(null);
    }
  };

  const abrirLivro = () => setIsOpen(true);

  const fecharLivro = () => {
    setIsOpen(false);
    setActiveNote(null);
  };

  const getNomeRaca = (id: string) =>
    mockRacas.find((r) => r.id === id)?.nome ?? "Desconhecida";

  const getNomeRegiao = (id: string) => id;

  return {
    isOpen,
    currentPage,
    activeNote,
    totalRacas,
    racaEsquerda: mockRacas[currentPage],
    racaDireita: mockRacas[currentPage + 1],
    podVoltar: currentPage > 0,
    podAvancar: currentPage + 2 < totalRacas,
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
