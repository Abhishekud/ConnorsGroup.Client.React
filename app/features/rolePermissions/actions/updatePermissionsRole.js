import {http} from '../../shared/services';

export const UPDATE_PERMISSIONS_ROLE = 'UPDATE_PERMISSIONS_ROLE';
export const UPDATE_PERMISSIONS_ROLE_PENDING = `${UPDATE_PERMISSIONS_ROLE}_PENDING`;
export const UPDATE_PERMISSIONS_ROLE_FULFILLED = `${UPDATE_PERMISSIONS_ROLE}_FULFILLED`;
export const UPDATE_PERMISSIONS_ROLE_REJECTED = `${UPDATE_PERMISSIONS_ROLE}_REJECTED`;

export function updatePermissionsRole(permissionId, remove, roleId) {
  return {
    type: UPDATE_PERMISSIONS_ROLE,
    payload: http.put('roles/update-permissions-role', {permissionId, remove, roleId}),
  };
}
