import {http} from '../../shared/services';

export const LOAD_STANDARDS_LIST = 'LOAD_STANDARDS_LIST';
export const LOAD_STANDARDS_LIST_PENDING = `${LOAD_STANDARDS_LIST}_PENDING`;
export const LOAD_STANDARDS_LIST_FULFILLED = `${LOAD_STANDARDS_LIST}_FULFILLED`;
export const LOAD_STANDARDS_LIST_REJECTED = `${LOAD_STANDARDS_LIST}_REJECTED`;

export function loadStandardsList(filters) {
  return {
    type: LOAD_STANDARDS_LIST,
    payload: http.post('standards/list', filters),
  };
}
