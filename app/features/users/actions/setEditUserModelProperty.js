export const SET_EDIT_USER_MODEL_PROPERTY = 'SET_EDIT_USER_MODEL_PROPERTY';

export function setEditUserModelProperty(name, value) {
  return {
    type: SET_EDIT_USER_MODEL_PROPERTY,
    payload: {name, value},
  };
}
