import {http} from '../../shared/services';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_PENDING = `${RESET_PASSWORD}_PENDING`;
export const RESET_PASSWORD_FULFILLED = `${RESET_PASSWORD}_FULFILLED`;
export const RESET_PASSWORD_REJECTED = `${RESET_PASSWORD}_REJECTED`;

export function resetPassword(model) {
  return {
    type: RESET_PASSWORD,
    payload: http.put('reset-password', model.toJS()),
  };
}
