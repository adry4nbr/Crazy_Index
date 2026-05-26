// --- 1. DEFINIÇÃO DOS CONTRATOS (TYPES) ---

export interface Regiao {
  id: string;
  nome: string;
  sub_regioes: string[];
}

export type OrigemRaca =
  | "Natural"
  | "Artificial"
  | "Extraterrestre"
  | "Maldição"
  | "???";

export type CategoriaRaca =
  | "Terrestre"
  | "Aéreo"
  | "Elemental"
  | "Mágico"
  | "Astral"
  | "Aquático"
  | "Infernal"
  | "Celestial"
  | "Divino"
  | "Extinto"
  | "???";

export type LongevidadeRaca =
  | "50 anos"
  | "100 anos"
  | "150 anos"
  | "200 anos"
  | "300 anos"
  | "500+"
  | "Imortal"
  | "???";

export interface FraquezasRaca {
  Físicas?: string;
  Mágicas?: string;
  Astral?: string;
}

export interface Raca {
  id: string;
  nome: string;
  origem: OrigemRaca;
  idade_media: LongevidadeRaca;
  descricao: string;
  aliancas_ids: string[];
  inimigos_ids: string[];
  categoria: CategoriaRaca[];
  regioes_ids: string[];
  fraquezas: FraquezasRaca;
  imagem_url?: string;
}
