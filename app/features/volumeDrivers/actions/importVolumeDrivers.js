import {http} from '../../shared/services';

export const IMPORT_VOLUME_DRIVERS = 'IMPORT_VOLUME_DRIVERS';
export const IMPORT_VOLUME_DRIVERS_PENDING = `${IMPORT_VOLUME_DRIVERS}_PENDING`;
export const IMPORT_VOLUME_DRIVERS_FULFILLED = `${IMPORT_VOLUME_DRIVERS}_FULFILLED`;
export const IMPORT_VOLUME_DRIVERS_REJECTED = `${IMPORT_VOLUME_DRIVERS}_REJECTED`;

export function importVolumeDrivers(file) {
  const data = new FormData();
  data.append('file', file);

  return {
    type: IMPORT_VOLUME_DRIVERS,
    payload: http.post('volume-drivers/import', data),
  };
}
