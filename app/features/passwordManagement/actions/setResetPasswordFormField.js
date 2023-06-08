export const SET_RESET_PASSWORD_FORM_FIELD = 'SET_RESET_PASSWORD_FORM_FIELD';

export function setResetPasswordFormField(name, value) {
  return {
    type: SET_RESET_PASSWORD_FORM_FIELD,
    payload: {name, value},
  };
}
