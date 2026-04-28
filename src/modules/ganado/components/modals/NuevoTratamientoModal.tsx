import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useAddHealthRecord } from '../../hooks/mutations/useHealthMutations';
import { useAnimalStore } from '../../store/useAnimalStore';
import type { RecordType } from '../../types/ganado.types';

export const NuevoTratamientoModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useAddHealthRecord();

  const [animalId, setAnimalId] = useState<string>(
    (modalData.animalId as string) ?? (animals[0]?.id ?? ''),
  );
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [tipo, setTipo] = useState<RecordType>('Tratamiento');
  const [medicina, setMedicina] = useState('');
  const [veterinario, setVeterinario] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      {
        id: `hr-${Date.now()}`,
        animalId,
        fecha,
        tipo,
        medicina,
        estado: 'Pendiente',
        veterinario,
      },
      { onSuccess: () => closeModal() },
    );
  }

  return (
    <Modal title="Nuevo Tratamiento / Vacunación" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Animal">
          <select value={animalId} onChange={(e) => setAnimalId(e.target.value)} className={INPUT_CLS}>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>#{a.id}{a.nombre ? ` — ${a.nombre}` : ''}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Fecha">
            <input required type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={INPUT_CLS} />
          </Field>
          <Field label="Tipo">
            <select value={tipo} onChange={(e) => setTipo(e.target.value as RecordType)} className={INPUT_CLS}>
              <option value="Tratamiento">Tratamiento</option>
              <option value="Vacunación">Vacunación</option>
              <option value="Urgente">Urgente</option>
            </select>
          </Field>
        </div>
        <Field label="Medicina / Procedimiento">
          <input required value={medicina} onChange={(e) => setMedicina(e.target.value)} placeholder="Ej: Vacuna BVD" className={INPUT_CLS} />
        </Field>
        <Field label="Veterinario">
          <input required value={veterinario} onChange={(e) => setVeterinario(e.target.value)} placeholder="Ej: Dr. Aris" className={INPUT_CLS} />
        </Field>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button type="submit" disabled={isPending} className={SUBMIT_CLS}>
            {isPending ? 'Guardando...' : 'Registrar'}
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
