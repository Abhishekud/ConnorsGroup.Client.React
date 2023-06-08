export const SET_EDIT_ATTRIBUTE_WORKING_MODEL_PROPERTY = 'SET_EDIT_ATTRIBUTE_WORKING_MODEL_PROPERTY';

export function setEditAttributeWorkingModelProperty(name, value) {
  return {
    type: SET_EDIT_ATTRIBUTE_WORKING_MODEL_PROPERTY,
    payload: {name, value},
  };
}
