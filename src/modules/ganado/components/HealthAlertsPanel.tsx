import type { FC } from 'react';
import type { HealthRecord } from '../types/ganado.types';
import { useResolveAllAlerts } from '../hooks/mutations/useHealthMutations';

interface HealthAlertsPanelProps {
  records: HealthRecord[];
  animalId?: string;
}

export const HealthAlertsPanel: FC<HealthAlertsPanelProps> = ({ records, animalId }) => {
  const alerts = records.filter((r) => r.estado === 'Vencido' || r.tipo === 'Urgente');
  const { mutate: resolveAll, isPending } = useResolveAllAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-700 font-extrabold text-base flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          Alertas de Salud
          <span className="ml-1 size-5 rounded-full bg-red-500 text-white text-[11px] font-extrabold flex items-center justify-center">
            {alerts.length}
          </span>
        </h3>
        {animalId && (
          <button
            onClick={() => resolveAll(animalId)}
            disabled={isPending}
            className="text-red-600 text-xs font-bold hover:underline disabled:opacity-50"
          >
            Resolver Todo
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 bg-white border border-red-100 rounded-lg p-3"
          >
            <span className="material-symbols-outlined text-red-400 text-[20px] mt-0.5 shrink-0">
              {alert.tipo === 'Urgente' ? 'emergency' : 'schedule'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-sm font-semibold leading-tight">{alert.medicina}</p>
              <p className="text-slate-400 text-xs mt-0.5">
                {alert.tipo} · {alert.fecha} · {alert.veterinario}
              </p>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold">
              {alert.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
