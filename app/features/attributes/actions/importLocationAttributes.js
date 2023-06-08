import {http} from '../../shared/services';

export const IMPORT_LOCATION_ATTRIBUTES = 'IMPORT_LOCATION_ATTRIBUTES';
export const IMPORT_LOCATION_ATTRIBUTES_PENDING = `${IMPORT_LOCATION_ATTRIBUTES}_PENDING`;
export const IMPORT_LOCATION_ATTRIBUTES_FULFILLED = `${IMPORT_LOCATION_ATTRIBUTES}_FULFILLED`;
export const IMPORT_LOCATION_ATTRIBUTES_REJECTED = `${IMPORT_LOCATION_ATTRIBUTES}_REJECTED`;

export function importLocationAttributes(file, departmentId) {
  const data = new FormData();
  data.append('file', file);
  data.append('departmentId', departmentId);

  return {
    type: IMPORT_LOCATION_ATTRIBUTES,
    payload: http.post('attributes/import-location-attributes', data),
  };
}
