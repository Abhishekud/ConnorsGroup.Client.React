import {http} from '../../shared/services';

export const CREATE_VOLUME_DRIVER = 'CREATE_VOLUME_DRIVER';
export const CREATE_VOLUME_DRIVER_PENDING = `${CREATE_VOLUME_DRIVER}_PENDING`;
export const CREATE_VOLUME_DRIVER_FULFILLED = `${CREATE_VOLUME_DRIVER}_FULFILLED`;
export const CREATE_VOLUME_DRIVER_REJECTED = `${CREATE_VOLUME_DRIVER}_REJECTED`;

export function createVolumeDriver(model) {
  return {
    type: CREATE_VOLUME_DRIVER,
    payload: http.post('volume-drivers', model),
  };
}
