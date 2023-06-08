export const SET_STANDARD_DETAIL_MODEL_PROPERTY = 'SET_STANDARD_DETAIL_MODEL_PROPERTY';

export function setStandardDetailModelProperty(name, value) {
  return {
    type: SET_STANDARD_DETAIL_MODEL_PROPERTY,
    payload: {name, value},
  };
}
