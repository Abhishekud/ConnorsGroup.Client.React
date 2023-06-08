export const SET_EDIT_ALLOWANCE_REST_MODEL_PROPERTY = 'SET_EDIT_ALLOWANCE_REST_MODEL_PROPERTY';

export function setEditAllowanceRestModelProperty(name, value, message) {
  return {
    type: SET_EDIT_ALLOWANCE_REST_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
