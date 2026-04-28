import { useMutation } from '@tanstack/react-query';
import { useAnimalStore } from '../../store/useAnimalStore';
import { queryClient } from '../../../../shared/providers/QueryProvider';
import type { Animal, TipoManejo } from '../../types/ganado.types';

export function useAddAnimal() {
  const addAnimal = useAnimalStore((s) => s.addAnimal);
  return useMutation({
    mutationFn: async (animal: Animal) => {
      addAnimal(animal);
      return animal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}

export function useDeleteAnimal() {
  const deleteAnimal = useAnimalStore((s) => s.deleteAnimal);
  return useMutation({
    mutationFn: async (id: string) => {
      deleteAnimal(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}

export function useUpdateAnimal() {
  const updateAnimal = useAnimalStore((s) => s.updateAnimal);
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Animal> }) => {
      updateAnimal(id, updates);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}

export function useMoveToLote() {
  const updateAnimal = useAnimalStore((s) => s.updateAnimal);
  return useMutation({
    mutationFn: async ({ id, lote, tipoManejo }: { id: string; lote: string; tipoManejo: TipoManejo }) => {
      const updates: Partial<Animal> = { lote, tipoManejo };
      if (lote === 'Ceva') {
        updates.estado = 'Ceva';
        updates.estadoProduccion = undefined;
      } else {
        const current = useAnimalStore.getState().animals.find((a) => a.id === id);
        if (current?.estado === 'Ceva') {
          updates.estado = 'Seca';
        }
      }
      updateAnimal(id, updates);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}
