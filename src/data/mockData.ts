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
}

// --- 2. DADOS DE TESTE (MOCK DATA) ---

export const mockRegioes: Regiao[] = [
  {
    id: "regiao_medieval",
    nome: "Medieval",
    sub_regioes: [
      "Dark Fantasy",
      "Alchemypunk",
      "Dungeonpunk",
      "Bio-Medieval",
      "Maritime Medieval",
    ],
  },
  {
    id: "regiao_submundo",
    nome: "Submundo",
    sub_regioes: ["Inferno", "Tártaro", "Duat", "Helheim", "Mictlan", "Diyu"],
  },
  {
    id: "regiao_desconhecida",
    nome: "???",
    sub_regioes: [],
  },
];

export const mockRacas: Raca[] = [
  {
    id: "raca_vampiro",
    nome: "Vampiro",
    origem: "Maldição",
    idade_media: "500+",
    descricao:
      "Criaturas da noite que se alimentam de essência vital (sangue). Possuem velocidade e regeneração aprimoradas, mas são severamente punidos pela luz solar.",
    aliancas_ids: ["raca_tritao"],
    inimigos_ids: ["raca_lobisomem", "raca_tritao"],
    categoria: ["Terrestre", "Mágico"],
    regioes_ids: ["regiao_medieval", "regiao_submundo"],
    fraquezas: {
      Físicas:
        "Decapitação, estaca de madeira pura no coração e exposição extrema ao Sol.",
      Mágicas:
        "Vulnerabilidade a feitiços de luz sagrada e água benta encantada.",
    },
  },
  {
    id: "raca_tritao",
    nome: "Tritão",
    origem: "Natural",
    idade_media: "150 anos",
    descricao:
      "Humanoides anfíbios que dominam as profundezas dos oceanos. Conseguem se comunicar com a fauna marinha e manipular correntes de água de forma sutil.",
    aliancas_ids: ["raca_vampiro"],
    inimigos_ids: [],
    categoria: ["Aquático", "Terrestre"],
    regioes_ids: ["regiao_medieval"],
    fraquezas: {
      Físicas:
        "Desidratação severa se passar mais de 48 horas longe de água salgada.",
      Astral:
        "Sensibilidade a ataques espirituais que quebrem sua conexão mental com o oceano.",
    },
  },
  {
    id: "raca_lobisomem",
    nome: "Lobisomem",
    origem: "Maldição",
    idade_media: "200 anos",
    descricao:
      "Humanoides com semelhanças de um Lobo com garras afiadas, caninos imensos, sentidos aprimorados, físico sobre-humano e com um fortalecimento à noite.",
    aliancas_ids: ["raca_tritao"],
    inimigos_ids: ["raca_vampiro"],
    categoria: ["Terrestre"],
    regioes_ids: ["regiao_medieval"],
    fraquezas: {
      Físicas:
        "Armas com metais nobres ou especiais conseguem inibir sua regeneração.",
      Mágicas:
        "Existem magias que conseguem enfurecer e fazer com que ataquem seus aliados e armas mágicas conseguem ignorar sua pele resistente.",
      Astral:
        "Com ataques que afetem sua alma podem quebrar o vínculo que eles têm com a Lua.",
    },
  },
];
