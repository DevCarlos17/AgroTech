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
  { value: 'Ceva',       label: 'Ceva'       },
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
];

interface GanadoFiltersBarProps {
  activeTab: GanadoTab;
  onTabChange: (tab: GanadoTab) => void;
  filterStatus: AnimalStatus | 'Todos';
  onFilterStatus: (s: AnimalStatus | 'Todos') => void;
  filterBreed: string;
  onFilterBreed: (b: string) => void;
}

export const GanadoFiltersBar: FC<GanadoFiltersBarProps> = ({
  activeTab,
  onTabChange,
  filterStatus,
  onFilterStatus,
  filterBreed,
  onFilterBreed,
}) => {
  const statusOptions =
    activeTab === 'Produccion' ? STATUS_OPTIONS_PRODUCCION : STATUS_OPTIONS_ALL;

  return (
    <div>
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
      </div>
    </div>
  );
};
