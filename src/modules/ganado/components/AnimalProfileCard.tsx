import type { FC } from 'react';
import type { AnimalDetail } from '../types/ganado.types';
import { StatusBadge } from '../../../shared/components/StatusBadge';

interface AnimalProfileCardProps {
  animal: AnimalDetail;
}

export const AnimalProfileCard: FC<AnimalProfileCardProps> = ({ animal }) => {
  const hasGenealogy = animal.genealogia?.padreId || animal.genealogia?.madreId;
  const hasExtraData = animal.criaFinca !== undefined || hasGenealogy || animal.pedigri || animal.estadoProduccion;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">

      {/* ── Top: avatar + identidad ───────────────────────── */}
      <div className="flex items-start gap-5">
        <div className="size-20 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 overflow-hidden">
          {animal.foto ? (
            <img src={animal.foto} alt={animal.nombre ?? animal.id} className="size-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-primary text-4xl">cruelty_free</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h2 className="text-slate-900 font-extrabold text-xl leading-tight">
              {animal.nombre ?? `#${animal.id}`}
            </h2>
            <StatusBadge status={animal.estado} />
            {animal.estadoProduccion && animal.sexo === 'Hembra' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                {animal.estadoProduccion}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mb-3">
            #{animal.id} · {animal.raza} · {animal.sexo}
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip icon="scale"       label="Peso"       value={`${animal.peso} kg`}        />
            <Chip icon="water_drop"  label="Producción" value={animal.produccion}           />
            <Chip icon="child_care"  label="Último parto" value={animal.ultimoParto}        />
            <Chip icon="person"      label="Dueño"      value={animal.owner}               />
          </div>
        </div>
      </div>

      {/* ── Fila 1: info de producción ────────────────────── */}
      <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-4 gap-4">
        <Detail label="Grupo"   value={animal.grupo} />
        <Detail label="Edad"    value={animal.edad}  />
        <Detail label="Paridad" value={animal.reproductiveData?.paridad ?? '—'} />
        <Detail
          label="Índice de salud"
          value={`${animal.indice_salud}%`}
          valueClass={
            animal.indice_salud >= 80 ? 'text-primary' :
            animal.indice_salud >= 60 ? 'text-amber-600' : 'text-red-500'
          }
        />
      </div>

      {/* ── Fila 2: origen + genealogía (solo si hay data) ── */}
      {hasExtraData && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-x-8 gap-y-4">

          {/* Origen */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Origen</p>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                  animal.criaFinca
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {animal.criaFinca ? 'home' : 'shopping_cart'}
                </span>
                {animal.criaFinca ? 'Cría de la finca' : 'Adquirido externamente'}
              </span>
            </div>
            {animal.criaFinca && animal.fechaNacimiento && (
              <Detail label="Fecha de nacimiento" value={formatDate(animal.fechaNacimiento)} />
            )}
          </div>

          {/* Genealogía + Pedigrí */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Genealogía</p>
            <div className="grid grid-cols-2 gap-3">
              <Detail label="N° Padre" value={animal.genealogia?.padreId ?? '—'} />
              <Detail label="N° Madre" value={animal.genealogia?.madreId ?? '—'} />
            </div>
            {animal.pedigri && (
              <Detail label="Pedigrí" value={animal.pedigri} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${d} ${months[Number(m) - 1]} ${y}`;
}

const Chip: FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
    <span className="material-symbols-outlined text-slate-400 text-[16px]">{icon}</span>
    <span className="text-slate-500 text-xs">{label}:</span>
    <span className="text-slate-800 text-xs font-bold">{value}</span>
  </div>
);

const Detail: FC<{ label: string; value: string; valueClass?: string }> = ({
  label,
  value,
  valueClass = 'text-slate-800',
}) => (
  <div>
    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-bold mb-0.5">{label}</p>
    <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
  </div>
);
