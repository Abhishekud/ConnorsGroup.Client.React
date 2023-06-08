import {http} from '../../shared/services';

export const LOAD_ROLE_SELECT_LIST_OPTIONS = 'LOAD_ROLE_SELECT_LIST_OPTIONS';
export const LOAD_ROLE_SELECT_LIST_OPTIONS_FULFILLED = `${LOAD_ROLE_SELECT_LIST_OPTIONS}_FULFILLED`;

export function loadRoleSelectListOptions() {
  return {
    type: LOAD_ROLE_SELECT_LIST_OPTIONS,
    payload: http.get('roles/select-list-options'),
  };
}
