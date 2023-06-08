export const RESET_CHANGE_PASSWORD_FORM = 'RESET_CHANGE_PASSWORD_FORM';

export function resetChangePasswordForm(passwordResetToken) {
  return {
    type: RESET_CHANGE_PASSWORD_FORM,
    payload: {passwordResetToken},
  };
}
