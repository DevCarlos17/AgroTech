import { useMutation } from '@tanstack/react-query';
import { useHealthStore } from '../../store/useHealthStore';
import { queryClient } from '../../../../shared/providers/QueryProvider';
import type { HealthRecord, VetNote } from '../../types/ganado.types';

export function useAddHealthRecord() {
  const addHealthRecord = useHealthStore((s) => s.addHealthRecord);
  return useMutation({
    mutationFn: async (record: HealthRecord) => {
      addHealthRecord(record);
      return record;
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ['healthRecords', record.animalId] });
      queryClient.invalidateQueries({ queryKey: ['animalDetail', record.animalId] });
    },
  });
}

export function useAddVetNote() {
  const addVetNote = useHealthStore((s) => s.addVetNote);
  return useMutation({
    mutationFn: async (note: VetNote) => {
      addVetNote(note);
      return note;
    },
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['vetNotes', note.animalId] });
      queryClient.invalidateQueries({ queryKey: ['animalDetail', note.animalId] });
    },
  });
}

export function useResolveAllAlerts() {
  const resolveAllAlerts = useHealthStore((s) => s.resolveAllAlerts);
  return useMutation({
    mutationFn: async (animalId: string) => {
      resolveAllAlerts(animalId);
      return animalId;
    },
    onSuccess: (animalId) => {
      queryClient.invalidateQueries({ queryKey: ['healthRecords', animalId] });
      queryClient.invalidateQueries({ queryKey: ['animalDetail', animalId] });
    },
  });
}
