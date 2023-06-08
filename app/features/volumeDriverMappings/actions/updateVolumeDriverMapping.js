import {http} from '../../shared/services';

export const UPDATE_VOLUME_DRIVER_MAPPING = 'UPDATE_VOLUME_DRIVER_MAPPING';
export const UPDATE_VOLUME_DRIVER_MAPPING_PENDING = `${UPDATE_VOLUME_DRIVER_MAPPING}_PENDING`;
export const UPDATE_VOLUME_DRIVER_MAPPING_FULFILLED = `${UPDATE_VOLUME_DRIVER_MAPPING}_FULFILLED`;
export const UPDATE_VOLUME_DRIVER_MAPPING_REJECTED = `${UPDATE_VOLUME_DRIVER_MAPPING}_REJECTED`;

export function updateVolumeDriverMapping(volumeDriverMapping) {
  return {
    type: UPDATE_VOLUME_DRIVER_MAPPING,
    payload: http.put(`volume-driver-mappings/${volumeDriverMapping.get('id')}`, volumeDriverMapping),
  };
}
