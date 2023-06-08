import {http} from '../../shared/services';

export const LOAD_SELECT_LISTS_OPTIONS = 'LOAD_SELECT_LISTS_OPTIONS';
export const LOAD_SELECT_LISTS_OPTIONS_FULFILLED = `${LOAD_SELECT_LISTS_OPTIONS}_FULFILLED`;

export function loadSelectListsOptions(...selectListTypes) {
  return {
    type: LOAD_SELECT_LISTS_OPTIONS,
    payload: http.post('select-list-options', selectListTypes),
  };
}
