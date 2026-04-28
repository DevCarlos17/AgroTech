import { useMutation } from '@tanstack/react-query';
import { usePesajeStore } from '../../store/usePesajeStore';
import { useAnimalStore } from '../../store/useAnimalStore';
import { queryClient } from '../../../../shared/providers/QueryProvider';
import type { WeightRecord } from '../../types/ganado.types';

export function useAddPesaje() {
  const addRecord = usePesajeStore((s) => s.addRecord);
  const getByAnimal = usePesajeStore((s) => s.getByAnimal);
  const updateAnimal = useAnimalStore((s) => s.updateAnimal);

  return useMutation({
    mutationFn: async (record: WeightRecord) => {
      // Auto-calculate ganancia vs the most recent previous pesaje
      const prev = getByAnimal(record.animalId)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
      const ganancia = prev != null ? record.peso - prev.peso : undefined;

      const finalRecord: WeightRecord = { ...record, ganancia };
      addRecord(finalRecord);
      updateAnimal(record.animalId, { peso: record.peso });
      return finalRecord;
    },
    onSuccess: (record) => {
      queryClient.invalidateQueries({ queryKey: ['pesajes'] });
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      queryClient.invalidateQueries({ queryKey: ['animalDetail', record.animalId] });
    },
  });
}
