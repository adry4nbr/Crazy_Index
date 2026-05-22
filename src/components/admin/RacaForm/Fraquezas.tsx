import { Label, Textarea } from "./FormUI";

type Props = {
  fraquezas: Record<string, string>;
  ativas: Set<string>;
  tiposPossiveis: readonly string[];
  onToggle: (tipo: string) => void;
  onChangeText: (tipo: string, texto: string) => void;
};

export function Fraquezas({
  fraquezas,
  ativas,
  tiposPossiveis,
  onToggle,
  onChangeText,
}: Props) {
  return (
    <div>
      <Label>Fraquezas</Label>
      <p className="text-xs text-stone-400 mb-3">
        Marque os tipos que existem e preencha o campo que aparece.
      </p>
      <div className="space-y-3">
        {tiposPossiveis.map((tipo) => (
          <div key={tipo}>
            <button
              type="button"
              onClick={() => onToggle(tipo)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                ativas.has(tipo)
                  ? "text-amber-800"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <span
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  ativas.has(tipo)
                    ? "bg-amber-800 border-amber-800 text-white"
                    : "border-stone-400"
                }`}
              >
                {ativas.has(tipo) && (
                  <svg
                    viewBox="0 0 10 10"
                    className="w-2.5 h-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="1.5,5 4,7.5 8.5,2.5" />
                  </svg>
                )}
              </span>
              {tipo}
            </button>
            {ativas.has(tipo) && (
              <Textarea
                className="mt-2"
                placeholder={`Descreva a fraqueza ${tipo.toLowerCase()}...`}
                value={fraquezas[tipo] ?? ""}
                onChange={(e) => onChangeText(tipo, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
