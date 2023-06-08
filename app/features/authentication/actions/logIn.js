import {http} from '../../shared/services';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = `${LOGIN}_PENDING`;
export const LOGIN_FULFILLED = `${LOGIN}_FULFILLED`;
export const LOGIN_REJECTED = `${LOGIN}_REJECTED`;

export function logIn(model) {
  return {
    type: LOGIN,
    payload: http.post('authentication/log-in', model.toJS()),
  };
}
