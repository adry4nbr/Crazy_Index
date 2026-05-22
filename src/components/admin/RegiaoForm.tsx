"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Regiao } from "@/data/mockData";

type FormState = Omit<Regiao, "id">;

const VAZIO: FormState = { nome: "", sub_regioes: [] };

type Props = { regiaoInicial?: Regiao };

export function RegiaoForm({ regiaoInicial }: Props) {
  const router = useRouter();
  const isEdicao = !!regiaoInicial;

  const [form, setForm] = useState<FormState>(
    regiaoInicial
      ? { nome: regiaoInicial.nome, sub_regioes: regiaoInicial.sub_regioes }
      : VAZIO,
  );
  const [novaSubRegiao, setNovaSubRegiao] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const adicionarSubRegiao = () => {
    const valor = novaSubRegiao.trim();
    if (!valor || form.sub_regioes.includes(valor)) return;
    setForm((prev) => ({ ...prev, sub_regioes: [...prev.sub_regioes, valor] }));
    setNovaSubRegiao("");
  };

  const removerSubRegiao = (item: string) =>
    setForm((prev) => ({
      ...prev,
      sub_regioes: prev.sub_regioes.filter((s) => s !== item),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const id = isEdicao
        ? regiaoInicial!.id
        : `regiao_${form.nome.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;

      const res = await fetch("/api/regioes", {
        method: isEdicao ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...form }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setSucesso(isEdicao ? "Região atualizada!" : "Região cadastrada!");
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    if (!regiaoInicial || !confirm(`Excluir "${regiaoInicial.nome}"?`)) return;
    setLoading(true);
    const res = await fetch("/api/regioes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: regiaoInicial.id }),
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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">
            {isEdicao ? `Editando: ${regiaoInicial!.nome}` : "Cadastrar Região"}
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            {isEdicao
              ? "Altere os campos e salve."
              : "Adicione uma nova região ao grimório."}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            ← Voltar
          </button>
          {isEdicao && (
            <button
              type="button"
              onClick={handleExcluir}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50"
            >
              Excluir
            </button>
          )}
        </div>
      </div>

      {/* Nome */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">
          Nome *
        </label>
        <input
          required
          value={form.nome}
          onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
          placeholder="Ex: Medieval, Submundo..."
          className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400"
        />
      </div>

      {/* Sub-regiões */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1">
          Sub-regiões
        </label>
        <p className="text-xs text-stone-400 mb-3">
          Opcional — pode adicionar depois.
        </p>

        {/* Tags existentes */}
        {form.sub_regioes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {form.sub_regioes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removerSubRegiao(s)}
                  className="text-amber-600 hover:text-red-600 transition-colors leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input para adicionar */}
        <div className="flex gap-2">
          <input
            value={novaSubRegiao}
            onChange={(e) => setNovaSubRegiao(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                adicionarSubRegiao();
              }
            }}
            placeholder="Ex: Dark Fantasy, Cyberpunk..."
            className="flex-1 border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400"
          />
          <button
            type="button"
            onClick={adicionarSubRegiao}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold rounded-md transition-colors"
          >
            + Adicionar
          </button>
        </div>
      </div>

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
              : "Salvar Região"}
        </button>
      </div>
    </form>
  );
}
