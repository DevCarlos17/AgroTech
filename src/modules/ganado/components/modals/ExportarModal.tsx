import { type FC, useState } from 'react';
import { Modal } from '../../../../shared/components/Modal';
import { useUIStore } from '../../../../shared/store/useUIStore';
import { useAnimalStore } from '../../store/useAnimalStore';

type Format = 'JSON' | 'CSV';

export const ExportarModal: FC = () => {
  const closeModal = useUIStore((s) => s.closeModal);
  const animals = useAnimalStore((s) => s.animals);
  const [format, setFormat] = useState<Format>('CSV');

  function handleExport() {
    let content: string;
    let mime: string;
    let filename: string;

    if (format === 'CSV') {
      const header = 'ID,Nombre,Sexo,Raza,Estado,Peso';
      const rows = animals.map((a) =>
        [a.id, a.nombre, a.sexo, a.raza, a.estado, a.peso].join(','),
      );
      content = [header, ...rows].join('\n');
      mime = 'text/csv';
      filename = 'inventario-ganado.csv';
    } else {
      content = JSON.stringify(animals, null, 2);
      mime = 'application/json';
      filename = 'inventario-ganado.json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    closeModal();
  }

  return (
    <Modal title="Exportar Inventario" onClose={closeModal}>
      <div className="flex flex-col gap-5">
        <p className="text-slate-500 text-sm">
          Selecciona el formato de descarga para los {animals.length} animales del inventario.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(['CSV', 'JSON'] as Format[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                format === f
                  ? 'border-primary bg-green-50 text-primary'
                  : 'border-slate-200 text-slate-600 hover:border-primary/50'
              }`}
            >
              <span className="material-symbols-outlined text-3xl">
                {f === 'CSV' ? 'table_chart' : 'data_object'}
              </span>
              <span className="font-bold text-sm">{f}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={closeModal} className={CANCEL_CLS}>Cancelar</button>
          <button onClick={handleExport} className={SUBMIT_CLS}>
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Descargar {format}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const CANCEL_CLS =
  'flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors';
const SUBMIT_CLS =
  'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors';
