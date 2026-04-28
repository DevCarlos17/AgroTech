import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useAddPesaje } from '../../hooks/mutations/usePesajeMutations';
import { useAnimalStore } from '../../store/useAnimalStore';

export const RegistrarPesajeModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useAddPesaje();

  const [animalId, setAnimalId] = useState<string>(
    (modalData.animalId as string) ?? (animals[0]?.id ?? ''),
  );
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [peso, setPeso] = useState('');
  const [observaciones, setObservaciones] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      {
        id: `wr-${Date.now()}`,
        animalId,
        fecha,
        peso: Number(peso),
        observaciones: observaciones || undefined,
        registradoPor: 'Staff-01',
      },
      { onSuccess: () => closeModal() },
    );
  }

  return (
    <Modal title="Registrar Pesaje" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Animal">
          <select
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            className={INPUT_CLS}
          >
            {animals.map((a) => (
              <option key={a.id} value={a.id}>
                #{a.id} — {a.nombre}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fecha">
          <input
            required
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={INPUT_CLS}
          />
        </Field>
        <Field label="Peso (kg)">
          <input
            required
            type="number"
            min="1"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ej: 660"
            className={INPUT_CLS}
          />
        </Field>
        <Field label="Observaciones (opcional)">
          <input
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ej: Post-vacunación"
            className={INPUT_CLS}
          />
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
