import type { FC } from 'react';
import { Dropdown } from '../../../shared/components/Dropdown';
import type { AnimalStatus, GanadoTab } from '../types/ganado.types';

interface Tab {
  label: string;
  value: GanadoTab;
}

const TABS: Tab[] = [
  { label: 'Bovinos',    value: 'Bovinos'    },
  { label: 'Ceva',       value: 'Ceva'       },
  { label: 'Producción', value: 'Produccion' },
];

const STATUS_OPTIONS_ALL = [
  { value: 'Todos',      label: 'Todos'      },
  { value: 'Lactancia',  label: 'Lactancia'  },
  { value: 'Seca',       label: 'Seca'       },
  { value: 'Arrestada',  label: 'Arrestada'  },
  { value: 'Gestante',   label: 'Gestante'   },
];

const STATUS_OPTIONS_PRODUCCION = [
  { value: 'Todos',      label: 'Todos'      },
  { value: 'Lactancia',  label: 'Lactancia'  },
  { value: 'Seca',       label: 'Seca'       },
  { value: 'Arrestada',  label: 'Arrestada'  },
  { value: 'Gestante',   label: 'Gestante'   },
];

const BREED_OPTIONS = [
  { value: 'Todas',     label: 'Todas'     },
  { value: 'Holstein',  label: 'Holstein'  },
  { value: 'Jersey',    label: 'Jersey'    },
  { value: 'Angus',     label: 'Angus'     },
  { value: 'Hereford',  label: 'Hereford'  },
  { value: 'Brahman',   label: 'Brahman'   },
  { value: 'Simmental', label: 'Simmental' },
  { value: 'Limousin',  label: 'Limousin'  },
  { value: 'Charolais', label: 'Charolais' },
  { value: 'Gyr',       label: 'Gyr'       },
  { value: 'Nelore',    label: 'Nelore'    },
  { value: 'Mestizo',   label: 'Mestizo'   },
];

interface GanadoFiltersBarProps {
  activeTab: GanadoTab;
  onTabChange: (tab: GanadoTab) => void;
  filterStatus: AnimalStatus | 'Todos';
  onFilterStatus: (s: AnimalStatus | 'Todos') => void;
  filterBreed: string;
  onFilterBreed: (b: string) => void;
  filterLote: string;
  onFilterLote: (l: string) => void;
  todosLosLotes: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const GanadoFiltersBar: FC<GanadoFiltersBarProps> = ({
  activeTab,
  onTabChange,
  filterStatus,
  onFilterStatus,
  filterBreed,
  onFilterBreed,
  filterLote,
  onFilterLote,
  todosLosLotes,
  searchQuery,
  onSearchChange,
}) => {
  const statusOptions =
    activeTab === 'Produccion' ? STATUS_OPTIONS_PRODUCCION : STATUS_OPTIONS_ALL;

  const loteOptions = [
    { value: 'Todos', label: 'Todos' },
    ...todosLosLotes.map((l) => ({ value: l, label: l })),
  ];

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-4 max-w-sm">
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
          search
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por ID, nombre, raza o lote…"
          className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-rose-500 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 gap-8 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`flex flex-col items-center justify-center border-b-2 pb-4 pt-2 px-2 transition-all ${
              activeTab === tab.value
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            <span className="text-sm font-bold tracking-wide">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-3 pb-1">
        {activeTab !== 'Ceva' && (
          <Dropdown
            prefix="Estado"
            options={statusOptions}
            value={filterStatus}
            onChange={(v) => onFilterStatus(v as AnimalStatus | 'Todos')}
            label="Todos"
          />
        )}
        <Dropdown
          prefix="Raza"
          options={BREED_OPTIONS}
          value={filterBreed}
          onChange={onFilterBreed}
          label="Todas"
        />
        <Dropdown
          prefix="Lote"
          options={loteOptions}
          value={filterLote}
          onChange={onFilterLote}
          label="Todos"
        />
      </div>
    </div>
  );
};
