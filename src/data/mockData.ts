// --- 1. DEFINIÇÃO DOS CONTRATOS (TYPES) ---

export interface Regiao {
  id: string;
  nome: string;
  sub_regioes: string[];
}

// Criando tipos fixos para evitar erros de digitação depois
export type OrigemRaca =
  | "Natural"
  | "Artificial"
  | "Maldição"
  | "Extraterrestre";

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

export interface FraquezasRaca {
  Físicas?: string;
  Mágicas?: string;
  Astral?: string;
}

export interface Raca {
  id: string;
  nome: string;
  origem: OrigemRaca;
  idade_media: string | number;
  descricao: string;
  aliancas_ids: string[];
  inimigos_ids: string[];
  categoria: CategoriaRaca[];
  regioes_ids: string[]; // Vai guardar o ID das regiões onde essa raça vive
  fraquezas: FraquezasRaca; // Objeto com textos separados por tipo
}

// --- 2. DADOS DE TESTE (MOCK DATA) ---

export const mockRegioes: Regiao[] = [
  {
    id: "regiao_medieval",
    nome: "Medieval",
    sub_regioes: [
      "Dark Fantasy", // Exemplos: Yharnam (Bloodborne), Novigrad (The Witcher 3) ou cidades de Dark Souls.
      "Alchemypunk", // Exemplos: Cidades de A Plague Tale: Innocence ou Dishonored (que flerta entre o medieval tardio e o industrial).
      "Dungeonpunk", // Exemplos: Ironforge (World of Warcraft) ou cidades do Underdark (D&D).
      "Bio-Medieval", // Exemplos: Rivendell/Lóthlorien (O Senhor dos Anéis).
      "Maritime Medieval", // Exemplos: Bilgewater (League of Legends) ou Braavos (Game of Thrones).
    ],
  },
  {
    id: "regiao_submundo",
    nome: "Submundo",
    sub_regioes: [
      "Inferno", // Base: Cristianismo / A Divina Comédia
      "Tártaro", // Base: Mitologia Grega
      "Duat", // Base: Mitologia Egípcia
      "Helheim", // Base: Mitologia Nórdica
      "Mictlan", // Base: Mitologia Asteca
      "Diyu", // Base: Budismo/Taoísmo
    ],
  },
];

export const mockRacas: Raca[] = [
  {
    id: "raca_vampiro",
    nome: "Vampiro",
    origem: "Maldição",
    idade_media: "500 Anos(Mas alguns podem ser Imortal)",
    descricao:
      "Criaturas da noite que se alimentam de essência vital (sangue). Possuem velocidade e regeneração aprimoradas, mas são severamente punidos pela luz solar.",
    aliancas_ids: ["raca_tritao"],
    inimigos_ids: ["raca_lobisomem"],
    categoria: ["Terrestre", "Mágico"],
    regioes_ids: ["regiao_medieval", "regiao_submundo"], // Vive tanto no feudo medieval quanto no submundo
    fraquezas: {
      Físicas:
        "Decapitação, estaca de madeira pura no coração e exposição extrema ao Sol.",
      Mágicas:
        "Vulnerabilidade a feitiços de luz sagrada e água benta encantada.",
      // Note que "Astral" ficou de fora, o sistema vai saber lidar com isso!
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
    regioes_ids: ["regiao_medieval"], // Vive nas praias e mares da região medieval
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
      "Humanoides com semelhanças de um Lobo com garras afiadas, caninos imensos, sentidos aprimorados, fisico sobre-humano e com um fortalecimento a noite.",
    aliancas_ids: ["raca_tritao"],
    inimigos_ids: ["raca_vampiro"],
    categoria: ["Terrestre"],
    regioes_ids: ["regiao_medieval"],
    fraquezas: {
      Físicas:
        "Armas com metais nobres ou especiais conseguem inibir sua regeneração",
      Mágicas:
        "Existem mágias que conseguem enfurecer e fazer com que ataquem seus aliados e armas mágicas conseguem ignorar sua pele resistente",
    },
  },
];
