import { useState, useCallback } from "react";
import { Raca, Regiao } from "@/data/mockData";
import { playSound } from "@/utils/playSound";

export type ActiveNote = {
  side: "left" | "right";
  title: string;
  items: string[];
} | null;

export type DirecaoFlip = "avancar" | "voltar" | null;

interface UseLivroParams {
  racasFiltradas: Raca[];
  todasRacas: Raca[];
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
  const [direcao, setDirecao] = useState<DirecaoFlip>(null);
  const [fechando, setFechando] = useState(false); // NOVO

  const totalRacas = racasFiltradas.length;
  const paginaSegura = Math.min(currentPage, Math.max(0, totalRacas - 1));

  const alternarNota = (
    e: React.MouseEvent,
    side: "left" | "right",
    title: string,
    items: string[],
  ) => {
    e.stopPropagation();

    if (activeNote?.side === side && activeNote?.title === title) {
      playSound("/sounds/PapelMagicoClose.mp3", 0.65);
      setActiveNote(null);
    } else {
      playSound("/sounds/PapelMagicoOpen.mp3", 0.65);
      setActiveNote({ side, title, items });
    }
  };

  const fecharNota = useCallback(() => {
    if (activeNote) {
      playSound("/sounds/PapelMagicoClose.mp3", 0.3); // 🎵 Toca o som de sumir
      setActiveNote(null);
    }
  }, [activeNote]);

  const avancarPagina = useCallback(() => {
    if (paginaSegura + 2 >= totalRacas || direcao) return;
    playSound("/sounds/PaginaFlip.mp3", 0.45);
    setDirecao("avancar");
    setActiveNote(null);
    setTimeout(() => {
      setCurrentPage((p) => p + 2);
      setDirecao(null);
    }, 350);
  }, [paginaSegura, totalRacas, direcao]);

  const voltarPagina = useCallback(() => {
    if (paginaSegura - 2 < 0 || direcao) return;
    playSound("/sounds/PaginaFlip.mp3", 0.45);
    setDirecao("voltar");
    setActiveNote(null);
    setTimeout(() => {
      setCurrentPage((p) => p - 2);
      setDirecao(null);
    }, 350);
  }, [paginaSegura, direcao]);

  const abrirLivro = () => {
    setCurrentPage(0);
    setFechando(false);
    setIsOpen(true);
  };

  // NOVO — aguarda animação antes de desmontar
  const fecharLivro = useCallback(() => {
    if (fechando) return;
    playSound("/sounds/BookClose.wav", 0.7);
    setFechando(true);
    setActiveNote(null);
    setDirecao(null);
    setTimeout(() => {
      setIsOpen(false);
      setFechando(false);
      setCurrentPage(0);
    }, 500);
  }, [fechando]);

  const getNomeRaca = (id: string) =>
    todasRacas.find((r) => r.id === id)?.nome ?? "Desconhecida";

  const getNomeRegiao = (id: string) =>
    regioes.find((r) => r.id === id)?.nome ?? id;

  return {
    isOpen,
    currentPage: paginaSegura,
    activeNote,
    direcao,
    fechando, // NOVO
    totalRacas,
    racaEsquerda: racasFiltradas[paginaSegura],
    racaDireita: racasFiltradas[paginaSegura + 1],
    podVoltar: paginaSegura > 0 && !direcao && !fechando, // NOVO !fechando
    podAvancar: paginaSegura + 2 < totalRacas && !direcao && !fechando, // NOVO !fechando
    abrirLivro,
    fecharLivro,
    fecharNota,
    alternarNota,
    avancarPagina,
    voltarPagina,
    limparNota: () => setActiveNote(null),
    getNomeRaca,
    getNomeRegiao,
  };
}
