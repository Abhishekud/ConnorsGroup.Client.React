export const SET_CREATE_ROLE_MODEL_PROPERTY = 'SET_CREATE_ROLE_MODEL_PROPERTY';

export function setCreateRoleModelProperty(name, value) {
  return {
    type: SET_CREATE_ROLE_MODEL_PROPERTY,
    payload: {name, value},
  };
}
