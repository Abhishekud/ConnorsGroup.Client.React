import {http} from '../../shared/services';

export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';
export const REQUEST_PASSWORD_RESET_PENDING = `${REQUEST_PASSWORD_RESET}_PENDING`;
export const REQUEST_PASSWORD_RESET_FULFILLED = `${REQUEST_PASSWORD_RESET}_FULFILLED`;
export const REQUEST_PASSWORD_RESET_REJECTED = `${REQUEST_PASSWORD_RESET}_REJECTED`;

export function requestPasswordReset(model) {
  return {
    type: REQUEST_PASSWORD_RESET,
    payload: http.post('reset-password/request-password-reset', model.toJS()),
  };
}
