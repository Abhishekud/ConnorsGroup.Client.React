import {http} from '../../shared/services';

export const IMPORT_UNIT_OF_MEASURES = 'IMPORT_UNIT_OF_MEASURES';
export const IMPORT_UNIT_OF_MEASURES_PENDING = `${IMPORT_UNIT_OF_MEASURES}_PENDING`;
export const IMPORT_UNIT_OF_MEASURES_FULFILLED = `${IMPORT_UNIT_OF_MEASURES}_FULFILLED`;
export const IMPORT_UNIT_OF_MEASURES_REJECTED = `${IMPORT_UNIT_OF_MEASURES}_REJECTED`;

export function importUnitOfMeasures(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_UNIT_OF_MEASURES,
    payload: http.post('units-of-measure/import', data),
  };
}
