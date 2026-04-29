import { type FC, useState, useRef, useEffect } from 'react';
import type { Animal } from '../types/ganado.types';

interface AnimalAutocompleteProps {
  animals: Animal[];
  value: string;           // ID seleccionado
  onChange: (id: string) => void;
  placeholder?: string;
  excludeId?: string;      // excluir el propio animal (edit modal)
  required?: boolean;
}


export const AnimalAutocomplete: FC<AnimalAutocompleteProps> = ({
  animals,
  value,
  onChange,
  placeholder = 'Buscar por ID o nombre…',
  excludeId,
  required,
}) => {
  const pool = excludeId ? animals.filter((a) => a.id !== excludeId) : animals;
  const selected = pool.find((a) => a.id === value);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim().length === 0
    ? []
    : pool
        .filter((a) => {
          const q = query.toLowerCase();
          return (
            a.id.toLowerCase().includes(q) ||
            (a.nombre ?? '').toLowerCase().includes(q)
          );
        })
        .slice(0, 8);

  function handleSelect(a: Animal) {
    onChange(a.id);
    setQuery('');
    setOpen(false);
  }

  function handleClear() {
    onChange('');
    setQuery('');
    setOpen(false);
  }

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  /* ── Selected state ── */
  if (selected) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-green-50/60 text-sm">
        <span className="font-mono text-xs text-slate-400 shrink-0">#{selected.id}</span>
        {selected.nombre && (
          <span className="font-semibold text-slate-800">{selected.nombre}</span>
        )}
        <span className="text-slate-500 text-xs">· {selected.raza}</span>
        <span className="text-slate-400 text-xs">· {selected.sexo}</span>
        <button
          type="button"
          onClick={handleClear}
          className="ml-auto p-0.5 rounded text-slate-400 hover:text-rose-500 transition-colors"
          aria-label="Quitar"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    );
  }

  /* ── Search state ── */
  const borderCls = required
    ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
    : 'border-slate-200 focus:ring-primary/20 focus:border-primary';

  return (
    <div ref={containerRef} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { if (query) setOpen(true); }}
        placeholder={required ? `${placeholder} *` : placeholder}
        className={`w-full rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all bg-white border ${borderCls}`}
        autoComplete="off"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
          {suggestions.map((a) => (
            <button
              key={a.id}
              type="button"
              onMouseDown={() => handleSelect(a)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 text-left transition-colors border-b border-slate-100 last:border-0"
            >
              <span className="font-mono text-xs text-slate-400 w-14 shrink-0">#{a.id}</span>
              <span className="font-semibold text-slate-800 text-sm flex-1 truncate">
                {a.nombre ?? <span className="text-slate-400 font-normal italic">Sin nombre</span>}
              </span>
              <span className="text-xs text-slate-500 shrink-0">{a.raza}</span>
              <span className="text-xs text-slate-400 shrink-0">{a.sexo}</span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg">
          <p className="px-4 py-3 text-slate-400 text-sm text-center">
            Sin resultados para &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};
