import {http} from '../../shared/services';

export const IMPORT_ATTRIBUTES = 'IMPORT_ATTRIBUTES';
export const IMPORT_ATTRIBUTES_PENDING = `${IMPORT_ATTRIBUTES}_PENDING`;
export const IMPORT_ATTRIBUTES_FULFILLED = `${IMPORT_ATTRIBUTES}_FULFILLED`;
export const IMPORT_ATTRIBUTES_REJECTED = `${IMPORT_ATTRIBUTES}_REJECTED`;

export function importAttributes(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_ATTRIBUTES,
    payload: http.post('attributes/import', data),
  };
}
