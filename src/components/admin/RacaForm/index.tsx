// index.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Raca,
  OrigemRaca,
  CategoriaRaca,
  LongevidadeRaca,
  Regiao, // 👈 Adicionamos a tipagem da Região aqui
} from "@/data/mockData";

import { Label, Input, Textarea, BotaoToggle } from "./FormUI";
import { Relacionamentos } from "./Relacionamentos";
import { Fraquezas } from "./Fraquezas";

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

// 👇 NOVA INTERFACE PARA AS PROPS DO COMPONENTE
export function RacaForm({
  racaInicial,
  todasRacas,
  todasRegioes,
}: {
  racaInicial?: Raca;
  todasRacas: Raca[];
  todasRegioes: Regiao[];
}) {
  const router = useRouter();
  const isEdicao = !!racaInicial;

  const [removerImagem, setRemoverImagem] = useState(false);
  const [form, setForm] = useState<FormState>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    racaInicial ? (({ id, ...rest }) => rest)(racaInicial) : VAZIO,
  );
  const [fraquezasAtivas, setFraquezasAtivas] = useState<Set<string>>(
    new Set(racaInicial ? Object.keys(racaInicial.fraquezas) : []),
  );
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string>(
    racaInicial?.imagem_url ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleLista = (
    key: "aliancas_ids" | "inimigos_ids" | "regioes_ids" | "categoria",
    id: string,
  ) =>
    set(
      key,
      ((form[key] as string[]).includes(id)
        ? (form[key] as string[]).filter((i) => i !== id)
        : [...(form[key] as string[]), id]) as FormState[typeof key],
    );

  const toggleFraqueza = (tipo: string) => {
    const next = new Set(fraquezasAtivas);
    if (next.has(tipo)) {
      next.delete(tipo);
      const fraquezas = { ...form.fraquezas };
      delete fraquezas[tipo as keyof typeof fraquezas];
      setForm((prev) => ({ ...prev, fraquezas }));
    } else next.add(tipo);
    setFraquezasAtivas(next);
  };

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagem(file);
    setImagemPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const id = isEdicao
        ? racaInicial!.id
        : `raca_${form.nome.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;
      let imagem_url = racaInicial?.imagem_url ?? "";

      if (imagem) {
        const ext = imagem.name.split(".").pop();
        const path = `${id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens-racas")
          .upload(path, imagem, { upsert: true });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage
          .from("imagens-racas")
          .getPublicUrl(path);
        imagem_url = data.publicUrl;
      }

      const res = await fetch("/api/racas", {
        method: isEdicao ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form, imagem_url, removerImagem }),
      });

      if (!res.ok) throw new Error((await res.json()).error);

      setSucesso(
        isEdicao
          ? "Raça atualizada com sucesso!"
          : "Raça cadastrada com sucesso!",
      );

      router.push("/admin");
      router.refresh();

      if (!isEdicao) {
        setForm(VAZIO);
        setFraquezasAtivas(new Set());
        setImagem(null);
        setImagemPreview("");
      }
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    if (!racaInicial || !confirm(`Excluir "${racaInicial.nome}"?`)) return;
    setLoading(true);
    const res = await fetch("/api/racas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: racaInicial.id }),
    });
    if (!res.ok) {
      setErro("Erro ao excluir.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-xl shadow-sm p-8 space-y-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
            {isEdicao ? `Editando: ${racaInicial!.nome}` : "Cadastrar Raça"}
          </h2>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            ← Voltar
          </button>
        </div>
        {isEdicao && (
          <button
            type="button"
            onClick={handleExcluir}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50"
          >
            Excluir Raça
          </button>
        )}
      </div>

      <div>
        <Label>Nome *</Label>
        <Input
          required
          value={form.nome}
          onChange={(e) => set("nome", e.target.value)}
        />
      </div>

      <div>
        <Label>Imagem da Raça</Label>
        {imagemPreview && (
          <Image
            src={imagemPreview}
            alt="Preview"
            width={36}
            height={36}
            className="w-32 h-32 object-cover rounded-md border border-stone-200 mb-2"
          />
        )}
        {isEdicao && imagemPreview && !imagem && (
          <button
            type="button"
            onClick={() => {
              setRemoverImagem(true);
              setImagemPreview("");
            }}
            className="text-xs text-red-500 hover:text-red-700 mt-2 block"
          >
            Remover imagem
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImagem}
          className="text-sm text-stone-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-amber-800 file:text-white file:text-sm file:font-medium hover:file:bg-amber-900 cursor-pointer"
        />
      </div>

      <div>
        <Label>Origem *</Label>
        <div className="flex flex-wrap gap-2">
          {ORIGENS.map((o) => (
            <BotaoToggle
              key={o}
              label={o}
              ativo={form.origem === o}
              onClick={() => set("origem", o)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Longevidade média</Label>
        <div className="flex flex-wrap gap-2">
          {LONGEVIDADES.map((l) => (
            <BotaoToggle
              key={l}
              label={l}
              ativo={form.idade_media === l}
              onClick={() => set("idade_media", l)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Descrição *</Label>
        <Textarea
          required
          value={form.descricao}
          onChange={(e) => set("descricao", e.target.value)}
        />
      </div>

      <div>
        <Label>Categorias</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((c) => (
            <BotaoToggle
              key={c}
              label={c}
              ativo={form.categoria.includes(c)}
              onClick={() => toggleLista("categoria", c)}
            />
          ))}
        </div>
      </div>

      {/* 👇 MÁGICA 1: USAR AS REGIÕES REAIS DA BASE DE DADOS */}
      <div>
        <Label>Regiões</Label>
        <div className="flex flex-wrap gap-2">
          {todasRegioes.map((r) => (
            <BotaoToggle
              key={r.id}
              label={r.nome}
              ativo={form.regioes_ids.includes(r.id)}
              onClick={() => toggleLista("regioes_ids", r.id)}
            />
          ))}
        </div>
      </div>

      {/* 👇 MÁGICA 2: USAR AS RAÇAS REAIS PARA ALIANÇAS E INIMIGOS */}
      <Relacionamentos
        titulo="Alianças"
        selecionadosIds={form.aliancas_ids}
        mockRacas={todasRacas}
        onToggle={(id) => toggleLista("aliancas_ids", id)}
        corHover="green"
      />
      <Relacionamentos
        titulo="Inimigos"
        selecionadosIds={form.inimigos_ids}
        mockRacas={todasRacas}
        onToggle={(id) => toggleLista("inimigos_ids", id)}
        corHover="red"
      />

      <Fraquezas
        fraquezas={form.fraquezas as Record<string, string>}
        ativas={fraquezasAtivas}
        tiposPossiveis={FRAQUEZA_TIPOS}
        onToggle={toggleFraqueza}
        onChangeText={(tipo, texto) =>
          setForm((prev) => ({
            ...prev,
            fraquezas: { ...prev.fraquezas, [tipo]: texto },
          }))
        }
      />

      {erro && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {erro}
        </p>
      )}
      {sucesso && (
        <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2">
          {sucesso}
        </p>
      )}

      <div className="flex gap-3 pt-2 border-t border-stone-100">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2.5 rounded-lg text-sm disabled:opacity-50"
        >
          {loading
            ? "Salvando..."
            : isEdicao
              ? "Salvar Alterações"
              : "Salvar Raça"}
        </button>
        {!isEdicao && (
          <button
            type="button"
            onClick={() => {
              setForm(VAZIO);
              setFraquezasAtivas(new Set());
              setImagem(null);
              setImagemPreview("");
            }}
            className="px-5 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-50 rounded-lg text-sm font-medium"
          >
            Limpar
          </button>
        )}
      </div>
    </form>
  );
}
