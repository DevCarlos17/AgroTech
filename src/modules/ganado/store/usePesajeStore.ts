import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeightRecord } from '../types/ganado.types';

interface PesajeState {
  records: WeightRecord[];
  addRecord: (record: WeightRecord) => void;
  getByAnimal: (animalId: string) => WeightRecord[];
}

export const usePesajeStore = create<PesajeState>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord(record) {
        set((s) => ({ records: [...s.records, record] }));
      },

      getByAnimal(animalId) {
        return get().records.filter((r) => r.animalId === animalId);
      },
    }),
    { name: 'agrotech-pesajes-v2' },
  ),
);
