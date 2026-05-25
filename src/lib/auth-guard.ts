import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Verifica se a requisição vem de um usuário autenticado.
 * Deve ser chamada no início de toda API Route de escrita.
 *
 * Retorna { user } se autenticado, ou { error: NextResponse } se não.
 *
 * Uso:
 *   const guard = await requireAdmin();
 *   if ("error" in guard) return guard.error;
 */
export async function requireAdmin() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {}, // leitura apenas — não precisamos setar cookies aqui
      },
    },
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      error: NextResponse.json({ error: "Não autorizado." }, { status: 401 }),
    };
  }

  return { user };
}
