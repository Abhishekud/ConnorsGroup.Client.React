import {http} from '../../shared/services';

export const LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST = 'LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST';
export const LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_PENDING = `${LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_PENDING`;
export const LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_FULFILLED = `${LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_FULFILLED`;
export const LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST_REJECTED = `${LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST}_REJECTED`;

export function loadVolumeDriverMappingVariablesList(departmentId, volumeDriverMappingSetIds, skip, take, filter, sort) {
  const payload = {departmentId, volumeDriverMappingSetIds, filter, sort, skip, take};

  return {
    type: LOAD_VOLUME_DRIVER_MAPPING_VARIABLES_LIST,
    payload: http.post('volume-driver-mapping-variables/list', payload),
  };
}
