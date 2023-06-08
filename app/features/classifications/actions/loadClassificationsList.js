import {http} from '../../shared/services';

export const LOAD_CLASSIFICATIONS_LIST = 'LOAD_CLASSIFICATIONS_LIST';
export const LOAD_CLASSIFICATIONS_LIST_PENDING = `${LOAD_CLASSIFICATIONS_LIST}_PENDING`;
export const LOAD_CLASSIFICATIONS_LIST_FULFILLED = `${LOAD_CLASSIFICATIONS_LIST}_FULFILLED`;
export const LOAD_CLASSIFICATIONS_LIST_REJECTED = `${LOAD_CLASSIFICATIONS_LIST}_REJECTED`;

export function loadClassificationsList() {
  return {
    type: LOAD_CLASSIFICATIONS_LIST,
    payload: http.get('classifications/list'),
  };
}
