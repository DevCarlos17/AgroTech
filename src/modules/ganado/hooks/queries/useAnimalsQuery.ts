import { useQuery } from '@tanstack/react-query';
import { useAnimalStore } from '../../store/useAnimalStore';
import { useHealthStore } from '../../store/useHealthStore';
import { buildAnimalDetails } from '../../data/ganado.mock';

export const ANIMALS_QUERY_KEY = ['animals'] as const;

export function useAnimalsQuery() {
  const animals = useAnimalStore((s) => s.animals);
  return useQuery({
    queryKey: ANIMALS_QUERY_KEY,
    queryFn: () => animals,
    initialData: animals,
  });
}

export function useAnimalDetailQuery(id: string | undefined) {
  const animals = useAnimalStore((s) => s.animals);
  const healthRecords = useHealthStore((s) => s.healthRecords);
  const vetNotes = useHealthStore((s) => s.vetNotes);

  return useQuery({
    queryKey: ['animalDetail', id, healthRecords.length, vetNotes.length],
    queryFn: () => {
      if (!id) return undefined;
      const details = buildAnimalDetails(animals, healthRecords, vetNotes);
      return details[id] ?? undefined;
    },
    enabled: !!id,
  });
}
