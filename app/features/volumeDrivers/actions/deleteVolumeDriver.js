import {http} from '../../shared/services';

export const DELETE_VOLUME_DRIVER = 'DELETE_VOLUME_DRIVER';
export const DELETE_VOLUME_DRIVER_PENDING = `${DELETE_VOLUME_DRIVER}_PENDING`;
export const DELETE_VOLUME_DRIVER_FULFILLED = `${DELETE_VOLUME_DRIVER}_FULFILLED`;
export const DELETE_VOLUME_DRIVER_REJECTED = `${DELETE_VOLUME_DRIVER}_REJECTED`;

export function deleteVolumeDriver(volumeDriverId) {
  return {
    type: DELETE_VOLUME_DRIVER,
    payload: http.delete(`volume-drivers/${volumeDriverId}`),
  };
}
