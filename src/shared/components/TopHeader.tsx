import type { FC } from 'react';
import { useUIStore } from '../store/useUIStore';

export const TopHeader: FC = () => {
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);
  const searchQuery = useUIStore((s) => s.searchQuery);

  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white/95 backdrop-blur-md z-10 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 outline-none"
            placeholder="Buscar ganado, cultivos o reportes..."
            aria-label="Buscar"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          className="size-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors border border-slate-100 relative"
          aria-label="Notificaciones"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </header>
  );
};
