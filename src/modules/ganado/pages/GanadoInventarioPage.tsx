import type { FC } from 'react';
import { useGanado } from '../hooks/useGanado';
import { useUIStore } from '../../../shared/store/useUIStore';
import { GanadoFiltersBar } from '../components/GanadoFiltersBar';
import { GanadoTable } from '../components/GanadoTable';

const GanadoInventarioPage: FC = () => {
  const {
    animals,
    page,
    totalPages,
    totalCount,
    pageSize,
    activeTab,
    filterStatus,
    filterBreed,
    setActiveTab,
    setFilterStatus,
    setFilterBreed,
    goToNextPage,
    goToPrevPage,
  } = useGanado();

  const openModal = useUIStore((s) => s.openModal);

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900 font-extrabold text-2xl leading-tight">
            Inventario de Ganado
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gestión y control de todos los animales del hato
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal('exportar')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary text-sm font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Exportar
          </button>
          <button
            onClick={() => openModal('addAnimal')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nuevo Animal
          </button>
        </div>
      </div>

      {/* Filters */}
      <GanadoFiltersBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filterStatus={filterStatus}
        onFilterStatus={setFilterStatus}
        filterBreed={filterBreed}
        onFilterBreed={setFilterBreed}
      />

      {/* Table */}
      <GanadoTable
        animals={animals}
        totalCount={totalCount}
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
      />
    </div>
  );
};

export default GanadoInventarioPage;
