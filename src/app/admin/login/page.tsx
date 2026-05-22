"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-stone-900 border border-stone-700 rounded-xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-xl font-bold text-stone-100 font-['Cinzel'] tracking-wider">
            Área Restrita
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Acesso exclusivo ao administrador.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-400 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-400 mb-1">
            Senha
          </label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-md px-3 py-2 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
          />
        </div>

        {erro && <p className="text-sm text-red-400">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
