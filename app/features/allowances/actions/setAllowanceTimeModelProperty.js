export const SET_ALLOWANCE_TIME_MODEL_PROPERTY = 'SET_ALLOWANCE_TIME_MODEL_PROPERTY';

export function setAllowanceTimeModelProperty(id, name, value) {
  return {
    type: SET_ALLOWANCE_TIME_MODEL_PROPERTY,
    payload: {id, name, value},
  };
}
