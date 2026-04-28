import type { FC } from 'react';
import { usePesajeStore } from '../store/usePesajeStore';
import { useAnimalStore } from '../store/useAnimalStore';
import { useUIStore } from '../../../shared/store/useUIStore';

const GanadoPesajesPage: FC = () => {
  const records = usePesajeStore((s) => s.records);
  const animals = useAnimalStore((s) => s.animals);
  const openModal = useUIStore((s) => s.openModal);

  const animalMap = Object.fromEntries(animals.map((a) => [a.id, a]));

  const sorted = [...records].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
  );

  const pesajesEsteMes = records.filter((r) => {
    const d = new Date(r.fecha);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const promedioHato =
    records.length > 0
      ? Math.round(records.reduce((s, r) => s + r.peso, 0) / records.length)
      : 0;

  const mayorGanancia =
    records.length > 0
      ? Math.max(...records.map((r) => r.ganancia ?? 0))
      : 0;

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900 font-extrabold text-2xl leading-tight">Registro de Pesajes</h1>
          <p className="text-slate-400 text-sm mt-1">
            Control de peso individual y curvas de crecimiento
          </p>
        </div>
        <button
          onClick={() => openModal('registrarPesaje')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Registrar Pesaje
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="monitor_weight" label="Promedio del hato" value={`${promedioHato} kg`} color="text-primary"   bg="bg-green-50" />
        <StatCard icon="calendar_month" label="Pesajes este mes"  value={String(pesajesEsteMes)} color="text-blue-500" bg="bg-blue-50"  />
        <StatCard icon="trending_up"    label="Mayor ganancia"    value={`+${mayorGanancia} kg`} color="text-pink-500" bg="bg-pink-50"  />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {['Fecha', 'Animal', 'Peso (kg)', 'Cambio', 'Observaciones', 'Registrado por'].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                  Sin pesajes registrados aún.
                </td>
              </tr>
            )}
            {sorted.map((r) => {
              const animal = animalMap[r.animalId];
              return (
                <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 text-sm font-mono">{r.fecha}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-bold text-sm">{animal?.nombre ?? '—'}</span>
                      <span className="text-slate-400 text-xs">#{r.animalId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-semibold text-sm">{r.peso}</td>
                  <td className="px-6 py-4">
                    {r.ganancia != null ? (
                      <span
                        className={`inline-flex items-center gap-0.5 text-sm font-bold ${
                          r.ganancia >= 0 ? 'text-primary' : 'text-red-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {r.ganancia >= 0 ? 'trending_up' : 'trending_down'}
                        </span>
                        {r.ganancia >= 0 ? '+' : ''}{r.ganancia} kg
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {r.observaciones ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{r.registradoPor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard: FC<{ icon: string; label: string; value: string; color: string; bg: string }> = ({
  icon, label, value, color, bg,
}) => (
  <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`size-10 rounded-xl flex items-center justify-center ${color} ${bg}`}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{label}</p>
        <p className="text-slate-900 text-xl font-extrabold leading-tight">{value}</p>
      </div>
    </div>
  </div>
);

export default GanadoPesajesPage;
