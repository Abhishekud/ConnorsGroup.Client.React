export const SET_EDIT_ROLE_WORKING_MODEL_PROPERTY = 'SET_EDIT_ROLE_WORKING_MODEL_PROPERTY';

export function setEditRoleWorkingModelProperty(name, value) {
  return {
    type: SET_EDIT_ROLE_WORKING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
