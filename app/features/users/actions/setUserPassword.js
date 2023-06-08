import {http} from '../../shared/services';

export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_USER_PASSWORD_PENDING = `${SET_USER_PASSWORD}_PENDING`;
export const SET_USER_PASSWORD_FULFILLED = `${SET_USER_PASSWORD}_FULFILLED`;
export const SET_USER_PASSWORD_REJECTED = `${SET_USER_PASSWORD}_REJECTED`;

export function setUserPassword(model) {
  return {
    type: SET_USER_PASSWORD,
    payload: http.put(`users/${model.get('userId')}/password`, model.toJS()),
  };
}
