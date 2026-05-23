import { createClient } from "@supabase/supabase-js";
import { Raca, Regiao } from "@/data/mockData";

// Usado apenas no servidor (Server Components e API Routes).
// A anon key é suficiente para leitura pública com RLS ativo.
// Nunca importe este arquivo em componentes com 'use client'.
function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Variáveis NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não definidas.",
    );
  }

  return createClient(url, key);
}

export async function getRacas(): Promise<Raca[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("racas")
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    console.error("[getRacas] Erro ao buscar raças:", error.message);
    return [];
  }

  return (data ?? []) as Raca[];
}

export async function getRegioes(): Promise<Regiao[]> {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("regioes")
    .select("*")
    .order("nome", { ascending: true });

  if (error) {
    console.error("[getRegioes] Erro ao buscar regiões:", error.message);
    return [];
  }

  return (data ?? []) as Regiao[];
}
