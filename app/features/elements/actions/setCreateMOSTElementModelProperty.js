export const SET_CREATE_MOST_ELEMENT_MODEL_PROPERTY = 'SET_CREATE_MOST_ELEMENT_MODEL_PROPERTY';

export function setCreateMOSTElementModelProperty(name, value) {
  return {
    type: SET_CREATE_MOST_ELEMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
