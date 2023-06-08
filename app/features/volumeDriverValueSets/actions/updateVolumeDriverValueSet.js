import {http} from '../../shared/services';

export const UPDATE_VOLUME_DRIVER_VALUE_SET = 'UPDATE_VOLUME_DRIVER_VALUE_SET';
export const UPDATE_VOLUME_DRIVER_VALUE_SET_PENDING = `${UPDATE_VOLUME_DRIVER_VALUE_SET}_PENDING`;
export const UPDATE_VOLUME_DRIVER_VALUE_SET_FULFILLED = `${UPDATE_VOLUME_DRIVER_VALUE_SET}_FULFILLED`;
export const UPDATE_VOLUME_DRIVER_VALUE_SET_REJECTED = `${UPDATE_VOLUME_DRIVER_VALUE_SET}_REJECTED`;

export function updateVolumeDriverValueSet(volumeDriverValueSet) {
  return {
    type: UPDATE_VOLUME_DRIVER_VALUE_SET,
    payload: http.put(`volume-driver-value-sets/${volumeDriverValueSet.get('id')}`, volumeDriverValueSet),
  };
}
