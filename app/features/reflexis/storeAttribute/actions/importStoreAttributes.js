import {http} from '../../../shared/services';

export const IMPORT_REFLEXIS_STORE_ATTRIBUTES = 'IMPORT_REFLEXIS_STORE_ATTRIBUTES';
export const IMPORT_REFLEXIS_STORE_ATTRIBUTES_PENDING = `${IMPORT_REFLEXIS_STORE_ATTRIBUTES}_PENDING`;
export const IMPORT_REFLEXIS_STORE_ATTRIBUTES_FULFILLED = `${IMPORT_REFLEXIS_STORE_ATTRIBUTES}_FULFILLED`;
export const IMPORT_REFLEXIS_STORE_ATTRIBUTES_REJECTED = `${IMPORT_REFLEXIS_STORE_ATTRIBUTES}_REJECTED`;

export function importStoreAttributes(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_REFLEXIS_STORE_ATTRIBUTES,
    payload: http.post('reflexis/store-attributes/import', data),
  };
}


