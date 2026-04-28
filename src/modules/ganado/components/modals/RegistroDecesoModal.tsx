import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useDeleteAnimal } from '../../hooks/mutations/useAnimalMutations';
import { useAnimalStore } from '../../store/useAnimalStore';

const RAZONES = ['Muerte natural', 'Accidente', 'Venta', 'Traslado externo'] as const;
type Razon = typeof RAZONES[number];

export const RegistroDecesoModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useDeleteAnimal();

  const [animalId, setAnimalId] = useState<string>(
    (modalData.animalId as string) ?? (animals[0]?.id ?? ''),
  );
  const [razon, setRazon] = useState<Razon>('Muerte natural');
  const [confirmed, setConfirmed] = useState(false);

  const animal = animals.find((a) => a.id === animalId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirmed) return;
    mutate(animalId, { onSuccess: () => closeModal() });
  }

  return (
    <Modal title="Dar de Baja" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <Field label="Animal">
          <select value={animalId} onChange={(e) => { setAnimalId(e.target.value); setConfirmed(false); }} className={INPUT_CLS}>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>
                #{a.id}{a.nombre ? ` — ${a.nombre}` : ''}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Razón de baja">
          <div className="grid grid-cols-2 gap-2">
            {RAZONES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRazon(r)}
                className={`py-2 px-3 rounded-xl border text-sm font-semibold transition-colors text-left ${
                  razon === r
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </Field>

        {/* Confirmation */}
        {animal && (
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="text-red-700 text-sm font-semibold mb-2">
              Esta acción removerá a{' '}
              <span className="font-extrabold">{animal.nombre ?? `#${animal.id}`}</span>{' '}
              del inventario de forma permanente.
            </p>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="size-4 accent-red-600"
              />
              <span className="text-red-700 text-sm">Confirmo la baja del animal</span>
            </label>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button
            type="submit"
            disabled={isPending || !confirmed || !animalId}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {isPending ? 'Procesando...' : `Dar de Baja (${razon})`}
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
