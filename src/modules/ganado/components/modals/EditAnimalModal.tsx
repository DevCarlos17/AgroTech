import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useUpdateAnimal } from '../../hooks/mutations/useAnimalMutations';
import { useAnimalStore } from '../../store/useAnimalStore';
import type { AnimalStatus, AnimalSex, EstadoProduccion } from '../../types/ganado.types';

const RAZAS = ['Holstein', 'Jersey', 'Angus', 'Hereford', 'Brahman', 'Simmental', 'Limousin', 'Charolais', 'Gyr', 'Nelore'];

function estadoProduccionToStatus(ep: EstadoProduccion): AnimalStatus {
  if (ep === 'En lactancia') return 'Lactancia';
  return 'Seca';
}

export const EditAnimalModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const { mutate, isPending } = useUpdateAnimal();

  const animal = animals.find((a) => a.id === (modalData.animalId as string));

  const [nombre, setNombre] = useState(animal?.nombre ?? '');
  const [owner, setOwner] = useState(animal?.owner ?? '');
  const [sexo, setSexo] = useState<AnimalSex>(animal?.sexo ?? 'Hembra');
  const [raza, setRaza] = useState(animal?.raza ?? 'Holstein');
  const [peso, setPeso] = useState(String(animal?.peso ?? ''));
  const [criaFinca, setCriaFinca] = useState(animal?.criaFinca ?? false);
  const [fechaNacimiento, setFechaNacimiento] = useState(animal?.fechaNacimiento ?? '');
  const [padreId, setPadreId] = useState(animal?.genealogia?.padreId ?? '');
  const [madreId, setMadreId] = useState(animal?.genealogia?.madreId ?? '');
  const [pedigri, setPedigri] = useState(animal?.pedigri ?? '');
  const [estadoProduccion, setEstadoProduccion] = useState<EstadoProduccion>(
    animal?.estadoProduccion ?? 'En lactancia',
  );

  if (!animal) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const estado: AnimalStatus =
      sexo === 'Hembra' ? estadoProduccionToStatus(estadoProduccion) : 'Ceva';

    mutate(
      {
        id: animal!.id,
        updates: {
          nombre: nombre.trim() || undefined,
          owner: owner.trim(),
          sexo,
          raza,
          estado,
          peso: Number(peso),
          criaFinca,
          fechaNacimiento: criaFinca && fechaNacimiento ? fechaNacimiento : undefined,
          genealogia:
            padreId || madreId
              ? { padreId: padreId || undefined, madreId: madreId || undefined }
              : undefined,
          pedigri: pedigri.trim() || undefined,
          estadoProduccion: sexo === 'Hembra' ? estadoProduccion : undefined,
        },
      },
      { onSuccess: () => closeModal() },
    );
  }

  return (
    <Modal title={`Editar Animal #${animal.id}`} onClose={closeModal} size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* ── Identificación ─────────────────────────────────── */}
        <Section label="Identificación">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Número de Identificación">
              <input value={animal.id} disabled className={`${INPUT_CLS} opacity-50 cursor-not-allowed`} />
            </Field>
            <Field label="Nombre">
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre (opcional)"
                className={INPUT_CLS}
              />
            </Field>
          </div>
          <Field label="Dueño *">
            <input
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Nombre del propietario legal"
              className={INPUT_CLS}
            />
          </Field>
        </Section>

        {/* ── Características ────────────────────────────────── */}
        <Section label="Características">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Raza">
              <select value={raza} onChange={(e) => setRaza(e.target.value)} className={INPUT_CLS}>
                {RAZAS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Sexo *">
              <select value={sexo} onChange={(e) => setSexo(e.target.value as AnimalSex)} className={INPUT_CLS}>
                <option value="Hembra">Hembra</option>
                <option value="Macho">Macho</option>
              </select>
            </Field>
            <Field label="Peso (kg) *">
              <input
                required
                type="number"
                min="1"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className={INPUT_CLS}
              />
            </Field>
          </div>
          {sexo === 'Hembra' && (
            <Field label="Estatus de producción">
              <div className="flex gap-2">
                {(['En lactancia', 'Seca', 'Arrestada'] as EstadoProduccion[]).map((ep) => (
                  <button
                    key={ep}
                    type="button"
                    onClick={() => setEstadoProduccion(ep)}
                    className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                      estadoProduccion === ep
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    {ep}
                  </button>
                ))}
              </div>
            </Field>
          )}
        </Section>

        {/* ── Origen ─────────────────────────────────────────── */}
        <Section label="Origen">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-slate-800 text-sm font-semibold">¿Cría de su finca?</p>
              <p className="text-slate-400 text-xs">Indica si nació en la hacienda</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={criaFinca}
              onClick={() => setCriaFinca((v) => !v)}
              style={{ backgroundColor: criaFinca ? 'var(--color-primary, #16a34a)' : '#cbd5e1' }}
              className="inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer"
            >
              <span
                aria-hidden="true"
                style={{ transform: criaFinca ? 'translateX(22px)' : 'translateX(2px)' }}
                className="inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out"
              />
            </button>
          </div>
          {criaFinca && (
            <Field label="Fecha de Nacimiento *">
              <input
                required={criaFinca}
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className={INPUT_CLS}
              />
            </Field>
          )}
        </Section>

        {/* ── Genealogía ─────────────────────────────────────── */}
        <Section label="Genealogía">
          <div className="grid grid-cols-2 gap-4">
            <Field label="N° de Padre">
              <input value={padreId} onChange={(e) => setPadreId(e.target.value)} placeholder="ID del padre (opcional)" className={INPUT_CLS} />
            </Field>
            <Field label="N° de Madre">
              <input value={madreId} onChange={(e) => setMadreId(e.target.value)} placeholder="ID de la madre (opcional)" className={INPUT_CLS} />
            </Field>
          </div>
          <Field label="Pedigrí">
            <input value={pedigri} onChange={(e) => setPedigri(e.target.value)} placeholder="Procedencia o pureza genética (opcional)" className={INPUT_CLS} />
          </Field>
        </Section>

        {/* ── Actions ────────────────────────────────────────── */}
        <div className="flex gap-3 pt-1 border-t border-slate-100">
          <button type="button" onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button type="submit" disabled={isPending} className={SUBMIT_CLS}>
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const Section: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-3">
    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    {children}
  </div>
);

const Field: FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-slate-700 text-sm font-medium">{label}</label>
    {children}
  </div>
);

const INPUT_CLS =
  'w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white';
const CANCEL_CLS =
  'flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors';
const SUBMIT_CLS =
  'flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50';
