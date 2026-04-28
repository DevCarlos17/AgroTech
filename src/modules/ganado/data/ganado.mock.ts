import type {
  Animal,
  AnimalDetail,
  HealthRecord,
  VetNote,
  ReproductiveData,
  WeightRecord,
} from '../types/ganado.types';

export const ANIMALS: Animal[] = [
  { id: '4521', nombre: 'Daisy',    owner: 'Carlos Mendoza', sexo: 'Hembra', raza: 'Holstein',  estado: 'Lactancia', peso: 650, criaFinca: true,  fechaNacimiento: '2019-08-14', estadoProduccion: 'En lactancia', genealogia: { padreId: '3810', madreId: '3601' }, pedigri: 'Holstein Certified HF-92'  },
  { id: '4522', nombre: 'Bessy',    owner: 'Carlos Mendoza', sexo: 'Hembra', raza: 'Jersey',    estado: 'Seca',      peso: 580, criaFinca: true,  fechaNacimiento: '2020-03-22', estadoProduccion: 'Seca',          genealogia: { padreId: '3811' }                                                   },
  { id: '4523', nombre: 'Duke',     owner: 'María González', sexo: 'Macho',  raza: 'Angus',     estado: 'Ceva',      peso: 720, criaFinca: false,                               genealogia: {},                                    pedigri: 'Angus Black Line AG-04'   },
  { id: '4524', nombre: 'Molly',    owner: 'Juan Herrera',   sexo: 'Hembra', raza: 'Hereford',  estado: 'Lactancia', peso: 610, criaFinca: true,  fechaNacimiento: '2020-11-05', estadoProduccion: 'En lactancia', genealogia: { madreId: '3602' }                                                    },
  { id: '4525', nombre: 'Rex',      owner: 'María González', sexo: 'Macho',  raza: 'Brahman',   estado: 'Ceva',      peso: 800, criaFinca: false,                               genealogia: {},                                    pedigri: 'Brahman Puro BRH-17'      },
  { id: '4526', nombre: 'Luna',     owner: 'Carlos Mendoza', sexo: 'Hembra', raza: 'Simmental', estado: 'Gestante',  peso: 670, criaFinca: true,  fechaNacimiento: '2019-06-30', estadoProduccion: 'En lactancia', genealogia: { padreId: '3812', madreId: '3603' }                                   },
  { id: '4527', nombre: 'Titan',    owner: 'Pedro Ruiz',     sexo: 'Macho',  raza: 'Limousin',  estado: 'Ceva',      peso: 850, criaFinca: false,                               genealogia: {},                                    pedigri: 'Limousin Elite LM-08'     },
  { id: '4528', nombre: 'Rosa',     owner: 'Juan Herrera',   sexo: 'Hembra', raza: 'Holstein',  estado: 'Lactancia', peso: 620, criaFinca: true,  fechaNacimiento: '2020-09-18', estadoProduccion: 'En lactancia', genealogia: { padreId: '3810' }                                                    },
  { id: '4529', nombre: 'Bruno',    owner: 'Pedro Ruiz',     sexo: 'Macho',  raza: 'Angus',     estado: 'Ceva',      peso: 780, criaFinca: false,                               genealogia: {}                                                                                                        },
  { id: '4530', nombre: 'Paloma',   owner: 'Carlos Mendoza', sexo: 'Hembra', raza: 'Jersey',    estado: 'Seca',      peso: 540, criaFinca: true,  fechaNacimiento: '2020-05-11', estadoProduccion: 'Seca',          genealogia: { madreId: '3601' }                                                   },
  { id: '4531', nombre: 'Estrella', owner: 'Juan Herrera',   sexo: 'Hembra', raza: 'Hereford',  estado: 'Gestante',  peso: 630, criaFinca: false,                               estadoProduccion: 'En lactancia', genealogia: {}                                                                    },
  { id: '4532', nombre: 'Toro',     owner: 'Pedro Ruiz',     sexo: 'Macho',  raza: 'Brahman',   estado: 'Ceva',      peso: 820, criaFinca: false,                               genealogia: {},                                    pedigri: 'Brahman Registrado BR-22' },
];

// ─── Health Records ───────────────────────────────────────────────────────────

