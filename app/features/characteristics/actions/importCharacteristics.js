import {http} from '../../shared/services';

export const IMPORT_CHARACTERISTICS = 'IMPORT_CHARACTERISTICS';
export const IMPORT_CHARACTERISTICS_PENDING = `${IMPORT_CHARACTERISTICS}_PENDING`;
export const IMPORT_CHARACTERISTICS_FULFILLED = `${IMPORT_CHARACTERISTICS}_FULFILLED`;
export const IMPORT_CHARACTERISTICS_REJECTED = `${IMPORT_CHARACTERISTICS}_REJECTED`;

export function importCharacteristics(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_CHARACTERISTICS,
    payload: http.post('characteristics/import', data),
  };
}
