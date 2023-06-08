import {http} from '../../shared/services';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_PENDING = `${DELETE_USER}_PENDING`;
export const DELETE_USER_FULFILLED = `${DELETE_USER}_FULFILLED`;
export const DELETE_USER_REJECTED = `${DELETE_USER}_REJECTED`;

export function deleteUser(userId) {
  return {
    type: DELETE_USER,
    payload: http.delete(`users/${userId}`),
  };
}
