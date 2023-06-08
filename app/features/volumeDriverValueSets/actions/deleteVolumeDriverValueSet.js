import {http} from '../../shared/services';

export const DELETE_VOLUME_DRIVER_VALUE_SET = 'DELETE_VOLUME_DRIVER_VALUE_SET';
export const DELETE_VOLUME_DRIVER_VALUE_SET_PENDING = `${DELETE_VOLUME_DRIVER_VALUE_SET}_PENDING`;
export const DELETE_VOLUME_DRIVER_VALUE_SET_FULFILLED = `${DELETE_VOLUME_DRIVER_VALUE_SET}_FULFILLED`;
export const DELETE_VOLUME_DRIVER_VALUE_SET_REJECTED = `${DELETE_VOLUME_DRIVER_VALUE_SET}_REJECTED`;

export function deleteVolumeDriverValueSet(volumeDriverValueSetId) {
  return {
    type: DELETE_VOLUME_DRIVER_VALUE_SET,
    payload: http.delete(`volume-driver-value-sets/${volumeDriverValueSetId}`),
  };
}
