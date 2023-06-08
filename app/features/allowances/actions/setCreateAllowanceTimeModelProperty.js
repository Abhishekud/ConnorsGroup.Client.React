export const SET_CREATE_ALLOWANCE_TIME_MODEL_PROPERTY = 'SET_CREATE_ALLOWANCE_TIME_MODEL_PROPERTY';

export function setCreateAllowanceTimeModelProperty(name, value) {
  return {
    type: SET_CREATE_ALLOWANCE_TIME_MODEL_PROPERTY,
    payload: {name, value},
  };
}
