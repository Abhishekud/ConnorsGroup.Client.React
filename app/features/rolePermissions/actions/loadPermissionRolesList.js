import {http} from '../../shared/services';

export const LOAD_PERMISSION_ROLES_LIST = 'LOAD_PERMISSION_ROLES_LIST';
export const LOAD_PERMISSION_ROLES_LIST_PENDING = `${LOAD_PERMISSION_ROLES_LIST}_PENDING`;
export const LOAD_PERMISSION_ROLES_LIST_FULFILLED = `${LOAD_PERMISSION_ROLES_LIST}_FULFILLED`;
export const LOAD_PERMISSION_ROLES_LIST_REJECTED = `${LOAD_PERMISSION_ROLES_LIST}_REJECTED`;

export function loadPermissionRolesList() {
  return {
    type: LOAD_PERMISSION_ROLES_LIST,
    payload: http.get('roles/list-permission-roles'),
  };
}
