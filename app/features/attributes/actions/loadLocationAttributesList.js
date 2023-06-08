import {http} from '../../shared/services';

export const LOAD_LOCATION_ATTRIBUTES_LIST = 'LOAD_LOCATION_ATTRIBUTES_LIST';
export const LOAD_LOCATION_ATTRIBUTES_LIST_PENDING = `${LOAD_LOCATION_ATTRIBUTES_LIST}_PENDING`;
export const LOAD_LOCATION_ATTRIBUTES_LIST_FULFILLED = `${LOAD_LOCATION_ATTRIBUTES_LIST}_FULFILLED`;
export const LOAD_LOCATION_ATTRIBUTES_LIST_REJECTED = `${LOAD_LOCATION_ATTRIBUTES_LIST}_REJECTED`;

export function loadLocationAttributesList(departmentId) {
  return {
    type: LOAD_LOCATION_ATTRIBUTES_LIST,
    payload: http.post('attributes/list-location-attributes', {departmentId}),
  };
}
