export const SET_CREATE_ALLOWANCE_MODEL_PROPERTY = 'SET_CREATE_ALLOWANCE_MODEL_PROPERTY';

export function setCreateAllowanceModelProperty(name, value, message) {
  return {
    type: SET_CREATE_ALLOWANCE_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
