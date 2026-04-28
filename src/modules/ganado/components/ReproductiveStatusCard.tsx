import type { FC } from 'react';
import type { AnimalDetail } from '../types/ganado.types';

interface ReproductiveStatusCardProps {
  animal: AnimalDetail;
}

export const ReproductiveStatusCard: FC<ReproductiveStatusCardProps> = ({ animal }) => {
  const repro = animal.reproductiveData;
  if (!repro) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-slate-900 font-extrabold text-base mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-[20px]">favorite</span>
        Estado Reproductivo
      </h3>

      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-500 text-sm">
          {repro.estadoReproductivo} · Mes {repro.mesGestacion}
        </span>
        <span className="text-primary font-extrabold text-sm">{repro.progreso}%</span>
      </div>

      {/* Gradient progress bar */}
      <div className="relative h-3 rounded-full bg-slate-100 mb-3 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${repro.progreso}%`,
            background: 'linear-gradient(90deg, #10b981, #34d399)',
          }}
        />
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 mb-5">
        <span>Concepción</span>
        <span>FPP: {repro.fechaProbableParto}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ReproDetail label="Tipo servicio" value={repro.tipoServicio} />
        <ReproDetail label="Inseminador" value={repro.inseminador} />
        <ReproDetail label="Paridad" value={String(repro.paridad)} />
        <ReproDetail label="Mes gestación" value={`${repro.mesGestacion} / 9`} />
      </div>
    </div>
  );
};

const ReproDetail: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 rounded-lg px-3 py-2">
    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">{label}</p>
    <p className="text-slate-800 text-sm font-semibold">{value}</p>
  </div>
);
