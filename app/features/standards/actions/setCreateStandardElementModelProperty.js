export const SET_CREATE_STANDARD_ELEMENT_MODEL_PROPERTY = 'SET_CREATE_STANDARD_ELEMENT_MODEL_PROPERTY';

export function setCreateStandardElementModelProperty(name, value) {
  return {
    type: SET_CREATE_STANDARD_ELEMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
