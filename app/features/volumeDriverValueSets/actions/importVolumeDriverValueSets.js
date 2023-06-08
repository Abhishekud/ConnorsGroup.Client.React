import {http} from '../../shared/services';

export const IMPORT_VOLUME_DRIVER_VALUE_SETS = 'IMPORT_VOLUME_DRIVER_VALUE_SETS';
export const IMPORT_VOLUME_DRIVER_VALUE_SETS_PENDING = `${IMPORT_VOLUME_DRIVER_VALUE_SETS}_PENDING`;
export const IMPORT_VOLUME_DRIVER_VALUE_SETS_FULFILLED = `${IMPORT_VOLUME_DRIVER_VALUE_SETS}_FULFILLED`;
export const IMPORT_VOLUME_DRIVER_VALUE_SETS_REJECTED = `${IMPORT_VOLUME_DRIVER_VALUE_SETS}_REJECTED`;

export function importVolumeDriverValueSets(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_VOLUME_DRIVER_VALUE_SETS,
    payload: http.post('volume-driver-value-sets/import', data),
  };
}
