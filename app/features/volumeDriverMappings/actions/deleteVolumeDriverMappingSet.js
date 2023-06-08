import {http} from '../../shared/services';

export const DELETE_VOLUME_DRIVER_MAPPING_SET = 'DELETE_VOLUME_DRIVER_MAPPING_SET';
export const DELETE_VOLUME_DRIVER_MAPPING_SET_PENDING = `${DELETE_VOLUME_DRIVER_MAPPING_SET}_PENDING`;
export const DELETE_VOLUME_DRIVER_MAPPING_SET_FULFILLED = `${DELETE_VOLUME_DRIVER_MAPPING_SET}_FULFILLED`;
export const DELETE_VOLUME_DRIVER_MAPPING_SET_REJECTED = `${DELETE_VOLUME_DRIVER_MAPPING_SET}_REJECTED`;

export function deleteVolumeDriverMappingSet(volumeDriverMappingSetId) {
  return {
    type: DELETE_VOLUME_DRIVER_MAPPING_SET,
    payload: http.delete(`volume-driver-mapping-sets/${volumeDriverMappingSetId}`),
  };
}
