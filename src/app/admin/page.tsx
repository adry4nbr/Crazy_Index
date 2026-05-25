import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Raca, Regiao } from "@/data/mockData";
import Image from "next/image";

async function getRacas(): Promise<Raca[]> {
  const { data } = await supabase.from("racas").select("*").order("nome");
  return (data ?? []) as Raca[];
}

async function getRegioes(): Promise<Regiao[]> {
  const { data } = await supabase.from("regioes").select("*").order("nome");
  return (data ?? []) as Regiao[];
}

export default async function AdminPage() {
  const [racas, regioes] = await Promise.all([getRacas(), getRegioes()]);

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Painel Admin</h1>
          <p className="text-stone-500 text-sm mt-1">
            Gerencie o conteúdo do grimório.
          </p>
        </div>

        {/* ── Raças ── */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-semibold text-stone-700">Raças cadastradas</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">
                {racas.length} raça{racas.length !== 1 ? "s" : ""}
              </span>
              <Link
                href="/admin/racas/nova"
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-md transition-colors"
              >
                + Nova Raça
              </Link>
            </div>
          </div>

          {racas.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-sm">
              Nenhuma raça cadastrada ainda.
            </div>
          ) : (
            // max-h + overflow-y: scroll aparece automaticamente a partir de ~8 itens
            <ul className="divide-y divide-stone-100 max-h-[420px] overflow-y-auto">
              {racas.map((raca) => (
                <li
                  key={raca.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {raca.imagem_url ? (
                      <Image
                        src={raca.imagem_url}
                        alt={raca.nome}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-md object-cover border border-stone-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 text-xs">
                        ?
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-stone-800 text-sm">
                        {raca.nome}
                      </p>
                      <p className="text-xs text-stone-400">
                        {raca.origem} · {raca.idade_media}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/racas/${raca.id}`}
                    className="text-xs px-3 py-1.5 border border-stone-300 text-stone-600 hover:border-amber-600 hover:text-amber-800 rounded-md transition-colors font-medium"
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Regiões ── */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-semibold text-stone-700">
              Regiões cadastradas
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">
                {regioes.length} região{regioes.length !== 1 ? "ões" : ""}
              </span>
              <Link
                href="/admin/regioes/nova"
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-md transition-colors"
              >
                + Nova Região
              </Link>
            </div>
          </div>

          {regioes.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-sm">
              Nenhuma região cadastrada ainda.
            </div>
          ) : (
            // max-h + overflow-y: scroll aparece a partir de ~6 itens
            <ul className="divide-y divide-stone-100 max-h-[300px] overflow-y-auto">
              {regioes.map((regiao) => (
                <li
                  key={regiao.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-stone-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-stone-800 text-sm">
                      {regiao.nome}
                    </p>
                    <p className="text-xs text-stone-400">
                      {regiao.sub_regioes?.length > 0
                        ? `${regiao.sub_regioes.length} sub-região${regiao.sub_regioes.length !== 1 ? "ões" : ""}`
                        : "Sem sub-regiões"}
                    </p>
                  </div>
                  <Link
                    href={`/admin/regioes/${regiao.id}`}
                    className="text-xs px-3 py-1.5 border border-stone-300 text-stone-600 hover:border-amber-600 hover:text-amber-800 rounded-md transition-colors font-medium"
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
