export const SET_ROLE_MODEL_PROPERTY = 'SET_ROLE_MODEL_PROPERTY';

export function setRoleModelProperty(roleId, name, value) {
  return {
    type: SET_ROLE_MODEL_PROPERTY,
    payload: {roleId, name, value},
  };
}
