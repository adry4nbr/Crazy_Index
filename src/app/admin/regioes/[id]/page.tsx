import { supabase } from "@/lib/supabase";
import { RegiaoForm } from "@/components/admin/RegiaoForm";
import { Regiao } from "@/data/mockData";
import { notFound } from "next/navigation";

// 1. Atualizamos a tipagem para indicar que params agora é uma Promise (padrão Next 15/16)
type Props = { params: Promise<{ id: string }> };

export default async function EditarRegiaoPage({ params }: Props) {
  // 2. Aguardamos a Promise resolver para pegar o ID real da URL
  const { id } = await params;

  // 3. Fazemos a busca no Supabase com o ID resolvido
  const { data, error } = await supabase
    .from("regioes")
    .select("*")
    .eq("id", id)
    .single();

  // Deixei um console.log aqui. Se der erro de leitura, ele avisa no seu terminal em vez de só sumir
  if (error) {
    console.error(
      "Supabase Error ao buscar a Região para edição:",
      error.message,
    );
  }

  if (!data) notFound();

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4">
      <RegiaoForm regiaoInicial={data as Regiao} />
    </main>
  );
}
