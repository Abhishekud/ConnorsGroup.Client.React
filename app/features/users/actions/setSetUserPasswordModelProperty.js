export const SET_SET_USER_PASSWORD_MODEL_PROPERTY = 'SET_SET_USER_PASSWORD_MODEL_PROPERTY';

export function setSetUserPasswordModelProperty(name, value) {
  return {
    type: SET_SET_USER_PASSWORD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
