export const SET_CREATE_NON_MOST_ELEMENT_MODEL_PROPERTY = 'SET_CREATE_NON_MOST_ELEMENT_MODEL_PROPERTY';

export function setCreateNonMOSTElementModelProperty(name, value) {
  return {
    type: SET_CREATE_NON_MOST_ELEMENT_MODEL_PROPERTY,
    payload: {name, value},
  };
}
