import {http} from '../../shared/services';

export const UPDATE_VOLUME_DRIVER_MAPPING_SET = 'UPDATE_VOLUME_DRIVER_MAPPING_SET';
export const UPDATE_VOLUME_DRIVER_MAPPING_SET_PENDING = `${UPDATE_VOLUME_DRIVER_MAPPING_SET}_PENDING`;
export const UPDATE_VOLUME_DRIVER_MAPPING_SET_FULFILLED = `${UPDATE_VOLUME_DRIVER_MAPPING_SET}_FULFILLED`;
export const UPDATE_VOLUME_DRIVER_MAPPING_SET_REJECTED = `${UPDATE_VOLUME_DRIVER_MAPPING_SET}_REJECTED`;

export function updateVolumeDriverMappingSet(volumeDriverMappingSet) {
  return {
    type: UPDATE_VOLUME_DRIVER_MAPPING_SET,
    payload: {
      promise: http.put(`volume-driver-mapping-sets/${volumeDriverMappingSet.get('id')}`, volumeDriverMappingSet),
      data: volumeDriverMappingSet.get('id'),
    },
  };
}
