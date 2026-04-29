import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useMoveToLote } from '../../hooks/mutations/useAnimalMutations';
import { useAnimalStore, LOTES_DEFAULT } from '../../store/useAnimalStore';
import type { TipoManejo } from '../../types/ganado.types';

const TIPOS_MANEJO: TipoManejo[] = ['Tabulado', 'Semi-tabulado', 'Extensivo'];

export const MoverALoteModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const lotesPersonalizados = useAnimalStore((s) => s.lotesPersonalizados);
  const { mutate, isPending } = useMoveToLote();

  const todosLosLotes = [...LOTES_DEFAULT, ...lotesPersonalizados];

  const [animalId, setAnimalId] = useState<string>(
    (modalData.animalId as string) ?? (animals[0]?.id ?? ''),
  );
  const [lote, setLote] = useState<string>(LOTES_DEFAULT[0]);
  const [tipoManejo, setTipoManejo] = useState<TipoManejo>('Extensivo');

  const loteOrigen = animals.find((a) => a.id === animalId)?.lote ?? 'Sin lote asignado';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ id: animalId, lote, tipoManejo }, { onSuccess: () => closeModal() });
  }

  return (
    <Modal title="Mover a Lote" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <Field label="Animal">
          <select value={animalId} onChange={(e) => setAnimalId(e.target.value)} className={INPUT_CLS}>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>
                #{a.id}{a.nombre ? ` — ${a.nombre}` : ''}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Lote de origen">
          <div className={READONLY_CLS}>{loteOrigen}</div>
        </Field>

        <Field label="Lote de destino">
          <select value={lote} onChange={(e) => setLote(e.target.value)} className={INPUT_CLS}>
            {todosLosLotes.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Field>

        <Field label="Tipo de manejo del lote">
          <div className="flex gap-2">
            {TIPOS_MANEJO.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTipoManejo(t)}
                className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                  tipoManejo === t
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button type="submit" disabled={isPending || !animalId} className={SUBMIT_CLS}>
            {isPending ? 'Guardando...' : 'Mover Animal'}
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

const READONLY_CLS =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-500 bg-slate-50';
const INPUT_CLS =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white';
const CANCEL_CLS =
  'flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors';
const SUBMIT_CLS =
  'flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50';
