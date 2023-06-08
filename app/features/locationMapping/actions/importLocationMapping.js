import {http} from '../../shared/services';

export const IMPORT_LOCATION_MAPPING = 'IMPORT_LOCATION_MAPPING';
export const IMPORT_LOCATION_MAPPING_PENDING = `${IMPORT_LOCATION_MAPPING}_PENDING`;
export const IMPORT_LOCATION_MAPPING_FULFILLED = `${IMPORT_LOCATION_MAPPING}_FULFILLED`;
export const IMPORT_LOCATION_MAPPING_REJECTED = `${IMPORT_LOCATION_MAPPING}_REJECTED`;

export function importLocationMapping(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_LOCATION_MAPPING,
    payload: http.post('locations/department/import', data),
  };
}
