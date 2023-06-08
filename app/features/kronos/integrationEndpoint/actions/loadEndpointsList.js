import {http} from '../../../shared/services';

export const LOAD_ENDPOINTS_LIST = 'LOAD_KRONOS_ENDPOINTS_LIST';
export const LOAD_ENDPOINTS_LIST_PENDING = `${LOAD_ENDPOINTS_LIST}_PENDING`;
export const LOAD_ENDPOINTS_LIST_FULFILLED = `${LOAD_ENDPOINTS_LIST}_FULFILLED`;
export const LOAD_ENDPOINTS_LIST_REJECTED = `${LOAD_ENDPOINTS_LIST}_REJECTED`;

export function loadEndpointsList() {
  return {
    type: LOAD_ENDPOINTS_LIST,
    payload: http.get('kronos/endpoint/list'),
  };
}
