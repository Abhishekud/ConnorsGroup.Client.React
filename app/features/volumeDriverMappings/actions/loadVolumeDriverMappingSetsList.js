import {http} from '../../shared/services';

export const LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST = 'LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST';
export const LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_PENDING = `${LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST}_PENDING`;
export const LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_FULFILLED = `${LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST}_FULFILLED`;
export const LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST_REJECTED = `${LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST}_REJECTED`;

export function loadVolumeDriverMappingSetsList(departmentId) {
  return {
    type: LOAD_VOLUME_DRIVER_MAPPING_SETS_LIST,
    payload: http.get(`volume-driver-mapping-sets/list-for-department/${departmentId}`),
  };
}
