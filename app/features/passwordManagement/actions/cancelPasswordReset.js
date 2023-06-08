import {http} from '../../shared/services';

export const CANCEL_PASSWORD_RESET = 'CANCEL_PASSWORD_RESET';
export const CANCEL_PASSWORD_RESET_PENDING = `${CANCEL_PASSWORD_RESET}_PENDING`;
export const CANCEL_PASSWORD_RESET_FULFILLED = `${CANCEL_PASSWORD_RESET}_FULFILLED`;
export const CANCEL_PASSWORD_RESET_REJECTED = `${CANCEL_PASSWORD_RESET}_REJECTED`;

export function cancelPasswordReset(passwordResetToken) {
  return {
    type: CANCEL_PASSWORD_RESET,
    payload: http.post('reset-password/cancel-password-reset-request', {passwordResetToken}),
  };
}
