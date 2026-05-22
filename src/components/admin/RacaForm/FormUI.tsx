import React from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-stone-700 mb-1">
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400"
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full border border-stone-300 rounded-md px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700/50 bg-amber-50/40 placeholder:text-stone-400 resize-none"
    />
  );
}

export function Tag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium px-2 py-0.5 rounded-full">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-amber-600 hover:text-red-600 transition-colors leading-none"
      >
        ×
      </button>
    </span>
  );
}

export function BotaoToggle({
  label,
  ativo,
  onClick,
}: {
  label: string;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm font-medium border transition-all ${
        ativo
          ? "bg-amber-800 text-white border-amber-800"
          : "bg-white text-stone-600 border-stone-300 hover:border-amber-600"
      }`}
    >
      {label}
    </button>
  );
}
