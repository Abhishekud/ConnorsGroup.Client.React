export const SET_EDIT_NON_MOST_ELEMENT_WORKING_MODEL_PROPERTY = 'SET_EDIT_NON_MOST_ELEMENT_WORKING_MODEL_PROPERTY';

export function setEditNonMOSTElementWorkingModelProperty(name, value) {
  return {
    type: SET_EDIT_NON_MOST_ELEMENT_WORKING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
