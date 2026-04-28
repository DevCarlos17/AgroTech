import type { FC } from 'react';
import { useUIStore } from '../store/useUIStore';
import { AddAnimalModal } from '../../modules/ganado/components/modals/AddAnimalModal';
import { EditAnimalModal } from '../../modules/ganado/components/modals/EditAnimalModal';
import { RegistrarPesajeModal } from '../../modules/ganado/components/modals/RegistrarPesajeModal';
import { NuevoTratamientoModal } from '../../modules/ganado/components/modals/NuevoTratamientoModal';
import { MoverALoteModal } from '../../modules/ganado/components/modals/MoverALoteModal';
import { AddVetNoteModal } from '../../modules/ganado/components/modals/AddVetNoteModal';
import { ExportarModal } from '../../modules/ganado/components/modals/ExportarModal';
import { RegistroNacimientoModal } from '../../modules/ganado/components/modals/RegistroNacimientoModal';
import { RegistroDecesoModal } from '../../modules/ganado/components/modals/RegistroDecesoModal';

export const ModalProvider: FC = () => {
  const activeModal = useUIStore((s) => s.activeModal);

  switch (activeModal) {
    case 'addAnimal':           return <AddAnimalModal />;
    case 'editAnimal':          return <EditAnimalModal />;
    case 'registrarPesaje':     return <RegistrarPesajeModal />;
    case 'nuevoTratamiento':    return <NuevoTratamientoModal />;
    case 'moverALote':          return <MoverALoteModal />;
    case 'addVetNote':          return <AddVetNoteModal />;
    case 'exportar':            return <ExportarModal />;
    case 'registroNacimiento':  return <RegistroNacimientoModal />;
    case 'registroDeceso':      return <RegistroDecesoModal />;
    default:                    return null;
  }
};
