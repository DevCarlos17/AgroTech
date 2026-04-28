import type { FC } from 'react';
import type { Animal } from '../types/ganado.types';
import { StatusBadge } from '../../../shared/components/StatusBadge';
import { RowActionMenu } from './RowActionMenu';
import { useNavigate } from 'react-router-dom';

interface GanadoTableProps {
  animals: Animal[];
  totalCount: number;
  page: number;
  totalPages: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const COLS = ['ID', 'Nombre', 'Dueño', 'Sexo', 'Raza', 'Estado', 'Peso (kg)', 'Acciones'];

export const GanadoTable: FC<GanadoTableProps> = ({
  animals,
  totalCount,
  page,
  totalPages,
  pageSize,
  onNextPage,
  onPrevPage,
}) => {
  const navigate = useNavigate();
  const showing = Math.min(pageSize, animals.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {COLS.map((col, i) => (
                <th
                  key={col}
                  className={`px-5 py-4 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100 ${
                    i === COLS.length - 1 ? 'text-right' : ''
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {animals.length === 0 ? (
              <tr>
                <td colSpan={COLS.length} className="px-6 py-16 text-center">
                  <span className="material-symbols-outlined text-slate-200 text-5xl block mb-3">cruelty_free</span>
                  <p className="text-slate-500 font-semibold text-sm">Sin animales registrados</p>
                  <p className="text-slate-400 text-xs mt-1">Usa el botón "Nuevo Animal" para comenzar a construir tu hato.</p>
                </td>
              </tr>
            ) : (
              animals.map((animal) => (
                <tr
                  key={animal.id}
                  onClick={() => navigate(`/ganado/salud/${animal.id}`)}
                  className="hover:bg-green-50/30 transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-4 text-slate-400 text-sm font-mono">#{animal.id}</td>
                  <td className="px-5 py-4 text-slate-900 font-bold text-sm">
                    {animal.nombre ?? <span className="text-slate-400 font-normal">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-slate-700 text-sm">{animal.owner}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{animal.sexo}</td>
                  <td className="px-5 py-4 text-slate-500 text-sm">{animal.raza}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={animal.estado} />
                  </td>
                  <td className="px-5 py-4 text-slate-700 text-sm font-semibold">{animal.peso}</td>
                  <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <RowActionMenu animal={animal} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-slate-500 text-xs font-medium">
          Mostrando <span className="text-slate-900">{showing}</span> de{' '}
          <span className="text-slate-900">{totalCount}</span> animales
        </p>
        <div className="flex gap-2">
          <button
            onClick={onPrevPage}
            disabled={page <= 1}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 hover:text-primary hover:border-primary transition-colors"
            aria-label="Página anterior"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button
            onClick={onNextPage}
            disabled={page >= totalPages}
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 hover:text-primary hover:border-primary transition-colors"
            aria-label="Página siguiente"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};
