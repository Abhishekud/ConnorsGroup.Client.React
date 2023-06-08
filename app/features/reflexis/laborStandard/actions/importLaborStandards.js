import {http} from '../../../shared/services';

export const IMPORT_REFLEXIS_LABOR_STANDARDS = 'IMPORT_REFLEXIS_LABOR_STANDARDS';
export const IMPORT_REFLEXIS_LABOR_STANDARDS_PENDING = `${IMPORT_REFLEXIS_LABOR_STANDARDS}_PENDING`;
export const IMPORT_REFLEXIS_LABOR_STANDARDS_FULFILLED = `${IMPORT_REFLEXIS_LABOR_STANDARDS}_FULFILLED`;
export const IMPORT_REFLEXIS_LABOR_STANDARDS_REJECTED = `${IMPORT_REFLEXIS_LABOR_STANDARDS}_REJECTED`;

export function importLaborStandards(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_REFLEXIS_LABOR_STANDARDS,
    payload: http.post('reflexis/labor-standards/import', data),
  };
}


