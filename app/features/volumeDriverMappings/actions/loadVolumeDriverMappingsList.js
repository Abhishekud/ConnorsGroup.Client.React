import {http} from '../../shared/services';

export const LOAD_VOLUME_DRIVER_MAPPINGS_LIST = 'LOAD_VOLUME_DRIVER_MAPPINGS_LIST';
export const LOAD_VOLUME_DRIVER_MAPPINGS_LIST_PENDING = `${LOAD_VOLUME_DRIVER_MAPPINGS_LIST}_PENDING`;
export const LOAD_VOLUME_DRIVER_MAPPINGS_LIST_FULFILLED = `${LOAD_VOLUME_DRIVER_MAPPINGS_LIST}_FULFILLED`;
export const LOAD_VOLUME_DRIVER_MAPPINGS_LIST_REJECTED = `${LOAD_VOLUME_DRIVER_MAPPINGS_LIST}_REJECTED`;

export function loadVolumeDriverMappingsList(departmentId, skip, take, sort, filter) {
  return {
    type: LOAD_VOLUME_DRIVER_MAPPINGS_LIST,
    payload: http.post('volume-driver-mappings/list', {departmentId, skip, take, sort, filter}),
  };
}
