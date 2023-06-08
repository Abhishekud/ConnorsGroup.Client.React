import {http} from '../../shared/services';

export const LOAD_ATTRIBUTES_LIST = 'LOAD_ATTRIBUTES_LIST';
export const LOAD_ATTRIBUTES_LIST_FULFILLED = `${LOAD_ATTRIBUTES_LIST}_FULFILLED`;

export function loadAttributesList(departmentId) {
  return {
    type: LOAD_ATTRIBUTES_LIST,
    payload: http.post('attributes/list', {departmentId}),
  };
}
