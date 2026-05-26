"use client";

type PapelMagicoProps = {
  title: string;
  items: string[];
  onItemClick?: (item: string) => void;
};

export function PapelMagico({ title, items, onItemClick }: PapelMagicoProps) {
  // Libera o clique APENAS para as categorias que fazem sentido ter link
  const permitirClique =
    title === "Registros de Aliança" || title === "Inimizades Antigas";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute -top-2.5 right-0 w-40.5 bg-[#f5ebd5] border border-[#6b4c31]/50 rounded-xs shadow-[8px_10px_25px_rgba(0,0,0,0.45)] p-3 rotate-[1.5deg] flex flex-col z-50 transition-all duration-200 animate-fade-in"
    >
      {/* Fita adesiva */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#a42b2b]/15 border border-dashed border-[#a42b2b]/30 mix-blend-multiply transform -rotate-2" />

      <h5 className="font-['Cinzel'] text-[11px] font-bold text-[#a42b2b] tracking-wider uppercase border-b border-[#4a321a]/20 pb-0.5 mb-2 text-center">
        {title}
      </h5>

      <div className="flex flex-col space-y-1 text-[13.5px] leading-tight font-medium italic text-[#301c0f]">
        {items.map((item, idx) => {
          // Verifica se é uma categoria clicável E se a função foi passada pelo pai
          const isClickable = permitirClique && !!onItemClick;

          return (
            <div
              key={idx}
              className={`flex items-start gap-1.5 py-0.5 border-b border-[#4a321a]/5 last:border-0 transition-all ${
                isClickable
                  ? "cursor-pointer hover:text-[#a42b2b] hover:underline"
                  : "cursor-default"
              }`}
              onClick={() => {
                if (isClickable && onItemClick) {
                  onItemClick(item);
                }
              }}
            >
              <span className="text-[#a42b2b] text-[10px] mt-0.5 shrink-0">
                ✧
              </span>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
