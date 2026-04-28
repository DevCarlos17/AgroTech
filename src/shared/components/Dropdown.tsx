import { type FC, useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
}

export const Dropdown: FC<DropdownProps> = ({ label, options, value, onChange, prefix }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const displayLabel = prefix ? `${prefix}: ${selected?.label ?? label}` : (selected?.label ?? label);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 text-sm font-semibold border transition-colors ${
          value !== options[0]?.value
            ? 'bg-primary text-white border-primary'
            : 'bg-white border-slate-200 text-slate-700 hover:border-primary'
        }`}
      >
        {displayLabel}
        <span className="material-symbols-outlined text-[20px] opacity-70">expand_more</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-slate-100 rounded-xl shadow-lg min-w-[160px] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-green-50 hover:text-primary ${
                value === opt.value ? 'text-primary font-bold bg-green-50/50' : 'text-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
