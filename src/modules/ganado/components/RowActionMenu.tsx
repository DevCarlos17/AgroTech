import { type FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../../shared/store/useUIStore';
import { useDeleteAnimal } from '../hooks/mutations/useAnimalMutations';
import type { Animal } from '../types/ganado.types';

interface RowActionMenuProps {
  animal: Animal;
}

export const RowActionMenu: FC<RowActionMenuProps> = ({ animal }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const openModal = useUIStore((s) => s.openModal);
  const { mutate: deleteAnimal } = useDeleteAnimal();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function handleAction(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100"
        aria-label={`Opciones para ${animal.nombre ?? animal.id}`}
      >
        <span className="material-symbols-outlined">more_horiz</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-20 bg-white border border-slate-100 rounded-xl shadow-lg min-w-[180px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon="visibility"
            label="Ver perfil"
            onClick={() => handleAction(() => navigate(`/ganado/salud/${animal.id}`))}
          />
          <MenuItem
            icon="edit"
            label="Editar"
            onClick={() => handleAction(() => openModal('editAnimal', { animalId: animal.id }))}
          />
          <MenuItem
            icon="monitor_weight"
            label="Registrar pesaje"
            onClick={() => handleAction(() => openModal('registrarPesaje', { animalId: animal.id }))}
          />
          <MenuItem
            icon="move_down"
            label="Mover a lote"
            onClick={() => handleAction(() => openModal('moverALote', { animalId: animal.id }))}
          />
          <div className="border-t border-slate-100" />
          <MenuItem
            icon="heart_broken"
            label="Dar de baja"
            danger
            onClick={() => handleAction(() => openModal('registroDeceso', { animalId: animal.id }))}
          />
          <MenuItem
            icon="delete"
            label="Eliminar"
            danger
            onClick={() => handleAction(() => {
              if (confirm(`¿Eliminar a ${animal.nombre ?? animal.id}?`)) deleteAnimal(animal.id);
            })}
          />
        </div>
      )}
    </div>
  );
};

const MenuItem: FC<{ icon: string; label: string; onClick: () => void; danger?: boolean }> = ({
  icon,
  label,
  onClick,
  danger,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors ${
      danger
        ? 'text-red-600 hover:bg-red-50'
        : 'text-slate-700 hover:bg-green-50 hover:text-primary'
    }`}
  >
    <span className="material-symbols-outlined text-[18px]">{icon}</span>
    {label}
  </button>
);
