import type { FC } from 'react';
import type { AnimalStatus } from '../../modules/ganado/types/ganado.types';

interface StatusBadgeProps {
  status: AnimalStatus;
}

const STATUS_STYLES: Record<AnimalStatus, string> = {
  Lactancia:  'bg-green-100 text-green-700 border border-green-200',
  Seca:       'bg-amber-50 text-amber-700 border border-amber-100',
  Arrestada:  'bg-orange-50 text-orange-700 border border-orange-100',
  Ceva:       'bg-blue-50 text-blue-700 border border-blue-100',
  Gestante:   'bg-purple-50 text-purple-700 border border-purple-100',
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);
