export const SET_EDIT_ELEMENT_ACTIVITY_MODEL_PROPERTY = 'SET_EDIT_ELEMENT_ACTIVITY_MODEL_PROPERTY';

export function setEditActivityModelProperty(name, value) {
  return {
    type: SET_EDIT_ELEMENT_ACTIVITY_MODEL_PROPERTY,
    payload: {name, value},
  };
}
