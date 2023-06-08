export const SET_REQUEST_PASSWORD_RESET_FORM_FIELD = 'SET_REQUEST_PASSWORD_RESET_FORM_FIELD';

export function setRequestPasswordResetFormField(name, value) {
  return {
    type: SET_REQUEST_PASSWORD_RESET_FORM_FIELD,
    payload: {name, value},
  };
}
