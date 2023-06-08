import {http} from '../../shared/services';

export const DELETE_VOLUME_DRIVER_MAPPING = 'DELETE_VOLUME_DRIVER_MAPPING';
export const DELETE_VOLUME_DRIVER_MAPPING_PENDING = `${DELETE_VOLUME_DRIVER_MAPPING}_PENDING`;
export const DELETE_VOLUME_DRIVER_MAPPING_FULFILLED = `${DELETE_VOLUME_DRIVER_MAPPING}_FULFILLED`;
export const DELETE_VOLUME_DRIVER_MAPPING_REJECTED = `${DELETE_VOLUME_DRIVER_MAPPING}_REJECTED`;

export function deleteVolumeDriverMapping(volumeDriverMappingId) {
  return {
    type: DELETE_VOLUME_DRIVER_MAPPING,
    payload: http.delete(`volume-driver-mappings/${volumeDriverMappingId}`),
  };
}
