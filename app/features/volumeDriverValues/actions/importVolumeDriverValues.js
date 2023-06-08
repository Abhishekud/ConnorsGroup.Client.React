import {http} from '../../shared/services';

export const IMPORT_VOLUME_DRIVER_VALUES = 'IMPORT_VOLUME_DRIVER_VALUES';
export const IMPORT_VOLUME_DRIVER_VALUES_PENDING = `${IMPORT_VOLUME_DRIVER_VALUES}_PENDING`;
export const IMPORT_VOLUME_DRIVER_VALUES_FULFILLED = `${IMPORT_VOLUME_DRIVER_VALUES}_FULFILLED`;
export const IMPORT_VOLUME_DRIVER_VALUES_REJECTED = `${IMPORT_VOLUME_DRIVER_VALUES}_REJECTED`;

export function importVolumeDriverValues(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_VOLUME_DRIVER_VALUES,
    payload: http.post('volume-driver-values/import', data),
  };
}