export const SEED_HEALTH_RECORDS: HealthRecord[] = [
  // Daisy
  { id: 'hr-001', animalId: '4521', fecha: '15 Oct 2023', tipo: 'Vacunación', medicina: 'Refuerzo BVD',          estado: 'Confirmado', veterinario: 'Dr. Aris'  },
  { id: 'hr-002', animalId: '4521', fecha: '02 Sep 2023', tipo: 'Tratamiento', medicina: 'Tratamiento Mastitis', estado: 'Resuelto',   veterinario: 'Dr. Smith' },
  { id: 'hr-003', animalId: '4521', fecha: '12 Ago 2023', tipo: 'Vacunación', medicina: 'Vacuna Fiebre Aftosa',  estado: 'Confirmado', veterinario: 'Staff-04'  },
  { id: 'hr-004', animalId: '4521', fecha: 'Vencido',     tipo: 'Urgente',    medicina: 'Anual de Rabia',        estado: 'Vencido',    veterinario: '--'        },
  // Molly
  { id: 'hr-005', animalId: '4524', fecha: '10 Oct 2023', tipo: 'Vacunación', medicina: 'Vacuna Triple',         estado: 'Confirmado', veterinario: 'Dr. Aris'  },
  { id: 'hr-006', animalId: '4524', fecha: '18 Sep 2023', tipo: 'Tratamiento', medicina: 'Antibiótico',          estado: 'Resuelto',   veterinario: 'Dr. Smith' },
  // Luna
  { id: 'hr-007', animalId: '4526', fecha: '05 Nov 2023', tipo: 'Vacunación', medicina: 'Vacuna Prenatal',       estado: 'Confirmado', veterinario: 'Dr. López' },
  { id: 'hr-008', animalId: '4526', fecha: 'Vencido',     tipo: 'Urgente',    medicina: 'Control Gestación',     estado: 'Vencido',    veterinario: '--'        },
  // Rosa
  { id: 'hr-009', animalId: '4528', fecha: '20 Oct 2023', tipo: 'Tratamiento', medicina: 'Tratamiento Cojera',  estado: 'Resuelto',   veterinario: 'Dr. Aris'  },
  { id: 'hr-010', animalId: '4528', fecha: '01 Oct 2023', tipo: 'Vacunación', medicina: 'BVD + PI3',             estado: 'Confirmado', veterinario: 'Staff-04'  },
  // Estrella
  { id: 'hr-011', animalId: '4531', fecha: '12 Nov 2023', tipo: 'Vacunación', medicina: 'Vacuna Prenatal',       estado: 'Confirmado', veterinario: 'Dr. López' },
  { id: 'hr-012', animalId: '4531', fecha: '03 Oct 2023', tipo: 'Tratamiento', medicina: 'Suplemento Mineral',   estado: 'Resuelto',   veterinario: 'Dr. Smith' },
  // Duke
  { id: 'hr-013', animalId: '4523', fecha: '15 Sep 2023', tipo: 'Vacunación', medicina: 'Vacuna Fiebre Aftosa',  estado: 'Confirmado', veterinario: 'Staff-04'  },
  { id: 'hr-014', animalId: '4523', fecha: 'Vencido',     tipo: 'Urgente',    medicina: 'Desparasitación',       estado: 'Vencido',    veterinario: '--'        },
];

// ─── Vet Notes ────────────────────────────────────────────────────────────────

export const SEED_VET_NOTES: VetNote[] = [
  // Daisy
  { id: 'vn-001', animalId: '4521', fecha: '20 Oct, 2023', tipo: 'Chequeo',     contenido: 'Animal muestra excelente puntaje corporal para el mes 7 de preñez. Movimiento fetal detectado. Mantener suplementación mineral actual.', veterinario: 'Dr. Aris P.',  iniciales: 'AP' },
  { id: 'vn-002', animalId: '4521', fecha: '05 Sep, 2023', tipo: 'Seguimiento', contenido: 'Recuperación de mastitis confirmada. Conteo de células somáticas volvió al rango normal. Período de retiro de leche finalizado.',           veterinario: 'Dr. Smith K.', iniciales: 'SK' },
  // Molly
  { id: 'vn-003', animalId: '4524', fecha: '12 Oct, 2023', tipo: 'Chequeo',     contenido: 'Producción estable. Sin signos de mastitis. Condición corporal 3.5/5. Continuar protocolo de ordeño actual.',                               veterinario: 'Dr. Aris P.',  iniciales: 'AP' },
  // Luna
  { id: 'vn-004', animalId: '4526', fecha: '06 Nov, 2023', tipo: 'Chequeo',     contenido: 'Gestación avanzando normalmente. Mes 6. Se recomienda aumentar suplementación de calcio y fósforo.',                                          veterinario: 'Dr. López M.', iniciales: 'LM' },
  { id: 'vn-005', animalId: '4526', fecha: '10 Oct, 2023', tipo: 'Seguimiento', contenido: 'Revisión ecográfica confirma un ternero vigoroso. Tamaño fetal acorde a la edad gestacional.',                                                  veterinario: 'Dr. López M.', iniciales: 'LM' },
  // Rosa
  { id: 'vn-006', animalId: '4528', fecha: '21 Oct, 2023', tipo: 'Seguimiento', contenido: 'Cojera resuelta tras tratamiento podal. Animal retomó marcha normal. Revisar piso del potrero A.',                                              veterinario: 'Dr. Aris P.',  iniciales: 'AP' },
  // Estrella
  { id: 'vn-007', animalId: '4531', fecha: '13 Nov, 2023', tipo: 'Chequeo',     contenido: 'Primer parto esperado. Gestación de alto riesgo por ser primípara. Monitoreo diario recomendado a partir del mes 8.',                           veterinario: 'Dr. Smith K.', iniciales: 'SK' },
];

