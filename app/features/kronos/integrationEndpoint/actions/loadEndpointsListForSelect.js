import {http} from '../../../shared/services';

export const LOAD_ENDPOINTS_LIST_FOR_SELECT = 'LOAD_KRONOS_ENDPOINTS_LIST_FOR_SELECT';
export const LOAD_ENDPOINTS_LIST_FOR_SELECT_PENDING = `${LOAD_ENDPOINTS_LIST_FOR_SELECT}_PENDING`;
export const LOAD_ENDPOINTS_LIST_FOR_SELECT_FULFILLED = `${LOAD_ENDPOINTS_LIST_FOR_SELECT}_FULFILLED`;
export const LOAD_ENDPOINTS_LIST_FOR_SELECT_REJECTED = `${LOAD_ENDPOINTS_LIST_FOR_SELECT}_REJECTED`;

export function loadEndpointsListForSelect() {
  return {
    type: LOAD_ENDPOINTS_LIST_FOR_SELECT,
    payload: http.get('kronos/endpoint/select-list'),
  };
}
