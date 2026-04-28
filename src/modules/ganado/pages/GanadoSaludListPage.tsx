import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimalStore } from '../store/useAnimalStore';
import { useHealthStore } from '../store/useHealthStore';
import { buildAnimalDetails } from '../data/ganado.mock';
import { StatusBadge } from '../../../shared/components/StatusBadge';

const GanadoSaludListPage: FC = () => {
  const navigate = useNavigate();
  const animals = useAnimalStore((s) => s.animals);
  const healthRecords = useHealthStore((s) => s.healthRecords);
  const vetNotes = useHealthStore((s) => s.vetNotes);
  const details = buildAnimalDetails(animals, healthRecords, vetNotes);

  const rows = animals.map((animal) => {
    const records = healthRecords.filter((r) => r.animalId === animal.id);
    const alertas = records.filter((r) => r.estado === 'Vencido' || r.tipo === 'Urgente').length;
    const vacunasAlDia = records.filter((r) => r.tipo === 'Vacunación' && r.estado === 'Confirmado').length;
    const indice = details[animal.id]?.indice_salud ?? 85;
    return { animal, alertas, vacunasAlDia, indice };
  });

  const totalAlertas = rows.reduce((acc, r) => acc + r.alertas, 0);
  const totalVacunasAlDia = rows.reduce((acc, r) => acc + r.vacunasAlDia, 0);
  const tratamientosPendientes = healthRecords.filter((r) => r.estado === 'Pendiente').length;

  return (
    <div className="p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-slate-900 font-extrabold text-2xl leading-tight">Salud Animal</h1>
        <p className="text-slate-400 text-sm mt-1">Estado de salud centralizado de todo el hato</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon="warning"
          label="Alertas activas"
          value={String(totalAlertas)}
          color="text-red-500"
          bg="bg-red-50"
        />
        <StatCard
          icon="vaccines"
          label="Vacunas al día"
          value={String(totalVacunasAlDia)}
          color="text-primary"
          bg="bg-green-50"
        />
        <StatCard
          icon="medical_services"
          label="Tratamientos pendientes"
          value={String(tratamientosPendientes)}
          color="text-amber-500"
          bg="bg-amber-50"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {['ID', 'Nombre', 'Estado', 'Índice Salud', 'Alertas', 'Acciones'].map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-100 ${
                    i === 5 ? 'text-right' : ''
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <span className="material-symbols-outlined text-slate-200 text-5xl block mb-3">health_and_safety</span>
                  <p className="text-slate-500 font-semibold text-sm">Sin animales registrados</p>
                  <p className="text-slate-400 text-xs mt-1">Registra animales en el inventario para gestionar su salud.</p>
                </td>
              </tr>
            )}
            {rows.map(({ animal, alertas, indice }) => (
              <tr
                key={animal.id}
                onClick={() => navigate(`/ganado/salud/${animal.id}`)}
                className="hover:bg-green-50/30 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-slate-400 text-sm font-mono">#{animal.id}</td>
                <td className="px-6 py-4 text-slate-900 font-bold text-sm">{animal.nombre ?? `#${animal.id}`}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={animal.estado} />
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${indice}%` }}
                      />
                    </div>
                    <span className="text-slate-700 text-sm font-semibold w-8 text-right">{indice}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {alertas > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      {alertas}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/ganado/salud/${animal.id}`); }}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Ver perfil
                  </button>
                </td>
              </tr>
            ))}
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

export default GanadoSaludListPage;
