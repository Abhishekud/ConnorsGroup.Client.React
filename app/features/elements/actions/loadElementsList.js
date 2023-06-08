import {http} from '../../shared/services';

export const LOAD_ELEMENTS_LIST = 'LOAD_ELEMENTS_LIST';
export const LOAD_ELEMENTS_LIST_PENDING = `${LOAD_ELEMENTS_LIST}_PENDING`;
export const LOAD_ELEMENTS_LIST_FULFILLED = `${LOAD_ELEMENTS_LIST}_FULFILLED`;
export const LOAD_ELEMENTS_LIST_REJECTED = `${LOAD_ELEMENTS_LIST}_REJECTED`;

export function loadElementsList(filters) {
  return {
    type: LOAD_ELEMENTS_LIST,
    payload: http.post('elements/list', filters),
  };
}
