import {http} from '../../shared/services';

export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const LOAD_USERS_LIST_PENDING = `${LOAD_USERS_LIST}_PENDING`;
export const LOAD_USERS_LIST_FULFILLED = `${LOAD_USERS_LIST}_FULFILLED`;
export const LOAD_USERS_LIST_REJECTED = `${LOAD_USERS_LIST}_REJECTED`;

export function loadUsersList() {
  return {
    type: LOAD_USERS_LIST,
    payload: http.get('users/list'),
  };
}
