"use client";

type SecaoFraquezasProps = {
  fraquezas: Record<string, string>;
};

const TIPOS = [
  { label: "Física", keys: ["Física", "Físicas"] },
  { label: "Mágica", keys: ["Mágica", "Mágicas"] },
  { label: "Astral", keys: ["Astral"] },
] as const;

export function SecaoFraquezas({ fraquezas }: SecaoFraquezasProps) {
  return (
    <div className="mt-1 shrink-0 relative z-0">
      <div className="bg-[#4a321a]/5 border-l-3 border-[#a42b2b] p-2 rounded-r-sm shadow-xs">
        <h4 className="font-['Cinzel'] text-[10px] text-[#381a0a] font-bold tracking-widest uppercase mb-1">
          Registros de Fraqueza
        </h4>
        <div className="grid grid-cols-1 gap-1">
          {TIPOS.map(({ label, keys }) => (
            <p key={label} className="text-[13px] leading-tight flex gap-1.5">
              <span className="font-['Cinzel'] font-bold text-[#a42b2b] text-[10px] uppercase mt-0.5 shrink-0 tracking-wider">
                {label}:
              </span>
              <span className="text-[#170a03] italic flex-1 font-medium">
                {keys.reduce<string | undefined>(
                  (val, key) => val ?? fraquezas[key],
                  undefined,
                ) ?? "Sem Dados"}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
