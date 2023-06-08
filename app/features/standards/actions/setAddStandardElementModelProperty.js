export const SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY = 'SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY';

export function setAddStandardElementModelProperty(name, value, message) {
  return {
    type: SET_ADD_STANDARD_ELEMENT_MODEL_PROPERTY,
    payload: {name, value, message},
  };
}
