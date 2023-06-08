export const RESET_RESET_PASSWORD_FORM = 'RESET_RESET_PASSWORD_FORM';

export function resetResetPasswordForm(passwordResetToken) {
  return {
    type: RESET_RESET_PASSWORD_FORM,
    payload: {passwordResetToken},
  };
}
