"use client";

type ControlesNavegacaoProps = {
  podVoltar: boolean;
  podAvancar: boolean;
  onVoltar: () => void;
  onAvancar: () => void;
  onFechar: () => void;
};

export function ControlesNavegacao({
  podVoltar,
  podAvancar,
  onVoltar,
  onAvancar,
  onFechar,
}: ControlesNavegacaoProps) {
  return (
    <div className="flex gap-6 mt-6 items-center">
      <button
        onClick={onVoltar}
        disabled={!podVoltar}
        className="px-6 py-2 bg-[#1a0e0a] text-[#cdb394] border border-[#3a2518] rounded shadow-md font-['Cinzel'] text-xs font-bold tracking-widest disabled:opacity-25 hover:bg-[#2c1a0e] transition-all cursor-pointer"
      >
        Anterior
      </button>

      <button
        onClick={onFechar}
        className="px-4 py-2 bg-black text-[#6e5440] border border-[#1a0e0a] rounded font-['Cinzel'] text-[10px] font-bold tracking-widest hover:bg-[#a42b2b] hover:text-white transition-all cursor-pointer"
      >
        Fechar Grimório
      </button>

      <button
        onClick={onAvancar}
        disabled={!podAvancar}
        className="px-6 py-2 bg-[#1a0e0a] text-[#cdb394] border border-[#3a2518] rounded shadow-md font-['Cinzel'] text-xs font-bold tracking-widest disabled:opacity-25 hover:bg-[#2c1a0e] transition-all cursor-pointer"
      >
        Próxima
      </button>
    </div>
  );
}
