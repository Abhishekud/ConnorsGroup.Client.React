export const SET_DUPLICATE_STANDARD_MODEL_PROPERTY = 'SET_DUPLICATE_STANDARD_MODEL_PROPERTY';

export function setDuplicateStandardModelProperty(name, value) {
  return {
    type: SET_DUPLICATE_STANDARD_MODEL_PROPERTY,
    payload: {name, value},
  };
}
