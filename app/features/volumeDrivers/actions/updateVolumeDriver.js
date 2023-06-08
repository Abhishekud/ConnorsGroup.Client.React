import {http} from '../../shared/services';

export const UPDATE_VOLUME_DRIVER = 'UPDATE_VOLUME_DRIVER';
export const UPDATE_VOLUME_DRIVER_PENDING = `${UPDATE_VOLUME_DRIVER}_PENDING`;
export const UPDATE_VOLUME_DRIVER_FULFILLED = `${UPDATE_VOLUME_DRIVER}_FULFILLED`;
export const UPDATE_VOLUME_DRIVER_REJECTED = `${UPDATE_VOLUME_DRIVER}_REJECTED`;

export function updateVolumeDriver(volumeDriver) {
  return {
    type: UPDATE_VOLUME_DRIVER,
    payload: http.put(`volume-drivers/${volumeDriver.get('id')}`, volumeDriver),
  };
}
