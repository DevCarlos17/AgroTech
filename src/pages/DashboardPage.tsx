import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimalStore, selectInventoryStats } from '../modules/ganado/store/useAnimalStore';
import { useHealthStore } from '../modules/ganado/store/useHealthStore';
import { GanadoQuickActions } from '../modules/ganado/components/GanadoQuickActions';
import { GanadoInventarioSummary } from '../modules/ganado/components/GanadoInventarioSummary';

const DashboardPage: FC = () => {
  const navigate = useNavigate();
  const animals = useAnimalStore((s) => s.animals);
  const healthRecords = useHealthStore((s) => s.healthRecords);
  const stats = selectInventoryStats(animals);

  const alertasActivas = healthRecords.filter(
    (r) => r.estado === 'Vencido' || r.tipo === 'Urgente',
  ).length;
  const tratamientosPendientes = healthRecords.filter((r) => r.estado === 'Pendiente').length;

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-8 flex flex-col gap-7">

      {/* Header */}
      <div>
        <p className="text-slate-400 text-sm capitalize">{today}</p>
        <h1 className="text-slate-900 font-extrabold text-2xl leading-tight mt-0.5">
          Panel de Control
        </h1>
        <p className="text-slate-400 text-sm mt-1">Resumen general de la finca</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon="pets"
          label="Total Cabezas"
          value={stats.totalCabezas}
          color="text-primary"
          bg="bg-green-50"
          onClick={() => navigate('/ganado/inventario')}
        />
        <StatCard
          icon="water_drop"
          label="En Lactancia"
          value={stats.lactancia}
          color="text-blue-500"
          bg="bg-blue-50"
          onClick={() => navigate('/ganado/inventario')}
        />
        <StatCard
          icon="favorite"
          label="Gestantes"
          value={stats.gestantes}
          color="text-pink-500"
          bg="bg-pink-50"
          onClick={() => navigate('/ganado/inventario')}
        />
        <StatCard
          icon="warning"
          label="Alertas Activas"
          value={alertasActivas}
          color="text-red-500"
          bg="bg-red-50"
          onClick={() => navigate('/ganado/salud')}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-6 items-start">

        {/* Left: Quick actions */}
        <div className="col-span-1">
          <GanadoQuickActions />
        </div>

        {/* Right: Inventory summary + secondary stats + farm card */}
        <div className="col-span-2 flex flex-col gap-5">
          <GanadoInventarioSummary stats={stats} />

          {/* Secondary stats row */}
          <div className="grid grid-cols-2 gap-4">
            <SecondaryCard
              icon="medical_services"
              label="Tratamientos pendientes"
              value={tratamientosPendientes}
              color="text-amber-500"
              bg="bg-amber-50"
              onClick={() => navigate('/ganado/salud')}
            />
            <SecondaryCard
              icon="monitor_weight"
              label="Animales en Ceva"
              value={stats.ceva}
              color="text-slate-600"
              bg="bg-slate-100"
              onClick={() => navigate('/ganado/inventario')}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard: FC<{
  icon: string;
  label: string;
  value: number;
  color: string;
  bg: string;
  onClick?: () => void;
}> = ({ icon, label, value, color, bg, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-xl border border-slate-100 bg-white p-5 text-left hover:border-slate-200 hover:shadow-sm transition-all w-full"
  >
    <div className="flex items-center gap-3">
      <div className={`size-10 rounded-xl flex items-center justify-center ${color} ${bg}`}>
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <div>
        <p className="text-slate-400 text-xs font-medium">{label}</p>
        <p className="text-slate-900 text-xl font-extrabold leading-tight">{value}</p>
      </div>
    </div>
  </button>
);

const SecondaryCard: FC<{
  icon: string;
  label: string;
  value: number;
  color: string;
  bg: string;
  onClick?: () => void;
}> = ({ icon, label, value, color, bg, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-xl border border-slate-100 bg-white p-4 text-left hover:border-slate-200 hover:shadow-sm transition-all w-full flex items-center gap-3"
  >
    <div className={`size-9 rounded-xl flex items-center justify-center ${color} ${bg}`}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium">{label}</p>
      <p className="text-slate-900 text-lg font-extrabold leading-tight">{value}</p>
    </div>
  </button>
);

export default DashboardPage;
