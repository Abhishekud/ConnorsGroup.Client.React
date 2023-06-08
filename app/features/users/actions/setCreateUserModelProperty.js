export const SET_CREATE_USER_MODEL_PROPERTY = 'SET_CREATE_USER_MODEL_PROPERTY';

export function setCreateUserModelProperty(name, value) {
  return {
    type: SET_CREATE_USER_MODEL_PROPERTY,
    payload: {name, value},
  };
}
