import { useQuery } from '@tanstack/react-query';
import { useHealthStore } from '../../store/useHealthStore';

export function useHealthRecordsQuery(animalId: string) {
  const healthRecords = useHealthStore((s) => s.healthRecords);
  return useQuery({
    queryKey: ['healthRecords', animalId],
    queryFn: () => healthRecords.filter((r) => r.animalId === animalId),
    initialData: () => healthRecords.filter((r) => r.animalId === animalId),
  });
}

export function useVetNotesQuery(animalId: string) {
  const vetNotes = useHealthStore((s) => s.vetNotes);
  return useQuery({
    queryKey: ['vetNotes', animalId],
    queryFn: () => vetNotes.filter((n) => n.animalId === animalId),
    initialData: () => vetNotes.filter((n) => n.animalId === animalId),
  });
}
