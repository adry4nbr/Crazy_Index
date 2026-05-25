import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";

// Campos permitidos para inserção e atualização de raças.
// Qualquer campo fora desta lista é ignorado (previne mass assignment).
const CAMPOS_PERMITIDOS = [
  "nome",
  "origem",
  "idade_media",
  "descricao",
  "categoria",
  "fraquezas",
  "aliancas_ids",
  "inimigos_ids",
  "regioes_ids",
  "imagem_url",
] as const;

type CampoPermitido = (typeof CAMPOS_PERMITIDOS)[number];

function filtrarCampos(
  body: Record<string, unknown>,
): Partial<Record<CampoPermitido, unknown>> {
  return Object.fromEntries(
    Object.entries(body).filter(([key]) =>
      CAMPOS_PERMITIDOS.includes(key as CampoPermitido),
    ),
  ) as Partial<Record<CampoPermitido, unknown>>;
}

// Client com service role — usado apenas neste arquivo de servidor.
// A chave nunca é exposta ao browser.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function extrairPathImagem(url: string): string | null {
  try {
    const match = url.match(/imagens-racas\/(.+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  // 1. Verificar autenticação
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  // 2. Ler e sanitizar body
  const raw = await req.json();
  const body = filtrarCampos(raw);

  if (!body.nome) {
    return NextResponse.json(
      { error: "Campo 'nome' é obrigatório." },
      { status: 400 },
    );
  }

  const { error, data } = await supabaseAdmin.from("racas").insert(body);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  // 1. Verificar autenticação
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  // 2. Ler body
  const raw = await req.json();
  const { id, removerImagem, ...rest } = raw;

  // 3. Validar id
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Campo 'id' inválido ou ausente." },
      { status: 400 },
    );
  }

  // 4. Sanitizar campos atualizáveis
  const campos = filtrarCampos(rest);

  // 5. Remover imagem do storage se solicitado
  if (removerImagem) {
    const { data: racaAtual } = await supabaseAdmin
      .from("racas")
      .select("imagem_url")
      .eq("id", id)
      .single();

    if (racaAtual?.imagem_url) {
      const path = extrairPathImagem(racaAtual.imagem_url);
      if (path)
        await supabaseAdmin.storage.from("imagens-racas").remove([path]);
    }
    campos.imagem_url = "";
  }

  const { error, data } = await supabaseAdmin
    .from("racas")
    .update(campos)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  // 1. Verificar autenticação
  const guard = await requireAdmin();
  if ("error" in guard) return guard.error;

  // 2. Ler e validar id
  const { id } = await req.json();

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Campo 'id' inválido ou ausente." },
      { status: 400 },
    );
  }

  // 3. Buscar imagem antes de deletar
  const { data: racaAtual } = await supabaseAdmin
    .from("racas")
    .select("imagem_url")
    .eq("id", id)
    .single();

  // 4. Deletar imagem do storage se existir
  if (racaAtual?.imagem_url) {
    const path = extrairPathImagem(racaAtual.imagem_url);
    if (path) await supabaseAdmin.storage.from("imagens-racas").remove([path]);
  }

  const { error } = await supabaseAdmin.from("racas").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
