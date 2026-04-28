import type { FC } from 'react';
import { useUIStore } from '../../../shared/store/useUIStore';
import type { ModalType } from '../types/ganado.types';

interface QuickAction {
  icon: string;
  title: string;
  subtitle: string;
  modal: NonNullable<ModalType>;
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: 'add_circle',       title: 'Agregar Animal',       subtitle: 'Registrar nuevo ejemplar',  modal: 'addAnimal'          },
  { icon: 'child_care',       title: 'Registrar Nacimiento', subtitle: 'Alta de nueva cría',        modal: 'registroNacimiento' },
  { icon: 'monitor_weight',   title: 'Registrar Pesaje',     subtitle: 'Registro diario o mensual', modal: 'registrarPesaje'    },
  { icon: 'move_down',        title: 'Mover a Lote',         subtitle: 'Transferir entre potreros', modal: 'moverALote'         },
  { icon: 'medical_services', title: 'Control de Salud',     subtitle: 'Vacunación o medicación',   modal: 'nuevoTratamiento'   },
];

export const GanadoQuickActions: FC = () => {
  const openModal = useUIStore((s) => s.openModal);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6">
      <h3 className="text-slate-900 font-extrabold text-lg mb-6">
        Acciones Rápidas
      </h3>
      <div className="flex flex-col gap-3">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.title}
            onClick={() => openModal(action.modal)}
            className="flex items-center gap-4 w-full p-3 rounded-xl border border-transparent hover:border-green-100 hover:bg-green-50 transition-all text-left group"
            aria-label={action.title}
          >
            <div className="size-11 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">{action.icon}</span>
            </div>
            <div>
              <p className="text-slate-900 text-sm font-bold leading-none mb-1">{action.title}</p>
              <p className="text-slate-500 text-xs">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
