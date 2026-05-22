"use client";

import { useState } from "react";
import {
  Raca,
  OrigemRaca,
  CategoriaRaca,
  LongevidadeRaca,
  mockRacas,
  mockRegioes,
} from "@/data/mockData";

// ── Tipos ──────────────────────────────────────────────────────────────────
type FormState = Omit<Raca, "id">;

const ORIGENS: OrigemRaca[] = [
  "Natural",
  "Artificial",
  "Maldição",
  "Extraterrestre",
  "???",
];

const CATEGORIAS: CategoriaRaca[] = [
  "Terrestre",
  "Aéreo",
  "Elemental",
  "Mágico",
  "Astral",
  "Aquático",
  "Infernal",
  "Celestial",
  "Divino",
  "Extinto",
  "???",
];

const LONGEVIDADES: LongevidadeRaca[] = [
  "50 anos",
  "100 anos",
  "150 anos",
  "200 anos",
  "300 anos",
  "500+",
  "Imortal",
  "???",
];

const FRAQUEZA_TIPOS = ["Físicas", "Mágicas", "Astral"] as const;

const VAZIO: FormState = {
  nome: "",
  origem: "Natural",
  idade_media: "???",
  descricao: "",
  aliancas_ids: [],
  inimigos_ids: [],
  categoria: [],
  regioes_ids: [],
  fraquezas: {},
};

// ── Sub-componentes internos ───────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-stone-700 mb-1">
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400 resize-none"
    />
  );
}

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium px-2 py-0.5 rounded-full">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-amber-600 hover:text-red-600 transition-colors leading-none"
      >
        ×
      </button>
    </span>
  );
}

