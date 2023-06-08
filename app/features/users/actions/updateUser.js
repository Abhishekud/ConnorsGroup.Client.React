import {http} from '../../shared/services';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_PENDING = `${UPDATE_USER}_PENDING`;
export const UPDATE_USER_FULFILLED = `${UPDATE_USER}_FULFILLED`;
export const UPDATE_USER_REJECTED = `${UPDATE_USER}_REJECTED`;

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: http.put(`users/${user.get('id')}`, user.toJS()),
  };
}
