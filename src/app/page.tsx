import Livro from "@/components/livro/Livro";
import { getRacas, getRegioes } from "@/lib/data";

export default async function Home() {
  const [racas, regioes] = await Promise.all([getRacas(), getRegioes()]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-6">
      <Livro racas={racas} regioes={regioes} />
    </main>
  );
}
