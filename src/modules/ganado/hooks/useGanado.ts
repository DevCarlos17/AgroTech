import { useState, useMemo } from 'react';
import { useAnimalStore, selectInventoryStats, LOTES_DEFAULT } from '../store/useAnimalStore';
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
  filterLote: string;
  searchQuery: string;
  todosLosLotes: string[];
  activeTab: GanadoTab;
  setActiveTab: (tab: GanadoTab) => void;
  setFilterStatus: (s: AnimalStatus | 'Todos') => void;
  setFilterBreed: (b: string) => void;
  setFilterLote: (l: string) => void;
  setSearchQuery: (q: string) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function useGanado(): UseGanadoReturn {
  const allAnimals = useAnimalStore((s) => s.animals);
  const lotesPersonalizados = useAnimalStore((s) => s.lotesPersonalizados);

  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<AnimalStatus | 'Todos'>('Todos');
  const [filterBreed, setFilterBreed] = useState('Todas');
  const [filterLote, setFilterLote] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<GanadoTab>('Bovinos');

  const todosLosLotes = useMemo(
    () => [...LOTES_DEFAULT, ...lotesPersonalizados],
    [lotesPersonalizados],
  );

  const filtered = useMemo(() => {
    let list = allAnimals;

    // Tab filter — mutually exclusive
    if (activeTab === 'Ceva') {
      list = list.filter((a) => a.estado === 'Ceva');
    } else {
      list = list.filter((a) => a.estado !== 'Ceva');
    }

    // Secondary filters
    if (filterStatus !== 'Todos') list = list.filter((a) => a.estado === filterStatus);

    if (filterBreed !== 'Todas') {
      list = list.filter((a) =>
        a.razaCompuesta
          ? a.razaCompuesta.some((e) => e.raza === filterBreed)
          : a.raza === filterBreed,
      );
    }

    if (filterLote !== 'Todos') list = list.filter((a) => a.lote === filterLote);

    // Global search — ID, nombre, raza, lote
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          (a.nombre ?? '').toLowerCase().includes(q) ||
          a.raza.toLowerCase().includes(q) ||
          (a.lote ?? '').toLowerCase().includes(q),
      );
    }

    return list;
  }, [allAnimals, activeTab, filterStatus, filterBreed, filterLote, searchQuery]);

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

  function handleSetFilterLote(l: string) {
    setFilterLote(l);
    setPage(1);
  }

  function handleSetSearchQuery(q: string) {
    setSearchQuery(q);
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
    filterLote,
    searchQuery,
    todosLosLotes,
    activeTab,
    setActiveTab: handleSetActiveTab,
    setFilterStatus: handleSetFilterStatus,
    setFilterBreed: handleSetFilterBreed,
    setFilterLote: handleSetFilterLote,
    setSearchQuery: handleSetSearchQuery,
    goToNextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
    goToPrevPage: () => setPage((p) => Math.max(p - 1, 1)),
  };
}
