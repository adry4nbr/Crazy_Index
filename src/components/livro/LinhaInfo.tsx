"use client";

type LinhaInfoProps = {
  label: string;
  items: string[];
  side: "left" | "right";
  tituloNota: string;
  onAlternarNota: (
    e: React.MouseEvent,
    side: "left" | "right",
    title: string,
    items: string[],
  ) => void;
  resolverNome?: (id: string) => string;
};

export function LinhaInfo({
  label,
  items,
  side,
  tituloNota,
  onAlternarNota,
  resolverNome,
}: LinhaInfoProps) {
  const nomes = resolverNome ? items.map(resolverNome) : items;
  const primeiro = nomes[0];
  const extras = nomes.length - 1;

  return (
    <p className="leading-tight flex items-center flex-wrap">
      <span className="font-['Cinzel'] font-bold text-[10px] text-[#381a0a] tracking-wider uppercase bg-[#4a321a]/10 px-1.5 py-0.5 rounded-xs mr-1.5">
        {label}:
      </span>

      {nomes.length === 0 ? (
        <span className="italic text-[#4a321a]/60 font-medium">Sem Dados</span>
      ) : extras > 0 ? (
        <span
          onClick={(e) => onAlternarNota(e, side, tituloNota, nomes)}
          className="font-bold px-1 rounded-xs transition-colors hover:bg-[#a42b2b]/10 flex items-center cursor-pointer select-none"
        >
          {primeiro}{" "}
          <span className="text-[10px] font-medium text-[#8b3a3a] ml-1">
            (+{extras}) ✦
          </span>
        </span>
      ) : (
        <span className="font-bold text-[#210f05]">{primeiro}</span>
      )}
    </p>
  );
}
