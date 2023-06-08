import {http} from '../../shared/services';

export const LOAD_SELECT_LIST_OPTIONS = 'LOAD_SELECT_LIST_OPTIONS';
export const LOAD_SELECT_LIST_OPTIONS_PENDING = `${LOAD_SELECT_LIST_OPTIONS}_PENDING`;
export const LOAD_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadSelectListOptions(selectListType) {
  return {
    type: LOAD_SELECT_LIST_OPTIONS,
    payload: http.get(`select-list-options/${selectListType}`),
  };
}
