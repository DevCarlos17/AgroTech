import type { FC } from 'react';
import type { VetNote, NoteType } from '../types/ganado.types';
import { useUIStore } from '../../../shared/store/useUIStore';

interface VetNotesPanelProps {
  notes: VetNote[];
  animalId?: string;
}

const ACCENT: Record<NoteType, string> = {
  Chequeo: 'border-primary bg-primary-light',
  Seguimiento: 'border-amber-400 bg-amber-50',
};

const INITIALS_BG: Record<NoteType, string> = {
  Chequeo: 'bg-primary text-white',
  Seguimiento: 'bg-amber-400 text-white',
};

export const VetNotesPanel: FC<VetNotesPanelProps> = ({ notes, animalId }) => {
  const openModal = useUIStore((s) => s.openModal);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
          Notas Veterinarias
        </h3>
        <span className="text-slate-400 text-xs">{notes.length} notas</span>
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`border-l-4 rounded-r-xl p-4 ${ACCENT[note.tipo]}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${INITIALS_BG[note.tipo]}`}
              >
                {note.iniciales}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1 mb-1">
                  <span className="text-slate-800 text-sm font-bold">{note.veterinario}</span>
                  <span className="text-slate-400 text-[11px] font-mono">{note.fecha}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{note.contenido}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-white/70 border border-slate-200 text-[10px] text-slate-500 font-semibold">
                  {note.tipo}
                </span>
              </div>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-6">Sin notas veterinarias.</p>
        )}

        <button
          onClick={() => openModal('addVetNote', animalId ? { animalId } : {})}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-colors text-sm font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Añadir Nota
        </button>
      </div>
    </div>
  );
};