// ─── Reproductive Data ────────────────────────────────────────────────────────

const REPRODUCTIVE_DAISY: ReproductiveData = {
  animalId: '4521',
  estadoReproductivo: 'Preñada (Mes 7)',
  mesGestacion: 7,
  fechaProbableParto: '15 Dic',
  tipoServicio: 'IA (Holstein)',
  inseminador: 'Dr. Smith',
  paridad: '3er Parto',
  progreso: 77,
};

const REPRODUCTIVE_LUNA: ReproductiveData = {
  animalId: '4526',
  estadoReproductivo: 'Preñada (Mes 6)',
  mesGestacion: 6,
  fechaProbableParto: '20 Ene',
  tipoServicio: 'IA (Simmental)',
  inseminador: 'Dr. López',
  paridad: '2do Parto',
  progreso: 66,
};

const REPRODUCTIVE_ESTRELLA: ReproductiveData = {
  animalId: '4531',
  estadoReproductivo: 'Preñada (Mes 7)',
  mesGestacion: 7,
  fechaProbableParto: '10 Dic',
  tipoServicio: 'Monta Natural',
  inseminador: 'Staff-04',
  paridad: '1er Parto',
  progreso: 77,
};

// ─── Weight Records ───────────────────────────────────────────────────────────

export const SEED_WEIGHT_RECORDS: WeightRecord[] = [
  { id: 'wr-001', animalId: '4521', fecha: '01 Nov 2023', peso: 650, ganancia: 12,  registradoPor: 'Staff-01' },
  { id: 'wr-002', animalId: '4521', fecha: '01 Oct 2023', peso: 638, ganancia: 10,  registradoPor: 'Staff-01' },
  { id: 'wr-003', animalId: '4522', fecha: '01 Nov 2023', peso: 580, ganancia: 8,   registradoPor: 'Staff-01' },
  { id: 'wr-004', animalId: '4522', fecha: '01 Oct 2023', peso: 572, ganancia: 5,   registradoPor: 'Staff-01' },
  { id: 'wr-005', animalId: '4523', fecha: '01 Nov 2023', peso: 720, ganancia: 15,  registradoPor: 'Staff-02' },
  { id: 'wr-006', animalId: '4523', fecha: '01 Oct 2023', peso: 705, ganancia: 13,  registradoPor: 'Staff-02' },
  { id: 'wr-007', animalId: '4524', fecha: '01 Nov 2023', peso: 610, ganancia: 7,   registradoPor: 'Staff-01' },
  { id: 'wr-008', animalId: '4524', fecha: '01 Oct 2023', peso: 603, ganancia: 6,   registradoPor: 'Staff-01' },
  { id: 'wr-009', animalId: '4525', fecha: '01 Nov 2023', peso: 800, ganancia: 18,  registradoPor: 'Staff-02' },
  { id: 'wr-010', animalId: '4525', fecha: '01 Oct 2023', peso: 782, ganancia: 16,  registradoPor: 'Staff-02' },
  { id: 'wr-011', animalId: '4526', fecha: '01 Nov 2023', peso: 670, ganancia: 22,  registradoPor: 'Staff-01', observaciones: 'Aumento gestación' },
  { id: 'wr-012', animalId: '4526', fecha: '01 Oct 2023', peso: 648, ganancia: 20,  registradoPor: 'Staff-01' },
  { id: 'wr-013', animalId: '4527', fecha: '01 Nov 2023', peso: 850, ganancia: 20,  registradoPor: 'Staff-02' },
  { id: 'wr-014', animalId: '4527', fecha: '01 Oct 2023', peso: 830, ganancia: 18,  registradoPor: 'Staff-02' },
  { id: 'wr-015', animalId: '4528', fecha: '01 Nov 2023', peso: 620, ganancia: 9,   registradoPor: 'Staff-01' },
  { id: 'wr-016', animalId: '4528', fecha: '01 Oct 2023', peso: 611, ganancia: 8,   registradoPor: 'Staff-01' },
  { id: 'wr-017', animalId: '4529', fecha: '01 Nov 2023', peso: 780, ganancia: 14,  registradoPor: 'Staff-02' },
  { id: 'wr-018', animalId: '4529', fecha: '01 Oct 2023', peso: 766, ganancia: 12,  registradoPor: 'Staff-02' },
  { id: 'wr-019', animalId: '4530', fecha: '01 Nov 2023', peso: 540, ganancia: 4,   registradoPor: 'Staff-01' },
  { id: 'wr-020', animalId: '4530', fecha: '01 Oct 2023', peso: 536, ganancia: 3,   registradoPor: 'Staff-01' },
  { id: 'wr-021', animalId: '4531', fecha: '01 Nov 2023', peso: 630, ganancia: 18,  registradoPor: 'Staff-01', observaciones: 'Aumento gestación' },
  { id: 'wr-022', animalId: '4531', fecha: '01 Oct 2023', peso: 612, ganancia: 15,  registradoPor: 'Staff-01' },
  { id: 'wr-023', animalId: '4532', fecha: '01 Nov 2023', peso: 820, ganancia: 16,  registradoPor: 'Staff-02' },
  { id: 'wr-024', animalId: '4532', fecha: '01 Oct 2023', peso: 804, ganancia: 14,  registradoPor: 'Staff-02' },
];

