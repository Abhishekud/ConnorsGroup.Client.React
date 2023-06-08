import {http} from '../../shared/services';

export const LOAD_STANDARD_REVISIONS_LIST = 'LOAD_STANDARD_REVISIONS_LIST';
export const LOAD_STANDARD_REVISIONS_LIST_PENDING = `${LOAD_STANDARD_REVISIONS_LIST}_PENDING`;
export const LOAD_STANDARD_REVISIONS_LIST_FULFILLED = `${LOAD_STANDARD_REVISIONS_LIST}_FULFILLED`;
export const LOAD_STANDARD_REVISIONS_LIST_REJECTED = `${LOAD_STANDARD_REVISIONS_LIST}_REJECTED`;

export function loadStandardRevisionsList(id) {
  return {
    type: LOAD_STANDARD_REVISIONS_LIST,
    payload: http.get(`standards/${id}/list-revisions`),
  };
}
