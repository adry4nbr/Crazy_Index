import { supabase } from "@/lib/supabase";
import { Raca, Regiao } from "@/data/mockData";
import { RacaForm } from "@/components/admin/RacaForm";

export const revalidate = 0;

export default async function EditarRacaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Desembrulhamos o params com 'await'
  const { id } = await params;

  // Agora o ID não será mais undefined!
  const decodedId = decodeURIComponent(id);

  const { data: racaInicial, error: erroRaca } = await supabase
    .from("racas")
    .select("*")
    .eq("id", decodedId)
    .single();

  // 🚨 MODO DETETIVE LIGADO: Em vez de dar 404, mostramos o erro na tela!
  if (erroRaca || !racaInicial) {
    return (
      <div className="p-10 max-w-2xl mx-auto mt-10 bg-red-50 border border-red-200 rounded-lg text-red-800">
        <h1 className="text-xl font-bold mb-4">
          Falha ao buscar a Raça no Supabase
        </h1>
        <p>
          <strong>ID procurado:</strong> {decodedId}
        </p>
        <p className="mt-4 font-semibold">Erro detalhado do Supabase:</p>
        <pre className="bg-red-100 p-4 rounded mt-2 text-sm overflow-auto">
          {JSON.stringify(
            erroRaca || { erro: "Raça não encontrada (null)" },
            null,
            2,
          )}
        </pre>
      </div>
    );
  }

  const { data: racas } = await supabase
    .from("racas")
    .select("*")
    .order("nome");
  const { data: regioes } = await supabase
    .from("regioes")
    .select("*")
    .order("nome");

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4">
      <RacaForm
        racaInicial={racaInicial as Raca}
        todasRacas={(racas ?? []) as Raca[]}
        todasRegioes={(regioes ?? []) as Regiao[]}
      />
    </div>
  );
}
