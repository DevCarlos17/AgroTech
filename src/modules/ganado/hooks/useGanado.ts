import { useState, useMemo } from 'react';
import { useAnimalStore, selectInventoryStats } from '../store/useAnimalStore';
import type { Animal, AnimalStatus, GanadoTab, InventoryStats } from '../types/ganado.types';

const PAGE_SIZE = 8;

interface UseGanadoReturn {
  animals: Animal[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  stats: InventoryStats;
  filterStatus: AnimalStatus | 'Todos';
  filterBreed: string;
  activeTab: GanadoTab;
  setActiveTab: (tab: GanadoTab) => void;
  setFilterStatus: (s: AnimalStatus | 'Todos') => void;
  setFilterBreed: (b: string) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function useGanado(): UseGanadoReturn {
  const allAnimals = useAnimalStore((s) => s.animals);

  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<AnimalStatus | 'Todos'>('Todos');
  const [filterBreed, setFilterBreed] = useState('Todas');
  const [activeTab, setActiveTab] = useState<GanadoTab>('Bovinos');

  const filtered = useMemo(() => {
    let list = allAnimals;

    // Tab filter (primary category)
    if (activeTab === 'Ceva') {
      list = list.filter((a) => a.estado === 'Ceva');
    } else if (activeTab === 'Produccion') {
      list = list.filter((a) => a.estado !== 'Ceva');
    }

    // Secondary filters
    if (filterStatus !== 'Todos') list = list.filter((a) => a.estado === filterStatus);
    if (filterBreed !== 'Todas') list = list.filter((a) => a.raza === filterBreed);

    return list;
  }, [allAnimals, activeTab, filterStatus, filterBreed]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const animals = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSetActiveTab(tab: GanadoTab) {
    setActiveTab(tab);
    setFilterStatus('Todos');
    setPage(1);
  }

  function handleSetFilterStatus(s: AnimalStatus | 'Todos') {
    setFilterStatus(s);
    setPage(1);
  }

  function handleSetFilterBreed(b: string) {
    setFilterBreed(b);
    setPage(1);
  }

  return {
    animals,
    totalCount: filtered.length,
    page: currentPage,
    pageSize: PAGE_SIZE,
    totalPages,
    stats: selectInventoryStats(allAnimals),
    filterStatus,
    filterBreed,
    activeTab,
    setActiveTab: handleSetActiveTab,
    setFilterStatus: handleSetFilterStatus,
    setFilterBreed: handleSetFilterBreed,
    goToNextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
    goToPrevPage: () => setPage((p) => Math.max(p - 1, 1)),
  };
}
