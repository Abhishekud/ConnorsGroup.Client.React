export const SET_EDIT_MOST_ELEMENT_WORKING_MODEL_PROPERTY = 'SET_EDIT_MOST_ELEMENT_WORKING_MODEL_PROPERTY';

export function setEditMOSTElementWorkingModelProperty(name, value) {
  return {
    type: SET_EDIT_MOST_ELEMENT_WORKING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
