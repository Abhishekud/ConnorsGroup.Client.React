import {http} from '../../shared/services';

export const LOAD_LOCATION_MAPPING_LIST = 'LOAD_LOCATION_MAPPING_LIST';
export const LOAD_LOCATION_MAPPING_LIST_PENDING = `${LOAD_LOCATION_MAPPING_LIST}_PENDING`;
export const LOAD_LOCATION_MAPPING_LIST_FULFILLED = `${LOAD_LOCATION_MAPPING_LIST}_FULFILLED`;
export const LOAD_LOCATION_MAPPING_LIST_REJECTED = `${LOAD_LOCATION_MAPPING_LIST}_REJECTED`;

export function loadLocationMappingList(departmentId) {
  return {
    type: LOAD_LOCATION_MAPPING_LIST,
    payload: http.post('locations/list/department', {...{}, departmentId}),
  };
}
