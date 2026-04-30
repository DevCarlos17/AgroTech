export type AnimalStatus = 'Lactancia' | 'Seca' | 'Arrestada' | 'Ceva' | 'Gestante';
export type AnimalSex = 'Macho' | 'Hembra';
export type EtapaAnimal = 'Vaca' | 'Toro' | 'Novillo' | 'Mauto' | 'Becerro' | 'Buey';
export type LoteNombre = 'Escotero' | 'Parido' | 'Crías' | 'Ceva';
export type TipoManejo = 'Tabulado' | 'Semi-tabulado' | 'Extensivo';
export type RecordType = 'Vacunación' | 'Tratamiento' | 'Urgente';
export type RecordStatus = 'Confirmado' | 'Resuelto' | 'Pendiente' | 'Vencido';
export type NoteType = 'Chequeo' | 'Seguimiento';
export type GanadoTab = 'Bovinos' | 'Ceva' | 'Produccion';
export type EstadoProduccion = 'Seca' | 'En lactancia' | 'Arrestada';
export type EstadoReproductivo = 'P' | 'V';
export type ModalType =
  | 'addAnimal'
  | 'editAnimal'
  | 'registrarPesaje'
  | 'nuevoTratamiento'
  | 'moverALote'
  | 'addVetNote'
  | 'exportar'
  | 'registroNacimiento'
  | 'registroDeceso'
  | 'settings'
  | null;

export interface RazaEntry {
  raza: string;
  porcentaje: number;
}

export interface Animal {
  id: string;
  nombre?: string;
  owner: string;
  sexo: AnimalSex;
  raza: string;
  razaCompuesta?: RazaEntry[];
  estado: AnimalStatus;
  peso: number;
  foto?: string;
  // Origen
  criaFinca?: boolean;
  fechaNacimiento?: string;
  // Genealogía
  genealogia?: { padreId?: string; madreId?: string };
  pedigri?: string;         // filename for display
  pedigriFile?: string;     // base64 data URL
  // Solo hembras — producción
  estadoProduccion?: EstadoProduccion;
  // Etapa del animal
  etapa?: EtapaAnimal;
  // Solo hembras — reproductivo
  fechaUltimoParto?: string;
  numeroDepartos?: number;
  estadoReproductivo?: EstadoReproductivo;
  mesesPreñez?: number;      // solo si etapa=Vaca y estadoReproductivo='P'
  revisionMedica?: string;   // solo si etapa=Vaca y estadoReproductivo='V'
  // Lote y manejo (string to support custom lots)
  lote?: string;
  tipoManejo?: TipoManejo;
}

export interface HealthRecord {
  id: string;
  animalId: string;
  fecha: string;
  tipo: RecordType;
  medicina: string;
  estado: RecordStatus;
  veterinario: string;
}

export interface VetNote {
  id: string;
  animalId: string;
  fecha: string;
  tipo: NoteType;
  contenido: string;
  veterinario: string;
  iniciales: string;
}

export interface ReproductiveData {
  animalId: string;
  estadoReproductivo: string;
  mesGestacion: number;
  fechaProbableParto: string;
  tipoServicio: string;
  inseminador: string;
  paridad: string;
  progreso: number;
}

export interface WeightRecord {
  id: string;
  animalId: string;
  fecha: string;
  peso: number;
  ganancia?: number;
  observaciones?: string;
  registradoPor: string;
}

export interface AnimalDetail extends Animal {
  produccion: string;
  ultimoParto: string;
  grupo: string;
  edad: string;
  indice_salud: number;
  healthRecords: HealthRecord[];
  vetNotes: VetNote[];
  reproductiveData?: ReproductiveData;
}

export interface InventoryStats {
  totalCabezas: number;
  lactancia: number;
  seca: number;
  ceva: number;
  gestantes: number;
}
