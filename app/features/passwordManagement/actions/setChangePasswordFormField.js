export const SET_CHANGE_PASSWORD_FORM_FIELD = 'SET_CHANGE_PASSWORD_FORM_FIELD';

export function setChangePasswordFormField(name, value) {
  return {
    type: SET_CHANGE_PASSWORD_FORM_FIELD,
    payload: {name, value},
  };
}
