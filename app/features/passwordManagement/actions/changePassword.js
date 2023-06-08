import {http} from '../../shared/services';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_PENDING = `${CHANGE_PASSWORD}_PENDING`;
export const CHANGE_PASSWORD_FULFILLED = `${CHANGE_PASSWORD}_FULFILLED`;
export const CHANGE_PASSWORD_REJECTED = `${CHANGE_PASSWORD}_REJECTED`;

export function changePassword(model) {
  return {
    type: CHANGE_PASSWORD,
    payload: http.put('change-password', model.toJS()),
  };
}
