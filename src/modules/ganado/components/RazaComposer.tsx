import { type FC } from 'react';
import type { RazaEntry } from '../types/ganado.types';

const RAZAS_BASE = [
  'Holstein', 'Jersey', 'Angus', 'Hereford', 'Brahman',
  'Simmental', 'Limousin', 'Charolais', 'Gyr', 'Nelore',
];

const INPUT_CLS =
  'border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white';

interface RazaComposerProps {
  value: RazaEntry[];
  onChange: (entries: RazaEntry[]) => void;
}

export const RazaComposer: FC<RazaComposerProps> = ({ value, onChange }) => {
  const total = value.reduce((s, e) => s + (e.porcentaje || 0), 0);
  const isValid = total === 100;

  function addRaza() {
    const usedRazas = value.map((e) => e.raza);
    const nextRaza = RAZAS_BASE.find((r) => !usedRazas.includes(r)) ?? RAZAS_BASE[0];
    onChange([...value, { raza: nextRaza, porcentaje: 0 }]);
  }

  function removeRaza(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function updateField(idx: number, field: 'raza' | 'porcentaje', val: string) {
    onChange(
      value.map((e, i) =>
        i === idx
          ? { ...e, [field]: field === 'porcentaje' ? Math.min(100, Math.max(0, Number(val) || 0)) : val }
          : e,
      ),
    );
  }

  const totalColor = isValid
    ? 'text-green-600'
    : total > 100
      ? 'text-rose-600'
      : total > 0
        ? 'text-amber-600'
        : 'text-slate-400';

  return (
    <div className="flex flex-col gap-2">
      {value.map((entry, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <select
            value={entry.raza}
            onChange={(e) => updateField(idx, 'raza', e.target.value)}
            className={`${INPUT_CLS} flex-1`}
          >
            {RAZAS_BASE.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <div className="relative w-24 shrink-0">
            <input
              type="number"
              min="0"
              max="100"
              value={entry.porcentaje === 0 ? '' : entry.porcentaje}
              onChange={(e) => updateField(idx, 'porcentaje', e.target.value)}
              placeholder="0"
              className={`${INPUT_CLS} w-full pr-7`}
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold pointer-events-none">
              %
            </span>
          </div>

          {value.length > 1 && (
            <button
              type="button"
              onClick={() => removeRaza(idx)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
              aria-label="Quitar raza"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between mt-0.5">
        {value.length < 5 ? (
          <button
            type="button"
            onClick={addRaza}
            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Agregar raza
          </button>
        ) : (
          <span />
        )}
        <span className={`text-xs font-bold ${totalColor}`}>
          Total: {total}%{isValid ? ' ✓' : total > 100 ? ' — excede 100%' : ''}
        </span>
      </div>

      {!isValid && total > 0 && (
        <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
          Los porcentajes deben sumar exactamente 100%.
        </p>
      )}
    </div>
  );
};

/** Serializa las entradas a un string legible para el campo `raza`. */
export function razaEntriesToString(entries: RazaEntry[]): string {
  if (entries.length === 1) return entries[0].raza;
  return entries.map((e) => `${e.raza} ${e.porcentaje}%`).join(' / ');
}

/** Porcentajes válidos (suman 100). */
export function razaEntriesValid(entries: RazaEntry[]): boolean {
  return entries.reduce((s, e) => s + (e.porcentaje || 0), 0) === 100;
}
