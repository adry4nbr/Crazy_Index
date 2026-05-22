import { Raca } from "@/data/mockData";
import { Label, Tag } from "./FormUI";

type Props = {
  titulo: string;
  selecionadosIds: string[];
  mockRacas: Raca[];
  onToggle: (id: string) => void;
  corHover: "green" | "red";
};

export function Relacionamentos({
  titulo,
  selecionadosIds,
  mockRacas,
  onToggle,
  corHover,
}: Props) {
  const hoverClass =
    corHover === "green"
      ? "hover:border-green-600 hover:text-green-700"
      : "hover:border-red-500 hover:text-red-700";

  return (
    <div>
      <Label>{titulo}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selecionadosIds.map((id) => (
          <Tag
            key={id}
            label={mockRacas.find((r) => r.id === id)?.nome ?? id}
            onRemove={() => onToggle(id)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {mockRacas
          .filter((r) => !selecionadosIds.includes(r.id))
          .map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onToggle(r.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium border bg-white text-stone-600 border-stone-300 transition-all ${hoverClass}`}
            >
              + {r.nome}
            </button>
          ))}
      </div>
    </div>
  );
}
