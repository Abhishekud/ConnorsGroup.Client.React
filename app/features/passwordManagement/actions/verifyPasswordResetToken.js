import {http} from '../../shared/services';

export const VERIFY_PASSWORD_RESET_TOKEN = 'VERIFY_PASSWORD_RESET_TOKEN';
export const VERIFY_PASSWORD_RESET_TOKEN_PENDING = `${VERIFY_PASSWORD_RESET_TOKEN}_PENDING`;
export const VERIFY_PASSWORD_RESET_TOKEN_REJECTED = `${VERIFY_PASSWORD_RESET_TOKEN}_REJECTED`;

export function verifyPasswordResetToken(passwordResetToken) {
  return {
    type: VERIFY_PASSWORD_RESET_TOKEN,
    payload: http.post('reset-password/verify-password-reset-token', {passwordResetToken}),
  };
}
