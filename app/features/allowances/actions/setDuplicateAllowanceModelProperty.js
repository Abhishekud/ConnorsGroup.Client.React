export const SET_DUPLICATE_ALLOWANCE_MODEL_PROPERTY = 'SET_DUPLICATE_ALLOWANCE_MODEL_PROPERTY';

export function setDuplicateAllowanceModelProperty(name, value, message) {
  return {
    type: SET_DUPLICATE_ALLOWANCE_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
