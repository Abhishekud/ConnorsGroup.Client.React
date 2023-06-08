import {http} from '../../shared/services';

export const DELETE_ROLE = 'DELETE_ROLE';
export const DELETE_ROLE_PENDING = `${DELETE_ROLE}_PENDING`;
export const DELETE_ROLE_FULFILLED = `${DELETE_ROLE}_FULFILLED`;
export const DELETE_ROLE_REJECTED = `${DELETE_ROLE}_REJECTED`;

export function deleteRole(roleId) {
  return {
    type: DELETE_ROLE,
    payload: http.delete(`roles/${roleId}`),
  };
}
