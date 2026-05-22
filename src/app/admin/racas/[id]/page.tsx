import { supabase } from "@/lib/supabase";
import { RacaForm } from "@/components/admin/RacaForm";
import { Raca } from "@/data/mockData";
import { notFound } from "next/navigation";

// 1. Atualizamos a tipagem para indicar que params agora é uma Promise (padrão Next 15/16)
type Props = { params: Promise<{ id: string }> };

export default async function EditarRacaPage({ params }: Props) {
  // 2. Aguardamos a Promise resolver para pegar o ID real da URL
  const { id } = await params;

  // 3. Fazemos a busca no Supabase com o ID resolvido
  const { data, error } = await supabase
    .from("racas")
    .select("*")
    .eq("id", id)
    .single();

  // Deixei um console.log aqui. Se der erro de leitura, ele avisa no seu terminal em vez de só sumir
  if (error) {
    console.error("Supabase Error ao buscar raça para edição:", error.message);
  }

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4">
      <RacaForm racaInicial={data as Raca} />
    </main>
  );
}
