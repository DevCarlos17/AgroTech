import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useAddAnimal } from '../../hooks/mutations/useAnimalMutations';
import { useAnimalStore } from '../../store/useAnimalStore';
import type { AnimalSex, AnimalStatus } from '../../types/ganado.types';

export const RegistroNacimientoModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useAddAnimal();

  const hembras = animals.filter((a) => a.sexo === 'Hembra');

  const [madreId, setMadreId] = useState(hembras[0]?.id ?? '');
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [sexo, setSexo] = useState<AnimalSex>('Hembra');
  const [peso, setPeso] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const madre = animals.find((a) => a.id === madreId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const estado: AnimalStatus = sexo === 'Hembra' ? 'Lactancia' : 'Ceva';

    mutate(
      {
        id: id.trim(),
        nombre: nombre.trim() || undefined,
        owner: madre?.owner ?? '',
        sexo,
        raza: madre?.raza ?? 'Holstein',
        estado,
        peso: Number(peso),
        criaFinca: true,
        fechaNacimiento,
        genealogia: { madreId },
        estadoProduccion: sexo === 'Hembra' ? 'En lactancia' : undefined,
      },
      { onSuccess: () => closeModal() },
    );
  }

  return (
    <Modal title="Registrar Nacimiento" onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {hembras.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">
            No hay hembras registradas en el inventario.
          </p>
        ) : (
          <>
            <Field label="Madre *">
              <select value={madreId} onChange={(e) => setMadreId(e.target.value)} className={INPUT_CLS}>
                {hembras.map((a) => (
                  <option key={a.id} value={a.id}>
                    #{a.id}{a.nombre ? ` — ${a.nombre}` : ''} ({a.raza})
                  </option>
                ))}
              </select>
              {madre && (
                <p className="text-slate-400 text-xs mt-1">
                  La cría heredará: raza <strong>{madre.raza}</strong> · dueño <strong>{madre.owner}</strong>
                </p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="ID de la Cría *">
                <input
                  required
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Ej: 4533"
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Nombre">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Opcional"
                  className={INPUT_CLS}
                />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Sexo *">
                <select value={sexo} onChange={(e) => setSexo(e.target.value as AnimalSex)} className={INPUT_CLS}>
                  <option value="Hembra">Hembra</option>
                  <option value="Macho">Macho</option>
                </select>
              </Field>
              <Field label="Peso al nacer (kg) *">
                <input
                  required
                  type="number"
                  min="1"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="Ej: 42"
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Fecha de nacimiento *">
                <input
                  required
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
              <button type="submit" disabled={isPending} className={SUBMIT_CLS}>
                {isPending ? 'Guardando...' : 'Registrar Cría'}
              </button>
            </div>
          </>
        )}
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
