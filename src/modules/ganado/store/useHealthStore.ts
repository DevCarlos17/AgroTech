import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HealthRecord, VetNote } from '../types/ganado.types';

interface HealthState {
  healthRecords: HealthRecord[];
  vetNotes: VetNote[];
  addHealthRecord: (record: HealthRecord) => void;
  addVetNote: (note: VetNote) => void;
  resolveAlert: (id: string) => void;
  resolveAllAlerts: (animalId: string) => void;
  getRecordsByAnimal: (animalId: string) => HealthRecord[];
  getNotesByAnimal: (animalId: string) => VetNote[];
}

export const useHealthStore = create<HealthState>()(
  persist(
    (set, get) => ({
      healthRecords: [],
      vetNotes: [],

      addHealthRecord(record) {
        set((s) => ({ healthRecords: [...s.healthRecords, record] }));
      },

      addVetNote(note) {
        set((s) => ({ vetNotes: [...s.vetNotes, note] }));
      },

      resolveAlert(id) {
        set((s) => ({
          healthRecords: s.healthRecords.map((r) =>
            r.id === id ? { ...r, estado: 'Resuelto' as const } : r,
          ),
        }));
      },

      resolveAllAlerts(animalId) {
        set((s) => ({
          healthRecords: s.healthRecords.map((r) =>
            r.animalId === animalId && (r.estado === 'Vencido' || r.tipo === 'Urgente')
              ? { ...r, estado: 'Resuelto' as const }
              : r,
          ),
        }));
      },

      getRecordsByAnimal(animalId) {
        return get().healthRecords.filter((r) => r.animalId === animalId);
      },

      getNotesByAnimal(animalId) {
        return get().vetNotes.filter((n) => n.animalId === animalId);
      },
    }),
    { name: 'agrotech-health-v2' },
  ),
);