// ─── Animal Details (full) ────────────────────────────────────────────────────

const DETAIL_DEFAULTS: Record<string, Omit<import('../types/ganado.types').AnimalDetail, keyof Animal | 'healthRecords' | 'vetNotes' | 'reproductiveData'>> = {
  '4521': { produccion: '28 L/d', ultimoParto: '12 Mar', grupo: 'Grupo A (Ordeño)', edad: '4 Años 2 Meses', indice_salud: 94 },
  '4522': { produccion: '0 L/d',  ultimoParto: '15 Ene', grupo: 'Grupo B (Seca)',   edad: '3 Años 8 Meses', indice_salud: 88 },
  '4523': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Potrero Sur',      edad: '2 Años 5 Meses', indice_salud: 82 },
  '4524': { produccion: '24 L/d', ultimoParto: '08 Feb', grupo: 'Grupo A (Ordeño)', edad: '3 Años 6 Meses', indice_salud: 90 },
  '4525': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Potrero Norte',    edad: '3 Años 1 Mes',   indice_salud: 87 },
  '4526': { produccion: '0 L/d',  ultimoParto: '20 Mar', grupo: 'Grupo C (Preñez)', edad: '4 Años 0 Meses', indice_salud: 91 },
  '4527': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Potrero Norte',    edad: '2 Años 9 Meses', indice_salud: 89 },
  '4528': { produccion: '22 L/d', ultimoParto: '10 Abr', grupo: 'Grupo A (Ordeño)', edad: '3 Años 3 Meses', indice_salud: 86 },
  '4529': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Potrero Sur',      edad: '2 Años 7 Meses', indice_salud: 85 },
  '4530': { produccion: '0 L/d',  ultimoParto: '01 Feb', grupo: 'Grupo B (Seca)',   edad: '3 Años 4 Meses', indice_salud: 80 },
  '4531': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Grupo C (Preñez)', edad: '2 Años 11 Meses',indice_salud: 88 },
  '4532': { produccion: '0 L/d',  ultimoParto: '--',     grupo: 'Potrero Norte',    edad: '3 Años 0 Meses', indice_salud: 84 },
};

const REPRODUCTIVE_MAP: Record<string, ReproductiveData> = {
  '4521': REPRODUCTIVE_DAISY,
  '4526': REPRODUCTIVE_LUNA,
  '4531': REPRODUCTIVE_ESTRELLA,
};

export function buildAnimalDetails(
  animals: Animal[],
  healthRecords: HealthRecord[],
  vetNotes: VetNote[],
): Record<string, AnimalDetail> {
  const result: Record<string, AnimalDetail> = {};
  for (const animal of animals) {
    const defaults = DETAIL_DEFAULTS[animal.id] ?? {
      produccion: '22 L/d',
      ultimoParto: '08 Feb',
      grupo: 'Grupo B',
      edad: '3 Años 6 Meses',
      indice_salud: 85,
    };
    result[animal.id] = {
      ...animal,
      ...defaults,
      grupo: animal.lote ?? defaults.grupo,
      healthRecords: healthRecords.filter((r) => r.animalId === animal.id),
      vetNotes: vetNotes.filter((n) => n.animalId === animal.id),
      reproductiveData: REPRODUCTIVE_MAP[animal.id],
    };
  }
  return result;
}
