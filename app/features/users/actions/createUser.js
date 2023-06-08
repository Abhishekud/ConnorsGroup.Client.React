import {http} from '../../shared/services';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_PENDING = `${CREATE_USER}_PENDING`;
export const CREATE_USER_FULFILLED = `${CREATE_USER}_FULFILLED`;
export const CREATE_USER_REJECTED = `${CREATE_USER}_REJECTED`;

export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: http.post('users', user.toJS()),
  };
}
