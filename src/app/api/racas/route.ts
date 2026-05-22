import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function extrairPathImagem(url: string): string | null {
  try {
    // URL formato: .../storage/v1/object/public/imagens-racas/ARQUIVO
    const match = url.match(/imagens-racas\/(.+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error, data } = await supabaseAdmin.from("racas").insert(body);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, removerImagem, ...rest } = body;

  // Se pediu para remover a imagem, deleta do storage
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
    rest.imagem_url = "";
  }

  const { error, data } = await supabaseAdmin
    .from("racas")
    .update(rest)
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  // Busca a imagem antes de deletar
  const { data: racaAtual } = await supabaseAdmin
    .from("racas")
    .select("imagem_url")
    .eq("id", id)
    .single();

  // Deleta a imagem do storage se existir
  if (racaAtual?.imagem_url) {
    const path = extrairPathImagem(racaAtual.imagem_url);
    if (path) await supabaseAdmin.storage.from("imagens-racas").remove([path]);
  }

  const { error } = await supabaseAdmin.from("racas").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
