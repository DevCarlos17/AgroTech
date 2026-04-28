import { type FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSaludAnimal } from '../hooks/useSaludAnimal';
import { useUIStore } from '../../../shared/store/useUIStore';
import { usePesajeStore } from '../store/usePesajeStore';
import { AnimalProfileCard } from '../components/AnimalProfileCard';
import { ReproductiveStatusCard } from '../components/ReproductiveStatusCard';
import { ClinicalHistoryTable } from '../components/ClinicalHistoryTable';
import { VetNotesPanel } from '../components/VetNotesPanel';
import { HealthIndexCard } from '../components/HealthIndexCard';
import { HealthAlertsPanel } from '../components/HealthAlertsPanel';

type ProfileTab = 'salud' | 'pesajes' | 'notas' | 'reproduccion';

const GanadoSaludPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animal, notFound } = useSaludAnimal(id);
  const openModal = useUIStore((s) => s.openModal);
  const getByAnimal = usePesajeStore((s) => s.getByAnimal);
  const [activeTab, setActiveTab] = useState<ProfileTab>('salud');

  const pesajes = id
    ? [...getByAnimal(id)].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    : [];

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
        <span className="material-symbols-outlined text-slate-300 text-7xl">search_off</span>
        <p className="text-slate-500 text-lg font-semibold">Animal no encontrado</p>
        <button
          onClick={() => navigate('/ganado/inventario')}
          className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold"
        >
          Volver al inventario
        </button>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="material-symbols-outlined text-primary text-4xl animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  const tabs: { value: ProfileTab; label: string; icon: string; count?: number }[] = [
    { value: 'salud',        label: 'Salud',        icon: 'health_and_safety', count: animal.healthRecords.length },
    { value: 'pesajes',      label: 'Pesajes',      icon: 'monitor_weight',    count: pesajes.length             },
    { value: 'notas',        label: 'Notas Vet.',   icon: 'edit_note',         count: animal.vetNotes.length     },
    ...(animal.reproductiveData
      ? [{ value: 'reproduccion' as ProfileTab, label: 'Reproducción', icon: 'favorite' }]
      : []),
  ];

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* Profile card + action buttons */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <AnimalProfileCard animal={animal} />
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <ActionButton
            icon="monitor_weight"
            label="Registrar Pesaje"
            onClick={() => openModal('registrarPesaje', { animalId: animal.id })}
          />
          <ActionButton
            icon="medical_services"
            label="Nuevo Tratamiento"
            onClick={() => openModal('nuevoTratamiento', { animalId: animal.id })}
          />
          <ActionButton
            icon="move_down"
            label="Mover a Lote"
            onClick={() => openModal('moverALote', { animalId: animal.id })}
          />
          <ActionButton
            icon="edit"
            label="Editar Animal"
            onClick={() => openModal('editAnimal', { animalId: animal.id })}
          />
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-slate-100">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 pb-4 pt-2 px-1 border-b-2 text-sm font-bold transition-all ${
                activeTab === tab.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`inline-flex items-center justify-center size-5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.value
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Salud ──────────────────────────────────────── */}
      {activeTab === 'salud' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-6">
            <ClinicalHistoryTable records={animal.healthRecords} />
            <HealthAlertsPanel records={animal.healthRecords} animalId={animal.id} />
          </div>
          <div className="flex flex-col gap-5">
            <HealthIndexCard index={animal.indice_salud} />
          </div>
        </div>
      )}

      {/* ── Tab: Pesajes ────────────────────────────────────── */}
      {activeTab === 'pesajes' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-slate-500 text-sm">
              {pesajes.length} {pesajes.length === 1 ? 'registro' : 'registros'} en total
            </p>
            <button
              onClick={() => openModal('registrarPesaje', { animalId: animal.id })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Nuevo Pesaje
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  {['Fecha', 'Peso', 'Cambio', 'Observaciones'].map((col) => (
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
                {pesajes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <span className="material-symbols-outlined text-slate-200 text-5xl block mb-3">
                        monitor_weight
                      </span>
                      <p className="text-slate-500 font-semibold text-sm">Sin pesajes registrados</p>
                      <p className="text-slate-400 text-xs mt-1">
                        Usa el botón "Nuevo Pesaje" para comenzar el seguimiento de peso.
                      </p>
                    </td>
                  </tr>
                ) : (
                  pesajes.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 text-sm font-mono">{p.fecha}</td>
                      <td className="px-6 py-4 text-slate-900 text-sm font-semibold">{p.peso} kg</td>
                      <td className="px-6 py-4">
                        {p.ganancia != null ? (
                          <span
                            className={`inline-flex items-center gap-0.5 text-sm font-bold ${
                              p.ganancia >= 0 ? 'text-primary' : 'text-red-500'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {p.ganancia >= 0 ? 'trending_up' : 'trending_down'}
                            </span>
                            {p.ganancia >= 0 ? '+' : ''}{p.ganancia} kg
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{p.observaciones ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Tab: Notas Vet. ─────────────────────────────────── */}
      {activeTab === 'notas' && (
        <div className="max-w-2xl">
          <VetNotesPanel notes={animal.vetNotes} animalId={animal.id} />
        </div>
      )}

      {/* ── Tab: Reproducción ───────────────────────────────── */}
      {activeTab === 'reproduccion' && animal.reproductiveData && (
        <div className="max-w-lg">
          <ReproductiveStatusCard animal={animal} />
        </div>
      )}

    </div>
  );
};

const ActionButton: FC<{ icon: string; label: string; onClick: () => void }> = ({
  icon,
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary text-sm font-semibold transition-colors whitespace-nowrap"
  >
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    {label}
  </button>
);

export default GanadoSaludPage;
