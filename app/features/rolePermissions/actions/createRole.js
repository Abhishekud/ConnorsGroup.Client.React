import {http} from '../../shared/services';

export const CREATE_ROLE = 'CREATE_ROLE';
export const CREATE_ROLE_PENDING = `${CREATE_ROLE}_PENDING`;
export const CREATE_ROLE_FULFILLED = `${CREATE_ROLE}_FULFILLED`;
export const CREATE_ROLE_REJECTED = `${CREATE_ROLE}_REJECTED`;

export function createRole(model) {
  return {
    type: CREATE_ROLE,
    payload: http.post('roles', model),
  };
}
