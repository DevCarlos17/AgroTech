import { useMemo } from 'react';
import { useAnimalStore } from '../store/useAnimalStore';
import { useHealthStore } from '../store/useHealthStore';
import { buildAnimalDetails } from '../data/ganado.mock';
import type { AnimalDetail } from '../types/ganado.types';

interface UseSaludAnimalReturn {
  animal: AnimalDetail | undefined;
  notFound: boolean;
}

export function useSaludAnimal(id: string | undefined): UseSaludAnimalReturn {
  const animals = useAnimalStore((s) => s.animals);
  const healthRecords = useHealthStore((s) => s.healthRecords);
  const vetNotes = useHealthStore((s) => s.vetNotes);

  const animal = useMemo(() => {
    if (!id) return undefined;
    const details = buildAnimalDetails(animals, healthRecords, vetNotes);
    return details[id];
  }, [id, animals, healthRecords, vetNotes]);

  return { animal, notFound: !!id && !animal };
}
