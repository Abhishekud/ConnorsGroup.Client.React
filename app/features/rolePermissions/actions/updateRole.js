import {http} from '../../shared/services';

export const UPDATE_ROLE = 'UPDATE_ROLE';
export const UPDATE_ROLE_PENDING = `${UPDATE_ROLE}_PENDING`;
export const UPDATE_ROLE_FULFILLED = `${UPDATE_ROLE}_FULFILLED`;
export const UPDATE_ROLE_REJECTED = `${UPDATE_ROLE}_REJECTED`;

export function updateRole(role) {
  return {
    type: UPDATE_ROLE,
    payload: http.put(`roles/${role.get('id')}`, role),
  };
}
