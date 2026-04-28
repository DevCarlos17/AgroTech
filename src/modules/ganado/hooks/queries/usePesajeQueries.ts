import { useQuery } from '@tanstack/react-query';
import { usePesajeStore } from '../../store/usePesajeStore';

export function usePesajesQuery(animalId?: string) {
  const records = usePesajeStore((s) => s.records);
  const filtered = animalId ? records.filter((r) => r.animalId === animalId) : records;
  return useQuery({
    queryKey: ['pesajes', animalId ?? 'all'],
    queryFn: () => filtered,
    initialData: filtered,
  });
}
