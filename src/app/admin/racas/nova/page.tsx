import { supabase } from "@/lib/supabase";
import { Raca, Regiao } from "@/data/mockData";
import { RacaForm } from "@/components/admin/RacaForm"; // ⚠️ Ajusta este caminho para o sítio onde está o teu index.tsx

export const revalidate = 0; // Garante que a página vai buscar dados frescos sempre

export default async function NovaRacaPage() {
  // Vai buscar as raças e regiões reais à base de dados
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
        todasRacas={(racas ?? []) as Raca[]}
        todasRegioes={(regioes ?? []) as Regiao[]}
      />
    </div>
  );
}
