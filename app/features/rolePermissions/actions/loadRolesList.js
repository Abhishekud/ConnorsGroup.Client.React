import {http} from '../../shared/services';

export const LOAD_ROLES_LIST = 'LOAD_ROLES_LIST';
export const LOAD_ROLES_LIST_FULFILLED = `${LOAD_ROLES_LIST}_FULFILLED`;

export function loadRolesList() {
  return {
    type: LOAD_ROLES_LIST,
    payload: http.get('roles/list'),
  };
}
