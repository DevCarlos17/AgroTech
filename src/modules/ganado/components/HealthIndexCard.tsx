import type { FC } from 'react';

interface HealthIndexCardProps {
  index: number;
}

export const HealthIndexCard: FC<HealthIndexCardProps> = ({ index }) => {
  const isGood = index >= 80;
  const isWarning = index >= 60 && index < 80;

  const bgClass = isGood ? 'bg-primary' : isWarning ? 'bg-amber-500' : 'bg-red-500';
  const label = isGood ? 'Excelente' : isWarning ? 'Regular' : 'Crítico';

  return (
    <div className={`rounded-xl p-6 shadow-sm text-white ${bgClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-base opacity-90">Índice de Salud</h3>
        <span className="material-symbols-outlined text-[28px] opacity-80">
          {isGood ? 'trending_up' : isWarning ? 'trending_flat' : 'trending_down'}
        </span>
      </div>

      <div className="flex items-end gap-2 mb-1">
        <span className="text-5xl font-extrabold leading-none">{index}</span>
        <span className="text-2xl font-bold opacity-70 mb-1">%</span>
      </div>

      <p className="text-sm opacity-80 font-semibold">{label} estado general</p>

      {/* Mini bar */}
      <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
        <div className="h-full rounded-full bg-white/70" style={{ width: `${index}%` }} />
      </div>
    </div>
  );
};