// ── Componente Principal ───────────────────────────────────────────────────
export function RacaForm() {
  const [form, setForm] = useState<FormState>(VAZIO);
  const [fraquezasAtivas, setFraquezasAtivas] = useState<Set<string>>(
    new Set(),
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleCategoria = (cat: CategoriaRaca) =>
    set(
      "categoria",
      form.categoria.includes(cat)
        ? form.categoria.filter((c) => c !== cat)
        : [...form.categoria, cat],
    );

  const toggleLista = (
    key: "aliancas_ids" | "inimigos_ids" | "regioes_ids",
    id: string,
  ) =>
    set(
      key,
      (form[key] as string[]).includes(id)
        ? (form[key] as string[]).filter((i) => i !== id)
        : [...(form[key] as string[]), id],
    );

  const toggleFraqueza = (tipo: string) => {
    const next = new Set(fraquezasAtivas);
    if (next.has(tipo)) {
      next.delete(tipo);
      const fraquezas = { ...form.fraquezas };
      delete fraquezas[tipo as keyof typeof fraquezas];
      setForm((prev) => ({ ...prev, fraquezas }));
    } else {
      next.add(tipo);
    }
    setFraquezasAtivas(next);
  };

  const setFraquezaTexto = (tipo: string, valor: string) =>
    setForm((prev) => ({
      ...prev,
      fraquezas: { ...prev.fraquezas, [tipo]: valor },
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nova: Raca = {
      id: `raca_${form.nome.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`,
      ...form,
    };
    console.log("Nova raça:", nova);
    alert(`Raça "${nova.nome}" pronta para salvar! (ver console)`);
  };

  const handleReset = () => {
    setForm(VAZIO);
    setFraquezasAtivas(new Set());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-xl shadow-sm p-8 space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
          Cadastrar Raça
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Preencha os campos para adicionar uma nova raça ao grimório.
        </p>
      </div>

      {/* Nome */}
      <div>
        <Label>Nome *</Label>
        <Input
          required
          placeholder="Ex: Vampiro, Tritão..."
          value={form.nome}
          onChange={(e) => set("nome", e.target.value)}
        />
      </div>

      {/* Origem */}
      <div>
        <Label>Origem *</Label>
        <div className="flex flex-wrap gap-2">
          {ORIGENS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => set("origem", o)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                form.origem === o
                  ? "bg-amber-800 text-white border-amber-800"
                  : "bg-white text-stone-600 border-stone-300 hover:border-amber-600"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Longevidade — agora é select */}
      <div>
        <Label>Longevidade média</Label>
        <div className="flex flex-wrap gap-2">
          {LONGEVIDADES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => set("idade_media", l)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                form.idade_media === l
                  ? "bg-amber-800 text-white border-amber-800"
                  : "bg-white text-stone-600 border-stone-300 hover:border-amber-600"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <Label>Descrição *</Label>
        <Textarea
          required
          placeholder="Descreva a raça, suas características, comportamentos..."
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
        />
      </div>

      {/* Categorias */}
      <div>
        <Label>Categorias</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategoria(cat)}
              className={`px-3 py-1 rounded-md text-sm font-medium border transition-all ${
                form.categoria.includes(cat)
                  ? "bg-amber-800 text-white border-amber-800"
                  : "bg-white text-stone-600 border-stone-300 hover:border-amber-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Regiões */}
      <div>
        <Label>Regiões</Label>
        <div className="flex flex-wrap gap-2">
          {mockRegioes.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => toggleLista("regioes_ids", r.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium border transition-all ${
                form.regioes_ids.includes(r.id)
                  ? "bg-amber-800 text-white border-amber-800"
                  : "bg-white text-stone-600 border-stone-300 hover:border-amber-600"
              }`}
            >
              {r.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Alianças */}
      <div>
        <Label>Alianças</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.aliancas_ids.map((id) => {
            const raca = mockRacas.find((r) => r.id === id);
            return (
              <Tag
                key={id}
                label={raca?.nome ?? id}
                onRemove={() => toggleLista("aliancas_ids", id)}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {mockRacas
            .filter((r) => !form.aliancas_ids.includes(r.id))
            .map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleLista("aliancas_ids", r.id)}
                className="px-3 py-1 rounded-md text-sm font-medium border bg-white text-stone-600 border-stone-300 hover:border-green-600 hover:text-green-700 transition-all"
              >
                + {r.nome}
              </button>
            ))}
        </div>
      </div>

      {/* Inimigos */}
      <div>
        <Label>Inimigos</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.inimigos_ids.map((id) => {
            const raca = mockRacas.find((r) => r.id === id);
            return (
              <Tag
                key={id}
                label={raca?.nome ?? id}
                onRemove={() => toggleLista("inimigos_ids", id)}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {mockRacas
            .filter((r) => !form.inimigos_ids.includes(r.id))
            .map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleLista("inimigos_ids", r.id)}
                className="px-3 py-1 rounded-md text-sm font-medium border bg-white text-stone-600 border-stone-300 hover:border-red-500 hover:text-red-700 transition-all"
              >
                + {r.nome}
              </button>
            ))}
        </div>
      </div>

      {/* Fraquezas */}
      <div>
        <Label>Fraquezas</Label>
        <p className="text-xs text-stone-400 mb-3">
          Marque os tipos que existem e preencha o campo que aparece.
        </p>
        <div className="space-y-3">
          {FRAQUEZA_TIPOS.map((tipo) => (
            <div key={tipo}>
              <button
                type="button"
                onClick={() => toggleFraqueza(tipo)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  fraquezasAtivas.has(tipo)
                    ? "text-amber-800"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    fraquezasAtivas.has(tipo)
                      ? "bg-amber-800 border-amber-800 text-white"
                      : "border-stone-400"
                  }`}
                >
                  {fraquezasAtivas.has(tipo) && (
                    <svg
                      viewBox="0 0 10 10"
                      className="w-2.5 h-2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="1.5,5 4,7.5 8.5,2.5" />
                    </svg>
                  )}
                </span>
                {tipo}
              </button>
              {fraquezasAtivas.has(tipo) && (
                <Textarea
                  className="mt-2"
                  placeholder={`Descreva a fraqueza ${tipo.toLowerCase()}...`}
                  value={(form.fraquezas as Record<string, string>)[tipo] ?? ""}
                  onChange={(e) => setFraquezaTexto(tipo, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-3 pt-2 border-t border-stone-100">
        <button
          type="submit"
          className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Salvar Raça
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors text-sm font-medium"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
