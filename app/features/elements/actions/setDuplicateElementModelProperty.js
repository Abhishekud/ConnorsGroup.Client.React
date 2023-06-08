export const SET_DUPLICATE_ELEMENT_MODEL_PROPERTY = 'SET_DUPLICATE_ELEMENT_MODEL_PROPERTY';

export function setDuplicateElementModelProperty(name, value) {
  return {
    type: SET_DUPLICATE_ELEMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
