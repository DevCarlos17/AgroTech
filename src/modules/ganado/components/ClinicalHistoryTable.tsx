import { type FC, useState } from 'react';
import type { HealthRecord, RecordType, RecordStatus } from '../types/ganado.types';

interface ClinicalHistoryTableProps {
  records: HealthRecord[];
}

const TYPE_STYLES: Record<RecordType, string> = {
  Vacunación: 'bg-blue-50 text-blue-600 border-blue-100',
  Tratamiento: 'bg-amber-50 text-amber-600 border-amber-100',
  Urgente: 'bg-red-50 text-red-600 border-red-100',
};

const STATUS_STYLES: Record<RecordStatus, string> = {
  Confirmado: 'bg-primary-light text-primary',
  Resuelto: 'bg-slate-100 text-slate-500',
  Pendiente: 'bg-amber-50 text-amber-600',
  Vencido: 'bg-red-50 text-red-500',
};

const PREVIEW_COUNT = 4;

export const ClinicalHistoryTable: FC<ClinicalHistoryTableProps> = ({ records }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? records : records.slice(0, PREVIEW_COUNT);

  return (
    <div className="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">history</span>
          Historial Clínico
        </h3>
        {records.length > PREVIEW_COUNT && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-primary text-xs font-bold hover:underline"
          >
            {showAll ? 'Ver menos' : 'Ver todo'}
          </button>
        )}
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            {['Fecha', 'Tipo', 'Medicina / Procedimiento', 'Veterinario', 'Estado'].map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-slate-400 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {visible.map((rec) => (
            <tr
              key={rec.id}
              className={`transition-colors ${rec.estado === 'Vencido' ? 'bg-red-50/40' : 'hover:bg-slate-50/50'}`}
            >
              <td className="px-6 py-3 text-slate-500 text-sm font-mono">{rec.fecha}</td>
              <td className="px-6 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${TYPE_STYLES[rec.tipo]}`}
                >
                  {rec.tipo}
                </span>
              </td>
              <td className="px-6 py-3 text-slate-800 text-sm font-medium">{rec.medicina}</td>
              <td className="px-6 py-3 text-slate-500 text-sm">{rec.veterinario}</td>
              <td className="px-6 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_STYLES[rec.estado]}`}
                >
                  {rec.estado}
                </span>
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                Sin registros clínicos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
