import { type FC, useState, useMemo, useRef } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useUpdateAnimal } from '../../hooks/mutations/useAnimalMutations';
import { useAnimalStore, LOTES_DEFAULT } from '../../store/useAnimalStore';
import type {
  AnimalStatus,
  AnimalSex,
  EstadoProduccion,
  TipoManejo,
  EstadoReproductivo,
} from '../../types/ganado.types';

const RAZAS = ['Holstein', 'Jersey', 'Angus', 'Hereford', 'Brahman', 'Simmental', 'Limousin', 'Charolais', 'Gyr', 'Nelore'];
const TIPOS_MANEJO: TipoManejo[] = ['Tabulado', 'Semi-tabulado', 'Extensivo'];

function estadoProduccionToStatus(ep: EstadoProduccion): AnimalStatus {
  if (ep === 'En lactancia') return 'Lactancia';
  if (ep === 'Arrestada') return 'Arrestada';
  return 'Seca';
}

export const EditAnimalModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const modalData = useUIStore((s) => s.modalData);
  const animals = useAnimalStore((s) => s.animals);
  const lotesPersonalizados = useAnimalStore((s) => s.lotesPersonalizados);
  const addLotePersonalizado = useAnimalStore((s) => s.addLotePersonalizado);
  const { mutate, isPending } = useUpdateAnimal();

  const animal = animals.find((a) => a.id === (modalData.animalId as string));

  const [nombre, setNombre] = useState(animal?.nombre ?? '');
  const [owner, setOwner] = useState(animal?.owner ?? '');
  const [sexo, setSexo] = useState<AnimalSex>(animal?.sexo ?? 'Hembra');
  const [raza, setRaza] = useState(animal?.raza ?? 'Holstein');
  const [peso, setPeso] = useState(String(animal?.peso ?? ''));

  // Lote
  const [loteSeleccionado, setLoteSeleccionado] = useState(animal?.lote ?? '');
  const [nuevoLoteName, setNuevoLoteName] = useState('');
  const [tipoManejo, setTipoManejo] = useState<TipoManejo>(animal?.tipoManejo ?? 'Extensivo');

  // Solo hembras — producción
  const [estadoProduccion, setEstadoProduccion] = useState<EstadoProduccion>(
    animal?.estadoProduccion ?? 'En lactancia',
  );

  // Solo hembras — reproductivo
  const [fechaUltimoParto, setFechaUltimoParto] = useState(animal?.fechaUltimoParto ?? '');
  const [numeroDepartos, setNumeroDepartos] = useState(String(animal?.numeroDepartos ?? ''));
  const [estadoReproductivo, setEstadoReproductivo] = useState<EstadoReproductivo>(
    animal?.estadoReproductivo ?? 'V',
  );

  const mesesLactancia = useMemo(() => {
    if (!fechaUltimoParto) return null;
    const diff = new Date().getTime() - new Date(fechaUltimoParto).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)));
  }, [fechaUltimoParto]);

  // Origen
  const [criaFinca, setCriaFinca] = useState(animal?.criaFinca ?? false);
  const [fechaNacimiento, setFechaNacimiento] = useState(animal?.fechaNacimiento ?? '');

  // Genealogía
  const [padreId, setPadreId] = useState(animal?.genealogia?.padreId ?? '');
  const [madreId, setMadreId] = useState(animal?.genealogia?.madreId ?? '');

  // Pedigrí
  const [pedigriFile, setPedigriFile] = useState<{ data: string; name: string } | null>(
    animal?.pedigriFile ? { data: animal.pedigriFile, name: animal.pedigri ?? 'Documento' } : null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!animal) return null;

  const todosLosLotes = [...LOTES_DEFAULT, ...lotesPersonalizados];
  const hembras = animals.filter((a) => a.sexo === 'Hembra');

  function handlePedigriFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('El archivo no puede superar 2 MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPedigriFile({ data: ev.target?.result as string, name: file.name });
    };
    reader.readAsDataURL(file);
  }

  function clearPedigriFile() {
    setPedigriFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let finalLote: string | undefined;
    if (loteSeleccionado === '__NUEVO__' && nuevoLoteName.trim()) {
      finalLote = nuevoLoteName.trim();
      addLotePersonalizado(finalLote);
    } else if (loteSeleccionado) {
      finalLote = loteSeleccionado;
    }

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
          lote: finalLote,
          tipoManejo: finalLote ? tipoManejo : undefined,
          criaFinca,
          fechaNacimiento: criaFinca && fechaNacimiento ? fechaNacimiento : undefined,
          genealogia:
            padreId || madreId
              ? { padreId: padreId || undefined, madreId: madreId || undefined }
              : undefined,
          pedigri: pedigriFile?.name || undefined,
          pedigriFile: pedigriFile?.data || undefined,
          estadoProduccion: sexo === 'Hembra' ? estadoProduccion : undefined,
          fechaUltimoParto: sexo === 'Hembra' && fechaUltimoParto ? fechaUltimoParto : undefined,
          numeroDepartos: sexo === 'Hembra' && numeroDepartos ? Number(numeroDepartos) : undefined,
          estadoReproductivo: sexo === 'Hembra' ? estadoReproductivo : undefined,
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

        {/* ── Asignación de Lote ──────────────────────────────── */}
        <Section label="Asignación de Lote">
          <Field label="Lote">
            <select
              value={loteSeleccionado}
              onChange={(e) => setLoteSeleccionado(e.target.value)}
              className={INPUT_CLS}
            >
              <option value="">— Sin asignar —</option>
              {todosLosLotes.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
              <option value="__NUEVO__">+ Crear lote nuevo...</option>
            </select>
          </Field>
          {loteSeleccionado === '__NUEVO__' && (
            <Field label="Nombre del nuevo lote *">
              <input
                required
                value={nuevoLoteName}
                onChange={(e) => setNuevoLoteName(e.target.value)}
                placeholder="Ej: Potrero Norte"
                className={INPUT_CLS}
              />
            </Field>
          )}
          {loteSeleccionado && (
            <Field label="Tipo de manejo">
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
          )}
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
        </Section>

        {/* ── Datos de Hembra ─────────────────────────────────── */}
        {sexo === 'Hembra' && (
          <Section label="Datos de Hembra">
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

            <div className="grid grid-cols-2 gap-4">
              <Field label="Fecha último parto">
                <input
                  type="date"
                  value={fechaUltimoParto}
                  onChange={(e) => setFechaUltimoParto(e.target.value)}
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Meses de lactancia">
                <div className={`${INPUT_CLS} bg-slate-50 cursor-not-allowed flex items-center min-h-[38px]`}>
                  {mesesLactancia !== null ? (
                    <span className="font-semibold text-slate-800">
                      {mesesLactancia} {mesesLactancia === 1 ? 'mes' : 'meses'}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Calculado desde la fecha de parto</span>
                  )}
                </div>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Número de partos">
                <input
                  type="number"
                  min="0"
                  value={numeroDepartos}
                  onChange={(e) => setNumeroDepartos(e.target.value)}
                  placeholder="Ej: 3"
                  className={INPUT_CLS}
                />
              </Field>
              <Field label="Estado reproductivo">
                <div className="flex gap-2">
                  {(['P', 'V'] as EstadoReproductivo[]).map((er) => (
                    <button
                      key={er}
                      type="button"
                      onClick={() => setEstadoReproductivo(er)}
                      className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-colors ${
                        estadoReproductivo === er
                          ? er === 'P'
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {er === 'P' ? 'P — Preñada' : 'V — Vacía'}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </Section>
        )}

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
              <select value={padreId} onChange={(e) => setPadreId(e.target.value)} className={INPUT_CLS}>
                <option value="">— Sin especificar —</option>
                {animals.filter((a) => a.id !== animal.id).map((a) => (
                  <option key={a.id} value={a.id}>
                    #{a.id}{a.nombre ? ` — ${a.nombre}` : ''} ({a.sexo})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="N° de Madre">
              <select value={madreId} onChange={(e) => setMadreId(e.target.value)} className={INPUT_CLS}>
                <option value="">— Sin especificar —</option>
                {hembras.filter((a) => a.id !== animal.id).map((a) => (
                  <option key={a.id} value={a.id}>
                    #{a.id}{a.nombre ? ` — ${a.nombre}` : ''} ({a.raza})
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Pedigrí">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-primary/40 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  {pedigriFile ? 'Cambiar archivo' : 'Subir documento'}
                </button>
                {pedigriFile && (
                  <button
                    type="button"
                    onClick={clearPedigriFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    aria-label="Quitar archivo"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
              {pedigriFile ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  <span className="font-medium truncate">{pedigriFile.name}</span>
                </div>
              ) : (
                <p className="text-slate-400 text-xs">PDF, JPG o PNG · máx. 2 MB</p>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handlePedigriFile}
                className="hidden"
              />
            </div>
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
