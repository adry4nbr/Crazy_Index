import Link from "next/link";

export default function AdminPage() {
  return (
    // Pagina do Admin
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-800 mb-1">Painel Admin</h1>
        <p className="text-stone-500 text-sm mb-8">
          Gerencie o conteúdo do grimório.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/admin/racas/nova"
            className="flex items-center gap-4 p-5 bg-white border border-stone-200 rounded-xl shadow-sm hover:border-amber-500 hover:shadow-md transition-all group"
          >
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-semibold text-stone-800 group-hover:text-amber-800 transition-colors">
                Cadastrar Raça
              </p>
              <p className="text-xs text-stone-400">
                Adicionar uma nova raça ao grimório
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
