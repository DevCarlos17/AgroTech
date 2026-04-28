import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useAddVetNote } from '../../hooks/mutations/useHealthMutations';
import { useAnimalStore } from '../../store/useAnimalStore';
import type { NoteType } from '../../types/ganado.types';

export const AddVetNoteModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useAddVetNote();

  const [animalId, setAnimalId] = useState<string>(
    (modalData.animalId as string) ?? (animals[0]?.id ?? ''),
  );
  const [tipo, setTipo] = useState<NoteType>('Chequeo');
  const [contenido, setContenido] = useState('');
  const [veterinario, setVeterinario] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parts = veterinario.trim().split(/\s+/);
    const iniciales = parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
    mutate(
      {
        id: `vn-${Date.now()}`,
        animalId,
        fecha: new Date().toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' }),
        tipo,
        contenido,
        veterinario,
        iniciales,
      },
      { onSuccess: () => closeModal() },
    );
  }

  return (
    <Modal title="Añadir Nota Veterinaria" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Animal">
          <select value={animalId} onChange={(e) => setAnimalId(e.target.value)} className={INPUT_CLS}>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>#{a.id} — {a.nombre}</option>
            ))}
          </select>
        </Field>
        <Field label="Tipo">
          <select value={tipo} onChange={(e) => setTipo(e.target.value as NoteType)} className={INPUT_CLS}>
            <option value="Chequeo">Chequeo</option>
            <option value="Seguimiento">Seguimiento</option>
          </select>
        </Field>
        <Field label="Veterinario">
          <input required value={veterinario} onChange={(e) => setVeterinario(e.target.value)} placeholder="Ej: Dr. Aris P." className={INPUT_CLS} />
        </Field>
        <Field label="Contenido">
          <textarea
            required
            rows={4}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Descripción de la observación clínica..."
            className={`${INPUT_CLS} resize-none`}
          />
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button type="submit" disabled={isPending} className={SUBMIT_CLS}>
            {isPending ? 'Guardando...' : 'Añadir Nota'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Field: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-slate-700 text-sm font-semibold">{label}</label>
    {children}
  </div>
);

const INPUT_CLS =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white';
const CANCEL_CLS =
  'flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors';
const SUBMIT_CLS =
  'flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50';
