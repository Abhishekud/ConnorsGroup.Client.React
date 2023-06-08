import {http} from '../../../shared/services';

export const IMPORT_REFLEXIS_ATTRIBUTES = 'IMPORT_REFLEXIS_ATTRIBUTES';
export const IMPORT_REFLEXIS_ATTRIBUTES_PENDING = `${IMPORT_REFLEXIS_ATTRIBUTES}_PENDING`;
export const IMPORT_REFLEXIS_ATTRIBUTES_FULFILLED = `${IMPORT_REFLEXIS_ATTRIBUTES}_FULFILLED`;
export const IMPORT_REFLEXIS_ATTRIBUTES_REJECTED = `${IMPORT_REFLEXIS_ATTRIBUTES}_REJECTED`;

export function importAttributes(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_REFLEXIS_ATTRIBUTES,
    payload: http.post('reflexis/attributes/import', data),
  };
}

