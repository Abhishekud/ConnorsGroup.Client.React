import {http} from '../../shared/services';

export const GET_VOLUME_DRIVER_VALUES = 'GET_VOLUME_DRIVER_VALUES';
export const GET_VOLUME_DRIVER_VALUES_PENDING = `${GET_VOLUME_DRIVER_VALUES}_PENDING`;
export const GET_VOLUME_DRIVER_VALUES_FULFILLED = `${GET_VOLUME_DRIVER_VALUES}_FULFILLED`;
export const GET_VOLUME_DRIVER_VALUES_REJECTED = `${GET_VOLUME_DRIVER_VALUES}_REJECTED`;

export function getVolumeDriverValues(volumeDriverValueSetId) {
  return {
    type: GET_VOLUME_DRIVER_VALUES,
    payload: http.get(`volume-driver-values/${volumeDriverValueSetId}`),
  };
}
