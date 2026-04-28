import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Animal, InventoryStats } from '../types/ganado.types';
import { ANIMALS } from '../data/ganado.mock';

export const LOTES_DEFAULT = ['Escotero', 'Parido', 'Crías', 'Ceva'] as const;

interface AnimalState {
  animals: Animal[];
  lotesPersonalizados: string[];
  addAnimal: (animal: Animal) => void;
  updateAnimal: (id: string, updates: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;
  addLotePersonalizado: (nombre: string) => void;
}

export const useAnimalStore = create<AnimalState>()(
  persist(
    (set) => ({
      animals: ANIMALS,
      lotesPersonalizados: [],

      addAnimal(animal) {
        set((s) => ({ animals: [animal, ...s.animals] }));
      },

      updateAnimal(id, updates) {
        set((s) => ({
          animals: s.animals.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
      },

      deleteAnimal(id) {
        set((s) => ({ animals: s.animals.filter((a) => a.id !== id) }));
      },

      addLotePersonalizado(nombre) {
        set((s) => ({
          lotesPersonalizados: s.lotesPersonalizados.includes(nombre)
            ? s.lotesPersonalizados
            : [...s.lotesPersonalizados, nombre],
        }));
      },
    }),
    { name: 'agrotech-animals-v3' },
  ),
);

export function selectInventoryStats(animals: Animal[]): InventoryStats {
  return {
    totalCabezas: animals.length,
    lactancia: animals.filter((a) => a.estado === 'Lactancia').length,
    seca: animals.filter((a) => a.estado === 'Seca').length,
    ceva: animals.filter((a) => a.estado === 'Ceva').length,
    gestantes: animals.filter((a) => a.estado === 'Gestante').length,
  };
}
