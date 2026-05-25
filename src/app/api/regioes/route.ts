import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";

// Campos permitidos para inserção e atualização de regiões.
const CAMPOS_PERMITIDOS = ["nome", "sub_regioes"] as const;

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

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

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

  const { error, data } = await supabaseAdmin.from("regioes").insert(body);
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
  const { id, ...rest } = raw;

  // 3. Validar id
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Campo 'id' inválido ou ausente." },
      { status: 400 },
    );
  }

  // 4. Sanitizar campos atualizáveis
  const campos = filtrarCampos(rest);

  const { error, data } = await supabaseAdmin
    .from("regioes")
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

  const { error } = await supabaseAdmin.from("regioes").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
