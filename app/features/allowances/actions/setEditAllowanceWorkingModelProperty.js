export const SET_EDIT_ALLOWANCE_WORKING_MODEL_PROPERTY = 'SET_EDIT_ALLOWANCE_WORKING_MODEL_PROPERTY';

export function setEditAllowanceWorkingModelProperty(name, value, message) {
  return {
    type: SET_EDIT_ALLOWANCE_WORKING_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
