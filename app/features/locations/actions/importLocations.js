import {http} from '../../shared/services';

export const IMPORT_LOCATIONS = 'IMPORT_LOCATIONS';
export const IMPORT_LOCATIONS_PENDING = `${IMPORT_LOCATIONS}_PENDING`;
export const IMPORT_LOCATIONS_FULFILLED = `${IMPORT_LOCATIONS}_FULFILLED`;
export const IMPORT_LOCATIONS_REJECTED = `${IMPORT_LOCATIONS}_REJECTED`;

export function importLocations(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_LOCATIONS,
    payload: http.post('locations/import', data),
  };
}
