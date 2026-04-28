import type { FC } from 'react';
import type { InventoryStats } from '../types/ganado.types';

interface GanadoInventarioSummaryProps {
  stats: InventoryStats;
}

export const GanadoInventarioSummary: FC<GanadoInventarioSummaryProps> = ({ stats }) => {
  const lactanciaPercent = Math.round((stats.lactancia / stats.totalCabezas) * 100);
  const secaPercent = Math.round((stats.seca / stats.totalCabezas) * 100);
  const cevaPercent = Math.round((stats.ceva / stats.totalCabezas) * 100);
  const gestantesPercent = Math.round((stats.gestantes / stats.totalCabezas) * 100);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-slate-900 font-extrabold text-lg mb-1 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">bar_chart</span>
        Resumen de Inventario
      </h3>
      <p className="text-slate-400 text-xs mb-5">Distribución actual del hato</p>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-extrabold text-slate-900">{stats.totalCabezas}</span>
        <span className="text-slate-400 text-sm mb-1">cabezas totales</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 mb-5">
        <div className="bg-primary rounded-l-full" style={{ width: `${lactanciaPercent}%` }} />
        <div className="bg-blue-400" style={{ width: `${secaPercent}%` }} />
        <div className="bg-amber-400" style={{ width: `${cevaPercent}%` }} />
        <div className="bg-pink-400 rounded-r-full" style={{ width: `${gestantesPercent}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatItem color="bg-primary" label="Lactancia" value={stats.lactancia} percent={lactanciaPercent} />
        <StatItem color="bg-blue-400" label="Seca" value={stats.seca} percent={secaPercent} />
        <StatItem color="bg-amber-400" label="Ceva" value={stats.ceva} percent={cevaPercent} />
        <StatItem color="bg-pink-400" label="Gestantes" value={stats.gestantes} percent={gestantesPercent} />
      </div>
    </div>
  );
};

const StatItem: FC<{ color: string; label: string; value: number; percent: number }> = ({
  color,
  label,
  value,
  percent,
}) => (
  <div className="flex items-center gap-2">
    <span className={`size-2.5 rounded-full shrink-0 ${color}`} />
    <div>
      <p className="text-slate-900 text-sm font-bold leading-none">{value}</p>
      <p className="text-slate-400 text-[11px]">
        {label} · {percent}%
      </p>
    </div>
  </div>
);
