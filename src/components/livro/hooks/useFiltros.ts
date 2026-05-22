import { useState, useMemo } from "react";
import {
  LongevidadeRaca,
  CategoriaRaca,
  OrigemRaca,
  mockRacas,
} from "@/data/mockData";

export interface FiltrosState {
  busca: string;
  longevidades: LongevidadeRaca[];
  categorias: CategoriaRaca[];
  origens: OrigemRaca[];
  regioes: string[];
  aliancas: string[];
  inimigos: string[];
}

const FILTROS_VAZIOS: FiltrosState = {
  busca: "",
  longevidades: [],
  categorias: [],
  origens: [],
  regioes: [],
  aliancas: [],
  inimigos: [],
};

function temFiltros(f: FiltrosState) {
  return (
    f.busca !== "" ||
    f.longevidades.length > 0 ||
    f.categorias.length > 0 ||
    f.origens.length > 0 ||
    f.regioes.length > 0 ||
    f.aliancas.length > 0 ||
    f.inimigos.length > 0
  );
}

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export function useFiltros() {
  const [filtros, setFiltros] = useState<FiltrosState>(FILTROS_VAZIOS);

  const racasFiltradas = useMemo(() => {
    return mockRacas.filter((raca) => {
      if (
        filtros.busca &&
        !raca.nome.toLowerCase().includes(filtros.busca.toLowerCase())
      )
        return false;

      if (
        filtros.longevidades.length > 0 &&
        !filtros.longevidades.includes(raca.idade_media as LongevidadeRaca)
      )
        return false;

      if (
        filtros.categorias.length > 0 &&
        !filtros.categorias.every((c) => raca.categoria.includes(c))
      )
        return false;

      if (filtros.origens.length > 0 && !filtros.origens.includes(raca.origem))
        return false;

      if (
        filtros.regioes.length > 0 &&
        !filtros.regioes.every((r) => raca.regioes_ids.includes(r))
      )
        return false;

      if (
        filtros.aliancas.length > 0 &&
        !filtros.aliancas.every((a) => raca.aliancas_ids.includes(a))
      )
        return false;

      if (
        filtros.inimigos.length > 0 &&
        !filtros.inimigos.every((i) => raca.inimigos_ids.includes(i))
      )
        return false;

      return true;
    });
  }, [filtros]);

  const set = <K extends keyof FiltrosState>(key: K, value: FiltrosState[K]) =>
    setFiltros((prev) => ({ ...prev, [key]: value }));

  const toggle = <K extends keyof Omit<FiltrosState, "busca">>(
    key: K,
    item: FiltrosState[K] extends (infer U)[] ? U : never,
  ) =>
    setFiltros((prev) => ({
      ...prev,
      [key]: toggleItem(prev[key] as unknown[], item),
    }));

  const limpar = () => setFiltros(FILTROS_VAZIOS);

  return {
    filtros,
    racasFiltradas,
    temFiltros: temFiltros(filtros),
    set,
    toggle,
    limpar,
  };
}
