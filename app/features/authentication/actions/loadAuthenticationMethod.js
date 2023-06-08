import {http} from '../../shared/services';

export const LOAD_AUTHENTICATION_METHOD = 'LOAD_AUTHENTICATION_METHOD';
export const LOAD_AUTHENTICATION_METHOD_PENDING = `${LOAD_AUTHENTICATION_METHOD}_PENDING`;
export const LOAD_AUTHENTICATION_METHOD_FULFILLED = `${LOAD_AUTHENTICATION_METHOD}_FULFILLED`;
export const LOAD_AUTHENTICATION_METHOD_REJECTED = `${LOAD_AUTHENTICATION_METHOD}_REJECTED`;

export function loadAuthenticationMethod() {
  return {
    type: LOAD_AUTHENTICATION_METHOD,
    payload: http.get('authentication/method'),
  };
}
